#!/usr/bin/env node
/**
 * fetch-hours.js
 * Busca apontamentos de horas do Jira (últimos 90 dias) e gera hours-data.js
 *
 * Uso:
 *   node fetch-hours.js
 *
 * Variáveis de ambiente (ou .env):
 *   JIRA_URL       https://atendimento.betha.com.br
 *   JIRA_USER      usuario@betha.com.br
 *   JIRA_PASSWORD  senha ou API token
 *   DAYS_BACK      dias para buscar (padrão: 90)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// ── Carregar .env se existir ─────────────────────────────────────────
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.trim().split('=');
    if (k && !k.startsWith('#')) process.env[k] = v.join('=').replace(/^["']|["']$/g, '');
  });
}

const JIRA_URL = (process.env.JIRA_URL || 'https://atendimento.betha.com.br').replace(/\/$/, '');
const JIRA_USER = process.env.JIRA_USER;
const JIRA_PASSWORD = process.env.JIRA_PASSWORD;
const DAYS_BACK = parseInt(process.env.DAYS_BACK || '90');

if (!JIRA_USER || !JIRA_PASSWORD) {
  console.error('❌ Configure JIRA_USER e JIRA_PASSWORD (.env ou variáveis de ambiente)');
  process.exit(1);
}

const AUTH = Buffer.from(`${JIRA_USER}:${JIRA_PASSWORD}`).toString('base64');

// ── Usuários ─────────────────────────────────────────────────────────
const USERS = [
  { name: 'Alana Pinheiro',  handle: 'alana.silva@betha.com.br',   dailyHours: 8 },
  { name: 'Kamila de Souza', handle: 'kamila.silva@betha.com.br',  dailyHours: 4 },
  { name: 'Juliana França',  handle: 'juliana.franca@betha.com.br', dailyHours: 8 },
];

// ── HTTP util ─────────────────────────────────────────────────────────
function httpGet(urlStr) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const opts = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'Authorization': `Basic ${AUTH}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      rejectUnauthorized: false,
    };
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { reject(new Error(`Parse error (${res.statusCode}): ${data.substring(0, 200)}`)); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

// ── Date utils ────────────────────────────────────────────────────────
function toDateStr(d) { return d.toISOString().split('T')[0]; }

function getDateRange(daysBack) {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - daysBack);
  return { from: toDateStr(from), to: toDateStr(to) };
}

// ── Busca todos os worklogs de uma issue (paginado) ──────────────────
async function getAllWorklogsForIssue(issueKey) {
  const all = [];
  let startAt = 0;
  while (true) {
    const { body } = await httpGet(`${JIRA_URL}/rest/api/2/issue/${issueKey}/worklog?startAt=${startAt}&maxResults=100`);
    all.push(...(body.worklogs || []));
    if (all.length >= (body.total || 0) || !(body.worklogs?.length)) break;
    startAt += body.worklogs.length;
  }
  return all;
}

// ── Fetch worklogs for one user ───────────────────────────────────────
async function fetchUserWorklogs(username, dateFrom, dateTo) {
  const worklogsByDay = {};
  let startAt = 0;
  const maxResults = 100;
  let total = Infinity;

  console.log(`  → Buscando issues de ${username}...`);

  while (startAt < total) {
    const jql = encodeURIComponent(
      `worklogAuthor = "${username}" AND worklogDate >= "${dateFrom}" AND worklogDate <= "${dateTo}" ORDER BY updated DESC`
    );
    const url = `${JIRA_URL}/rest/api/2/search?jql=${jql}&startAt=${startAt}&maxResults=${maxResults}&fields=worklog`;
    const { status, body } = await httpGet(url);

    if (status !== 200) {
      console.warn(`    ⚠ Status ${status} para ${username}`);
      break;
    }

    total = body.total || 0;
    const issues = body.issues || [];
    if (!issues.length) break;

    for (const issue of issues) {
      const wl = issue.fields?.worklog;
      let worklogs = wl?.worklogs || [];

      // Se o issue tem mais worklogs do que retornou, buscar todos com paginação
      if ((wl?.total || 0) > worklogs.length) {
        worklogs = await getAllWorklogsForIssue(issue.key);
      }

      for (const w of worklogs) {
        if (w.author?.name !== username) continue;
        const date = w.started.substring(0, 10);
        if (date < dateFrom || date > dateTo) continue;
        worklogsByDay[date] = (worklogsByDay[date] || 0) + (w.timeSpentSeconds || 0);
      }
    }

    startAt += issues.length;
    if (issues.length < maxResults) break;
  }

  const totalSeconds = Object.values(worklogsByDay).reduce((a, b) => a + b, 0);
  const days = Object.keys(worklogsByDay).length;
  const hours = (totalSeconds / 3600).toFixed(1);
  console.log(`    ✓ ${days} dias, ${hours}h no período`);

  return worklogsByDay;
}

// ── Main ──────────────────────────────────────────────────────────────
async function main() {
  console.log('🔍 Buscando apontamentos de horas no Jira...');
  console.log(`   Servidor: ${JIRA_URL}`);
  console.log(`   Período: últimos ${DAYS_BACK} dias\n`);

  const { from, to } = getDateRange(DAYS_BACK);

  const result = {
    generatedAt: new Date().toISOString(),
    dateFrom: from,
    dateTo: to,
    users: {},
  };

  for (const user of USERS) {
    console.log(`👤 ${user.name} (${user.handle})`);
    try {
      const worklogs = await fetchUserWorklogs(user.handle, from, to);
      result.users[user.handle] = worklogs;
    } catch (e) {
      console.error(`   ❌ Erro: ${e.message}`);
      result.users[user.handle] = {};
    }
  }

  // Gravar hours-data.js
  const outPath = path.join(__dirname, 'hours-data.js');
  const content = `// Gerado automaticamente em ${result.generatedAt}\n// NÃO editar manualmente\nwindow.HOURS_DATA = ${JSON.stringify(result, null, 2)};\n`;
  fs.writeFileSync(outPath, content, 'utf8');

  console.log(`\n✅ Dados gravados em: ${outPath}`);
  console.log(`   Período: ${from} → ${to}`);

  // Sumário rápido
  console.log('\n📊 Resumo do dia de hoje:');
  const today = to;
  for (const user of USERS) {
    const sec = result.users[user.handle]?.[today] || 0;
    const h = (sec / 3600).toFixed(1);
    const pct = Math.round((sec / 3600) / user.dailyHours * 100);
    const status = sec === 0 ? '⬜' : pct >= 90 ? '✅' : pct >= 80 ? '⚠️' : '❌';
    console.log(`   ${status} ${user.name}: ${h}h (${pct}% de ${user.dailyHours}h)`);
  }
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
