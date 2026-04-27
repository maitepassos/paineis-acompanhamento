---
name: secretario-gestao-jira
description: |
  Assistente de gestão para microgerenciar o time via Jira - CONSULTA MANUAL.
  
  Quando você solicita, consulta em tempo real via MCP jira-desenv e jira-atendimento:
  - Filas de chamados com total geral e breakdown por situação
  - Chamados entregues/resolvidos no dia anterior
  
  Retorna tudo em tabelas formatadas no chat para análise imediata.
  
  USE ESTA SKILL QUANDO PEDIR:
  - "Relatório de gestão"
  - "Status do time"
  - "Quantos chamados em fila?"
  - "O que foi entregue ontem?"
  - "Status das filas"
  - "Dashboard de produtividade"

compatibility: |
  MCPs obrigatórios (já configurados):
  - jira-desenv       → Incidentes Desenvolvimento + Chamados entregues
  - jira-atendimento  → Suporte N2, Melhorias, Melhorias de Mercado, Exigência Legal
---

# Secretário de Gestão - Consulta via MCP Jira

## Como Executar o Relatório

Quando o usuário pedir "Relatório de gestão" ou similar, execute todos os blocos abaixo e formate conforme especificado.

---

## BLOCO 1 — Incidentes Desenvolvimento
MCP: jira-desenv | JQL: filter = 121810 | maxResults: 500

```javascript
const result = await jira.searchIssues('filter = 121810', { maxResults: 500 });
const porStatus = {};
for (const issue of result.issues) {
  const status = issue.fields.status.name;
  porStatus[status] = (porStatus[status] || 0) + 1;
}
return { total: result.total, por_situacao: porStatus };
```

Saída: total geral + tabela Situação | Qtd (ordenada maior → menor)

---

## BLOCO 2 — Suporte N2 Aguardando
MCP: jira-atendimento | JQL: filter = 165415 | maxResults: 500

```javascript
const result = await jira.searchIssues('filter = 165415', { maxResults: 500 });
const porStatus = {};
for (const issue of result.issues) {
  const status = issue.fields.status.name;
  porStatus[status] = (porStatus[status] || 0) + 1;
}
return { total: result.total, por_situacao: porStatus };
```

Saída: total geral + tabela Situação | Qtd (ordenada maior → menor)

---

## BLOCO 3 — Melhorias de Mercado Aguardando Análise
MCP: jira-atendimento | JQL: filter = 146414 | maxResults: 500

```javascript
const result = await jira.searchIssues('filter = 146414', { maxResults: 500 });
const porStatus = {};
for (const issue of result.issues) {
  const status = issue.fields.status.name;
  porStatus[status] = (porStatus[status] || 0) + 1;
}
return { total: result.total, por_situacao: porStatus };
```

Saída: total geral + tabela Situação | Qtd (ordenada maior → menor)

---

## BLOCO 4 — Exigência Legal
MCP: jira-atendimento | JQL: filter = 122108 | maxResults: 500

```javascript
const result = await jira.searchIssues('filter = 122108', { maxResults: 500 });
return {
  total: result.total,
  issues: result.issues.map(i => ({
    key: i.key,
    summary: i.fields.summary,
    description: i.fields.description
      ? i.fields.description.substring(0, 400)
      : '(sem descrição)',
    status: i.fields.status.name,
    assignee: i.fields.assignee?.displayName || 'Não atribuído'
  }))
};
```

Saída: total geral + tabela ID | Título | Descrição | Status | Responsável
IMPORTANTE: Se retornar erro 400 "does not exist for the field 'filter'", informar ao usuário que o filtro 122108 não está acessível com as credenciais atuais do MCP e solicitar verificação de permissão no Jira Atendimento.

---

## BLOCO 5 — Chamados Entregues (Dia Anterior)
MCP: jira-desenv
JQL: project in (SAUD, SOC, SD) AND issuetype in (Problema, Story, "Tratamento de dados") AND status in (Atendida, "Não atendida") AND resolved >= -1d

```javascript
const jql = 'project in (SAUD, SOC, SD) AND issuetype in (Problema, Story, "Tratamento de dados") AND status in (Atendida, "Não atendida") AND resolved >= -1d';
const result = await jira.searchIssues(jql, { maxResults: 100 });
return {
  total: result.total,
  issues: result.issues.map(i => ({
    key: i.key,
    summary: i.fields.summary,
    project: i.fields.project.key,
    status: i.fields.status.name,
    assignee: i.fields.assignee?.displayName || 'Não atribuído'
  }))
};
```

