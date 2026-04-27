// ─────────────────────────────────────────────────────────────────────────────
// FERIADOS E DATAS
// ─────────────────────────────────────────────────────────────────────────────
// 21/04 = Tiradentes (feriado)
//
// Status (margem 10%):
//   OK          → apontado >= esperado × 0.90
//   ESTOURO     → apontado >  esperado × 1.10
//   ALERTA      → 0 < apontado < esperado × 0.90
//   SEM_REGISTRO → apontado = 0
// ─────────────────────────────────────────────────────────────────────────────

/* Cálculo automático de datas */
(function() {
  const FERIADOS = new Set(['2026-04-21']); // Tiradentes

  function isUtilDay(date) {
    const day = date.getDay();
    const dateStr = date.toISOString().split('T')[0];
    return day !== 0 && day !== 6 && !FERIADOS.has(dateStr);
  }

  function getLastUtilDay() {
    const today = new Date('2026-04-24');
    const d = new Date(today);
    d.setDate(d.getDate() - 1);
    while (!isUtilDay(d)) {
      d.setDate(d.getDate() - 1);
    }
    return d.toISOString().split('T')[0];
  }

  function getWeekRange() {
    // 24/04/2026 é sexta-feira (dow = 5)
    // Segunda dessa semana = 22/04/2026 (dow - 3)
    // Sexta dessa semana = 26/04/2026 (dow + 1)
    // MAS: 21/04 é feriado, então a semana útil é 20, 22, 23, 24, 26
    // MOSTRAR: 20/04 a 24/04 (segunda a sexta úteis, desconsiderando feriado)
    const today = new Date('2026-04-24T12:00:00Z');
    const dow = today.getDay(); // 0=dom, 1=seg, 2=ter, 3=qua, 4=qui, 5=sex, 6=sab

    let daysToMonday;
    if (dow === 0) {
      daysToMonday = 2; // domingo - segunda foi 2 dias atrás
    } else if (dow === 1) {
      daysToMonday = 0; // segunda - é hoje
    } else {
      daysToMonday = dow - 1; // terça a sábado - segunda foi (dow-1) dias atrás
    }

    const monday = new Date(today);
    monday.setDate(today.getDate() - daysToMonday);

    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    return {
      inicio: monday.toISOString().split('T')[0],
      fim: friday.toISOString().split('T')[0]
    };
  }

  function getMonthRange() {
    const today = new Date('2026-04-24');
    const year = today.getFullYear();
    const month = today.getMonth();
    return {
      inicio: `${year}-${String(month + 1).padStart(2, '0')}-01`,
      fim: today.toISOString().split('T')[0]
    };
  }

  window.DATA_INFO = {
    hoje: new Date('2026-04-24').toISOString().split('T')[0],
    ultimoDiaUtil: getLastUtilDay(),
    semana: getWeekRange(),
    mes: getMonthRange()
  };
})();