Saída: total + tabela ID | Título | Projeto | Status | Responsável

---

## Estrutura Final do Relatório

```
# RELATÓRIO DE GESTÃO — [DATA ATUAL]

## Resumo Executivo
Fila                                  | Total
--------------------------------------|------
Incidentes Desenvolvimento            | N
Suporte N2 Aguardando                 | N
Melhorias de Mercado Aguardando       | N
Exigência Legal                       | N (ou ⚠️ sem acesso)
TOTAL EM FILA                         | N
Entregues Ontem                       | N

---

## Filas de Chamados

### 1. Incidentes Desenvolvimento
[total + tabela por situação]

### 2. Suporte N2 Aguardando
[total + tabela por situação]

### 3. Melhorias de Mercado Aguardando Análise
[total + tabela por situação]

### 4. Exigência Legal
[total + tabela com código, título e descrição]

---

## Chamados Entregues Ontem
[tabela completa]

---

## Alertas e Recomendações
[gerados automaticamente com base nos dados]
```

---

## Notas

- Timesheet (horas dos colaboradores): módulo Tempo não acessível via MCP. Informar ao usuário se solicitado.
- Filtro 122108 (Exigência Legal): pode retornar erro 400 se não houver permissão — tratar e alertar.
- Dados sempre em tempo real.
- maxResults 500 garante agrupamento por status preciso.

---

## BLOCO 7 — Apontamentos dos Colaboradores (Dia Anterior)

### jira-desenv — Time 24 (worklogs via Tempo API)

```javascript
const innerClient = jira.client.client;
const hoje = new Date();
const ontem = new Date(hoje); ontem.setDate(ontem.getDate() - 1);
const data = ontem.toISOString().split('T')[0]; // YYYY-MM-DD

// Buscar membros do time 24
const membrosResp = await innerClient.get('/rest/tempo-teams/2/team/24/member');
const usernames = membrosResp.data.map(m => m.member.name);

// Buscar worklogs por usuário em paralelo
const wlPromises = usernames.map(async (username) => {
  try {
    const resp = await innerClient.get('/rest/tempo-timesheets/3/worklogs', {
      params: { username, dateFrom: data, dateTo: data }
    });
    const worklogs = resp.data || [];
    const totalSeg = worklogs.reduce((acc, wl) => acc + (wl.timeSpentSeconds || 0), 0);
    const displayName = worklogs[0]?.author?.displayName || username;
    return { nome: displayName, username, total_segundos: totalSeg, origem: 'desenv' };
  } catch(e) {
    return { nome: username, username, total_segundos: 0, origem: 'desenv' };
  }
});

const resultados = await Promise.all(wlPromises);
return { data, colaboradores: resultados.sort((a,b) => b.total_segundos - a.total_segundos) };
```

---

### jira-atendimento — Colaboradores via issues com worklog (dia anterior)

```javascript
const innerClient = jira.client.client;
const hoje = new Date();
const ontem = new Date(hoje); ontem.setDate(ontem.getDate() - 1);
const data = ontem.toISOString().split('T')[0];
const dataJql = data; // formato YYYY-MM-DD funciona no JQL

// Buscar issues com worklog ontem nos projetos de suporte
const issuesResp = await innerClient.get('/rest/api/2/search', {
  params: {
    jql: `worklogDate = "${dataJql}" AND project in (SOL, STAFSIS, CSMCSM, PUBINFOS)`,
    maxResults: 100,
    fields: 'key'
  }
});

const keys = issuesResp.data.issues.map(i => i.key);

// Buscar worklogs em paralelo
const wlPromises = keys.map(key =>
  innerClient.get(`/rest/api/2/issue/${key}/worklog`)
    .then(r => r.data.worklogs.filter(w => w.started?.startsWith(data)))
    .catch(() => [])
);
const allWls = await Promise.all(wlPromises);

// Agregar por autor
const colaboradores = {};
for (const wls of allWls) {
  for (const wl of wls) {
    const autor = wl.author.displayName;
    if (!colaboradores[autor]) colaboradores[autor] = { nome: autor, username: wl.author.name, segundos: 0, origem: 'atendimento' };
    colaboradores[autor].segundos += wl.timeSpentSeconds;
  }
}

return {
  data,
  total_issues: issuesResp.data.total,
  colaboradores: Object.values(colaboradores).sort((a,b) => b.segundos - a.segundos)
};
```