window.RELATORIO_DATA = {
  gerado_em: "2026-04-24T09:30:00",
  data_referencia: window.DATA_INFO.ultimoDiaUtil,

  semana: window.DATA_INFO.semana,
  mes:    window.DATA_INFO.mes,

  filas: {
    incidentes_desenv: {
      total: 72,
      por_status: {
        "Aguardando análise": 58, "Em análise": 8,
        "Realizando implementação": 3, "Aguardando implementação": 1,
        "Não iniciado": 1, "Atendimento interrompido": 1
      }
    },
    suporte_n2: {
      total: 11,
      por_status: { "Aguardando atendimento N2 (SUP)": 8, "Em atendimento N2 (SUP)": 1, "Aguardando Triagem (SUP)": 2 }
    },
    melhorias_mercado: {
      total: 44,
      por_status: { "Aguardando avaliação": 40, "Em avaliação": 4 }
    },
    exigencia_legal: { total: 0, por_status: {} }
  },

  entregues: {
    total: 16,
    issues: [
      { key: "SAUD-73746", summary: "Rotina Dispensa não esta aceitando edição no campo quantidade dispensada.", project: "SAUD", status: "Atendida", assignee: "Rai Bonassa Martins" },
      { key: "SAUD-73728", summary: "Botão \"Copiar Evolução\" não copia a anamnese", project: "SAUD", status: "Atendida", assignee: "Rai Bonassa Martins" },
      { key: "SAUD-73615", summary: "[e-SUS] Inconsistência \"Nome do pai do cliente é inválido\"", project: "SAUD", status: "Atendida", assignee: "Rai Bonassa Martins" },
      { key: "SAUD-73522", summary: "Ajustar atribuição ngModel na modal de produtos", project: "SAUD", status: "Atendida", assignee: "João Miguel Fortunato Rita" },
      { key: "SAUD-73496", summary: "Correção ortográfica no termo de busca \"Acompanhamento Idoso\"", project: "SAUD", status: "Atendida", assignee: "Rai Bonassa Martins" },
      { key: "SAUD-73475", summary: "[ENTRADA/ESTOQUE] Limpa todos os campos ao apertar ENTER", project: "SAUD", status: "Atendida", assignee: "João Miguel Fortunato Rita" },
      { key: "SAUD-73466", summary: "[COFINANCIAMENTO] Filtro não busca o cliente pelo Código", project: "SAUD", status: "Atendida", assignee: "Rai Bonassa Martins" },
      { key: "SAUD-73452", summary: "[RELATÓRIOS] Comprovante de Agendamento de Viagem - endereço saindo em branco", project: "SAUD", status: "Atendida", assignee: "João Marcos Vieira dos Santos" },
      { key: "SAUD-73416", summary: "[REQUISIÇÃO/ESTOQUE] Ao requisitar novamente em Almoxarifado>Requisição", project: "SAUD", status: "Atendida", assignee: "Arthur Bortoluzzi Coelho" },
      { key: "SAUD-73382", summary: "[TRANSPORTE] FILTRO NA ROTINA VIAGENS", project: "SAUD", status: "Atendida", assignee: "Rai Bonassa Martins" },
      { key: "SAUD-73221", summary: "Replicar viagens não salva Outro quando é editado a parada", project: "SAUD", status: "Atendida", assignee: "João Miguel Fortunato Rita" },
      { key: "SAUD-73148", summary: "Problema no transporte", project: "SAUD", status: "Atendida", assignee: "João Miguel Fortunato Rita" },
      { key: "SAUD-73142", summary: "Ao visualizar um agendamento de TFD, sistema não bloqueia os campos de endereço.", project: "SAUD", status: "Atendida", assignee: "João Miguel Fortunato Rita" },
      { key: "SAUD-72913", summary: "[CADASTROS] Cadastros de clientes com erro do sistema", project: "SAUD", status: "Atendida", assignee: "Rai Bonassa Martins" },
      { key: "SAUD-72535", summary: "Pacientes inativados por unificação não devem ser importados para o aplicativo Saúde Domiciliar", project: "SAUD", status: "Atendida", assignee: "Rai Bonassa Martins" },
      { key: "SAUD-70847", summary: "Painel de senhas para Central de Regulação - contexto secretaria", project: "SAUD", status: "Não atendida", assignee: "Márcio Heleno Maia Pessoa" }
    ]
  },

  // ── DIÁRIO — 23/04/2026 (Quinta-feira) — último dia útil ────────────────
  // Dados extraídos do Jira (worklogs reais do projeto SAUD)
  // Padrão 8h → esperado = 28800s | threshold = 25920s
  apontamentos_diario: [
    { nome: "Rai Bonassa Martins",             username: "rai.martins",     origem: "Desenv/SAUD", total_segundos: 14400,  esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Gustavo Taufembach Bett",         username: "gustavo.bett",    origem: "Desenv/SAUD", total_segundos: 26100,  esperado_segundos: 28800, status: "OK" },
    { nome: "Sandro da Silva Santos Filho",    username: "sandro.filho",    origem: "Desenv/SAUD", total_segundos: 12600,  esperado_segundos: 28800, status: "ALERTA" },
    { nome: "João Marcos Vieira dos Santos",   username: "joao.santos",     origem: "Desenv/SAUD", total_segundos: 10800,  esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Tiago Gustavo Waide",             username: "tiago.waide",     origem: "Desenv/SAUD", total_segundos: 12600,  esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Max Fertig",                      username: "max.fertig",      origem: "Desenv/SAUD", total_segundos: 15516,  esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Ivo Roberto Oliani",              username: "ivo.oliani",      origem: "Desenv/SAUD", total_segundos: 3600,   esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Arthur Bortoluzzi Coelho",        username: "arthur.coelho",   origem: "Desenv/SAUD", total_segundos: 900,    esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Diogo Rodrigues Paiano",          username: "diogo.paiano",    origem: "Desenv/SAUD", total_segundos: 0,      esperado_segundos: 28800, status: "SEM_REGISTRO" },
    { nome: "Andrew Dutra Jorge",              username: "andrew.jorge",    origem: "Desenv/SAUD", total_segundos: 0,      esperado_segundos: 28800, status: "SEM_REGISTRO" },
    { nome: "João Miguel Fortunato Rita",      username: "joao.rita",       origem: "Desenv/SAUD", total_segundos: 0,      esperado_segundos: 28800, status: "SEM_REGISTRO" },
    { nome: "Bruno Felipe Moreira Lima",       username: "bruno.lima",      origem: "Desenv/SAUD", total_segundos: 6840,   esperado_segundos: 28800, status: "ALERTA" }
  ],

  // ── SEMANAL — 20/04 a 26/04/2026 (Seg-Ter(feriado)-Qua-Qui-Sex = 4 dias úteis) ────────
  // Dados extraídos do Jira (soma de 20, 22, 23, 24 - 21/04 é feriado)
  // Padrão Seg-Sex 8h: 4 dias × 28800s = 115.200s (32h) | threshold = 103.680s
  apontamentos_semanal: [
    { nome: "Rai Bonassa Martins",             username: "rai.martins",     origem: "Desenv/SAUD", total_segundos: 48312,  esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Gustavo Taufembach Bett",         username: "gustavo.bett",    origem: "Desenv/SAUD", total_segundos: 45288,  esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Sandro da Silva Santos Filho",    username: "sandro.filho",    origem: "Desenv/SAUD", total_segundos: 37800,  esperado_segundos: 115200, status: "ALERTA" },
    { nome: "João Marcos Vieira dos Santos",   username: "joao.santos",     origem: "Desenv/SAUD", total_segundos: 39600,  esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Tiago Gustavo Waide",             username: "tiago.waide",     origem: "Desenv/SAUD", total_segundos: 15300,  esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Max Fertig",                      username: "max.fertig",      origem: "Desenv/SAUD", total_segundos: 22392,  esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Ivo Roberto Oliani",              username: "ivo.oliani",      origem: "Desenv/SAUD", total_segundos: 3600,   esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Arthur Bortoluzzi Coelho",        username: "arthur.coelho",   origem: "Desenv/SAUD", total_segundos: 7200,   esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Diogo Rodrigues Paiano",          username: "diogo.paiano",    origem: "Desenv/SAUD", total_segundos: 27900,  esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Andrew Dutra Jorge",              username: "andrew.jorge",    origem: "Desenv/SAUD", total_segundos: 28692,  esperado_segundos: 115200, status: "ALERTA" },
    { nome: "João Miguel Fortunato Rita",      username: "joao.rita",       origem: "Desenv/SAUD", total_segundos: 15012,  esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Bruno Felipe Moreira Lima",       username: "bruno.lima",      origem: "Desenv/SAUD", total_segundos: 6840,   esperado_segundos: 115200, status: "ALERTA" }
  ],

  // ── MENSAL — 01/04 a 24/04/2026 (17 dias úteis, excluindo 21/04 feriado) ─
  // Padrão Seg-Sex 8h : 17 dias × 28800 = 489600s | threshold = 440640s
  apontamentos_mensal: [
    { nome: "Rai Bonassa Martins",             username: "rai.martins",     origem: "Desenv/SAUD", total_segundos: 163512, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Ivo Roberto Oliani",              username: "ivo.oliani",      origem: "Desenv/SAUD", total_segundos: 99000,  esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Arthur Bortoluzzi Coelho",        username: "arthur.coelho",   origem: "Desenv/SAUD", total_segundos: 74700,  esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Sandro da Silva Santos Filho",    username: "sandro.filho",    origem: "Desenv/SAUD", total_segundos: 63000,  esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Diogo Rodrigues Paiano",          username: "diogo.paiano",    origem: "Desenv/SAUD", total_segundos: 58500,  esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Andrew Dutra Jorge",              username: "andrew.jorge",    origem: "Desenv/SAUD", total_segundos: 52092,  esperado_segundos: 489600, status: "ALERTA" },
    { nome: "João Marcos Vieira dos Santos",   username: "joao.santos",     origem: "Desenv/SAUD", total_segundos: 46800,  esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Gustavo Taufembach Bett",         username: "gustavo.bett",    origem: "Desenv/SAUD", total_segundos: 45288,  esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Tiago Gustavo Waide",             username: "tiago.waide",    origem: "Desenv/SAUD", total_segundos: 43200,  esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Max Fertig",                      username: "max.fertig",      origem: "Desenv/SAUD", total_segundos: 39240,  esperado_segundos: 489600, status: "ALERTA" },
    { nome: "João Miguel Fortunato Rita",      username: "joao.rita",       origem: "Desenv/SAUD", total_segundos: 34560,  esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Bruno Felipe Moreira Lima",       username: "bruno.lima",      origem: "Desenv/SAUD", total_segundos: 6840,   esperado_segundos: 489600, status: "ALERTA" }
  ],

};