### Formato de saída — Lista Unificada

Combine os resultados dos dois Jira em uma única tabela, ordenada por total de horas (maior → menor).
Calcule a diferença em relação às 8h planejadas.

```
## ⏱️ APONTAMENTOS — 15/04/2026

Colaborador                     | Origem      | Total    | Planejado | Diferença | Status
--------------------------------|-------------|----------|-----------|-----------|--------
Pedro Henrique da Silva Santos  | Atendimento | 10h42m   | 8h00m     | +2h42m    | ⚠️ ESTOURO
Sandro da Silva Santos Filho    | Desenv      | 8h06m    | 8h00m     | +0h06m    | ✅ OK
Diogo Roberto da Silva          | Desenv      | 8h00m    | 8h00m     |  0h00m    | ✅ OK
...
(0h00m)                         | Desenv      | 0h00m    | 8h00m     | -8h00m    | 🔴 SEM REGISTRO
```

Legenda de status:
- ✅ OK: dentro de ±1h da meta (7h00m a 9h00m)
- ⚠️ ESTOURO: acima de 9h
- 🚨 ALERTA: abaixo de 7h (mas registrou algo)
- 🔴 SEM REGISTRO: 0h apontados

---

## BLOCO 7 — Apontamentos dos Colaboradores (Dia Anterior)

### Lista fixa de colaboradores monitorados

**jira-atendimento** (via worklogAuthor nas issues):
```javascript
const membrosAtendimento = [
  { nome: 'Alana Pinheiro da Silva', username: 'alana.psilva' },
  { nome: 'Juliana Lima e França',   username: 'juliana.franca@betha.com.br' },
  { nome: 'Kamila de Souza da Silva',  username: 'kamila.silva@betha.com.br' },
];
```

**jira-desenv** (via Tempo API `/rest/tempo-timesheets/3/worklogs`):
```javascript
const membrosDesenv = [
  { nome: 'Andrew Dutra Jorge',              username: 'andrew.jorge' },
  { nome: 'Arthur Bortoluzzi Coelho',       username: 'arthur.coelho' },
  { nome: 'Bruno Felipe Moreira Lima',       username: 'bruno.lima' },
  { nome: 'Diogo Rodrigues Paiano',          username: 'diogo.paiano' },
  { nome: 'Gabriel Constantino Boaventura',  username: 'gabriel.boaventura' },
  { nome: 'Gustavo Taufembach Bett',         username: 'gustavo.bett' },
  { nome: 'Ivo Roberto Oliani',              username: 'ivo.oliani' },
  { nome: 'Jhon Theylor Barros Steiner',     username: 'jhon.steiner' },
  { nome: 'João Marcos Vieira dos Santos',   username: 'joao.santos' },
  { nome: 'João Miguel Fortunato Rita',      username: 'joao.rita' },
  { nome: 'Kamila de Souza da Silva',        username: 'kamila.silva' },
  { nome: 'Maite Gabriel dos Passos',        username: 'maite.passos' },
  { nome: 'Max Fertig',                      username: 'max.fertig' },
  { nome: 'Rai Bonassa Martins',             username: 'rai.martins' },
  { nome: 'Sandro da Silva Santos Filho',    username: 'sandro.filho' },
  { nome: 'Tiago Gustavo Waide',             username: 'tiago.waide' },
];
```

---

### Código jira-desenv (Tempo API)
```javascript
const innerClient = jira.client.client;
const hoje = new Date();
const ontem = new Date(hoje); ontem.setDate(ontem.getDate() - 1);
const data = ontem.toISOString().split('T')[0];

const membros = [
  { nome: 'Andrew Dutra Jorge',              username: 'andrew.jorge' },
  { nome: 'Arthur Bortoluzzi Coelho',       username: 'arthur.coelho' },
  { nome: 'Bruno Felipe Moreira Lima',       username: 'bruno.lima' },
  { nome: 'Diogo Rodrigues Paiano',          username: 'diogo.paiano' },
  { nome: 'Gabriel Constantino Boaventura',  username: 'gabriel.boaventura' },
  { nome: 'Gustavo Taufembach Bett',         username: 'gustavo.bett' },
  { nome: 'Ivo Roberto Oliani',              username: 'ivo.oliani' },
  { nome: 'Jhon Theylor Barros Steiner',     username: 'jhon.steiner' },
  { nome: 'João Marcos Vieira dos Santos',   username: 'joao.santos' },
  { nome: 'João Miguel Fortunato Rita',      username: 'joao.rita' },
  { nome: 'Kamila de Souza da Silva',        username: 'kamila.silva' },
  { nome: 'Maite Gabriel dos Passos',        username: 'maite.passos' },
  { nome: 'Max Fertig',                      username: 'max.fertig' },
  { nome: 'Rai Bonassa Martins',             username: 'rai.martins' },
  { nome: 'Sandro da Silva Santos Filho',    username: 'sandro.filho' },
  { nome: 'Tiago Gustavo Waide',             username: 'tiago.waide' },
];

const wlPromises = membros.map(async (m) => {
  try {
    const resp = await innerClient.get('/rest/tempo-timesheets/3/worklogs', {
      params: { username: m.username, dateFrom: data, dateTo: data }
    });
    const seg = (resp.data || []).reduce((acc, wl) => acc + (wl.timeSpentSeconds || 0), 0);
    return { nome: m.nome, data, total_segundos: seg, origem: 'Desenv' };
  } catch(e) {
    return { nome: m.nome, data, total_segundos: 0, origem: 'Desenv' };
  }
});

return { data, colaboradores: await Promise.all(wlPromises) };
```

---

### Código jira-atendimento (via worklogAuthor nas issues)
```javascript
const innerClient = jira.client.client;
const hoje = new Date();
const ontem = new Date(hoje); ontem.setDate(ontem.getDate() - 1);
const data = ontem.toISOString().split('T')[0];

const membros = [
  { nome: 'Alana Pinheiro da Silva', username: 'alana.psilva' },
  { nome: 'Juliana Lima e França',   username: 'juliana.franca@betha.com.br' },
  { nome: 'Kamila de Souza da Silva',  username: 'kamila.silva@betha.com.br' },
];

const resultados = await Promise.all(membros.map(async (m) => {
  const issuesResp = await innerClient.get('/rest/api/2/search', {
    params: {
      jql: `worklogDate = "${data}" AND worklogAuthor = "${m.username}"`,
      maxResults: 100, fields: 'key'
    }
  });
  const keys = issuesResp.data.issues.map(i => i.key);
  if (keys.length === 0) return { nome: m.nome, data, total_segundos: 0, origem: 'Atendimento' };

  const wlData = await Promise.all(
    keys.map(key =>
      innerClient.get(`/rest/api/2/issue/${key}/worklog`)
        .then(r => r.data.worklogs.filter(w =>
          w.started?.startsWith(data) && w.author.name === m.username
        ))
        .catch(() => [])
    )
  );
  const totalSeg = wlData.flat().reduce((acc, wl) => acc + wl.timeSpentSeconds, 0);
  return { nome: m.nome, data, total_segundos: totalSeg, origem: 'Atendimento' };
}));

return { data, colaboradores: resultados };
```

---

### Formato de saída — Lista Unificada

Combine desenv + atendimento em uma única tabela.
Planejado = 8h (28800 segundos). Calcule diferença e status:
- ✅ OK: entre -1h e +1h (25200s a 32400s)
- ⚠️ ESTOURO: acima de 9h (32400s+)
- 🚨 ALERTA: abaixo de 7h mas acima de 0 (>0 e <25200s)
- 🔴 SEM REGISTRO: 0 segundos

```
## ⏱️ APONTAMENTOS — [DATA]

| Colaborador                    | Origem      | Total  | Planejado | Diferença | Status |
|--------------------------------|-------------|--------|-----------|-----------|--------|
| Sandro da Silva Santos Filho   | Desenv      | 8h06m  | 8h00m     | +0h06m    | ✅ OK  |
| Juliana Lima e França          | Atendimento | 4h28m  | 8h00m     | -3h32m    | 🚨     |
| ...                            |             |        |           |           |        |
| Bruno Felipe Moreira Lima      | Desenv      | 0h00m  | 8h00m     | -8h00m    | 🔴     |
```
