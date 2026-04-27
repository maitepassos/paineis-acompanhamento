// ─────────────────────────────────────────────────────────────────────────────
// DADOS EXTRAÍDOS DIRETAMENTE DO JIRA (jira-desenv + jira-atendimento)
// Período: Abril de 2026
// Última atualização: 2026-04-24
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
    const today = new Date('2026-04-24T12:00:00Z');
    const d = new Date(today);
    d.setDate(d.getDate() - 1);
    while (!isUtilDay(d)) {
      d.setDate(d.getDate() - 1);
    }
    return d.toISOString().split('T')[0];
  }

  function getWeekRange() {
    const today = new Date('2026-04-24T12:00:00Z');
    const dow = today.getDay();

    let daysToMonday;
    if (dow === 0) {
      daysToMonday = 2;
    } else if (dow === 1) {
      daysToMonday = 0;
    } else {
      daysToMonday = dow - 1;
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
    const today = new Date('2026-04-24T12:00:00Z');
    const year = today.getFullYear();
    const month = today.getMonth();
    return {
      inicio: `${year}-${String(month + 1).padStart(2, '0')}-01`,
      fim: today.toISOString().split('T')[0]
    };
  }

  window.DATA_INFO = {
    hoje: new Date('2026-04-24T12:00:00Z').toISOString().split('T')[0],
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
  // Dados extraídos do Jira em tempo real (worklogs de 23/04)
  // Total: 595.980s (165.55h)
  apontamentos_diario: [
    { nome: "Marlon Mazzine dos Santos Figueiredo", origem: "Desenv", total_segundos: 15060, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Romulo Vinicius Lemes Gonçalves", origem: "Desenv", total_segundos: 28800, esperado_segundos: 28800, status: "OK" },
    { nome: "Deny Steiner", origem: "Desenv", total_segundos: 25560, esperado_segundos: 28800, status: "OK" },
    { nome: "Jose Luis de Oliveira Marafon", origem: "Desenv", total_segundos: 23280, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Kelly Goudinho Cardoso", origem: "Desenv", total_segundos: 21600, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Amanda Somariva", origem: "Desenv", total_segundos: 21600, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Morgana Casagrande Guizzo Dagostin", origem: "Desenv", total_segundos: 3600, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Francine Feltrin Nunes", origem: "Desenv", total_segundos: 20088, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Ana Claudia Casagrande Patricio", origem: "Desenv", total_segundos: 22680, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Marilia Teixeira Pires", origem: "Desenv", total_segundos: 10800, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Gabriel Ferreira Guinzani", origem: "Desenv", total_segundos: 25200, esperado_segundos: 28800, status: "OK" },
    { nome: "Moises Delfino Campos", origem: "Desenv", total_segundos: 26940, esperado_segundos: 28800, status: "OK" },
    { nome: "Tatiana Viana Custodio", origem: "Desenv", total_segundos: 17340, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Alan Nicolas Lins de Albuquerque", origem: "Desenv", total_segundos: 21600, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Protasio Wille Pauli", origem: "Desenv", total_segundos: 19560, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Fabio Duarte Euzebio", origem: "Desenv", total_segundos: 6720, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Adler Mateus Cachuba", origem: "Desenv", total_segundos: 10800, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Leonardo Saturnino Vieira", origem: "Desenv", total_segundos: 5400, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Ramon Vieira Viquetti", origem: "Desenv", total_segundos: 15060, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Franciele Fernandes", origem: "Desenv", total_segundos: 24192, esperado_segundos: 28800, status: "OK" },
    { nome: "Regiane Pizzetti Borges", origem: "Desenv", total_segundos: 15000, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Gabriel Vitor Porfirio Laurindo", origem: "Desenv", total_segundos: 22500, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Lucas Campos Izidoro", origem: "Desenv", total_segundos: 24960, esperado_segundos: 28800, status: "OK" },
    { nome: "Alexsandro Rodrigues", origem: "Desenv", total_segundos: 16320, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Daniele Vicente Duarte", origem: "Desenv", total_segundos: 4200, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Diana Colombo Pelegrin Tartari", origem: "Desenv", total_segundos: 1920, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Danilo Formanski", origem: "Desenv", total_segundos: 2400, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Joao Henrique Da Rocha Machado", origem: "Desenv", total_segundos: 28740, esperado_segundos: 28800, status: "OK" },
    { nome: "Raul Silva Birlem", origem: "Desenv", total_segundos: 28800, esperado_segundos: 28800, status: "OK" },
    { nome: "Rodrigo Garcia Fontanela", origem: "Desenv", total_segundos: 21480, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Rangel da Silva Cardoso", origem: "Desenv", total_segundos: 5580, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Jeferson Luiz da Cruz", origem: "Atendimento", total_segundos: 7080, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Tiago Farias Macarini", origem: "Atendimento", total_segundos: 4380, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Ligia Vitali Binatti", origem: "Atendimento", total_segundos: 2400, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Mônica Andrade da Silva Moreira", origem: "Atendimento", total_segundos: 2760, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Josiane da Silva Rocha", origem: "Atendimento", total_segundos: 8400, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Gian Teixeira", origem: "Atendimento", total_segundos: 2400, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Edianez Possoli de Souza", origem: "Atendimento", total_segundos: 2640, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Geovana de Sá Albino", origem: "Atendimento", total_segundos: 600, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Waldner Corneo Viola", origem: "Atendimento", total_segundos: 1800, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Dirceu Scarsi", origem: "Atendimento", total_segundos: 2700, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Lucas Fortunato Martins", origem: "Atendimento", total_segundos: 1140, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Alana Pinheiro da Silva", origem: "Atendimento", total_segundos: 1800, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Cleber de Melo Vieira", origem: "Atendimento", total_segundos: 300, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Ronaldo Adriano Faria", origem: "Atendimento", total_segundos: 15600, esperado_segundos: 28800, status: "ALERTA" },
    { nome: "Elisangela Vargas", origem: "Atendimento", total_segundos: 4200, esperado_segundos: 28800, status: "ALERTA" }
  ],

  // ── SEMANAL — 20/04 a 24/04/2026 (Seg a Qua-Qui-Sex = 4 dias úteis) ────────
  // Dados extraídos do Jira (soma de 20, 22, 23, 24)
  // Total: 2.010.000s (558.33h)
  apontamentos_semanal: [
    { nome: "Marlon Mazzine dos Santos Figueiredo", origem: "Desenv", total_segundos: 79640, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Romulo Vinicius Lemes Gonçalves", origem: "Desenv", total_segundos: 115200, esperado_segundos: 115200, status: "OK" },
    { nome: "Deny Steiner", origem: "Desenv", total_segundos: 68580, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Jose Luis de Oliveira Marafon", origem: "Desenv", total_segundos: 83160, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Kelly Goudinho Cardoso", origem: "Desenv", total_segundos: 88200, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Amanda Somariva", origem: "Desenv", total_segundos: 95100, esperado_segundos: 115200, status: "OK" },
    { nome: "Ana Claudia Casagrande Patricio", origem: "Desenv", total_segundos: 85700, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Marilia Teixeira Pires", origem: "Desenv", total_segundos: 67680, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Gabriel Ferreira Guinzani", origem: "Desenv", total_segundos: 75600, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Moises Delfino Campos", origem: "Desenv", total_segundos: 96900, esperado_segundos: 115200, status: "OK" },
    { nome: "Protasio Wille Pauli", origem: "Desenv", total_segundos: 72600, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Fabio Duarte Euzebio", origem: "Desenv", total_segundos: 15336, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Ramon Vieira Viquetti", origem: "Desenv", total_segundos: 71940, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Franciele Fernandes", origem: "Desenv", total_segundos: 86472, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Regiane Pizzetti Borges", origem: "Desenv", total_segundos: 63420, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Gabriel Vitor Porfirio Laurindo", origem: "Desenv", total_segundos: 93900, esperado_segundos: 115200, status: "OK" },
    { nome: "Joao Henrique Da Rocha Machado", origem: "Desenv", total_segundos: 93120, esperado_segundos: 115200, status: "OK" },
    { nome: "Raul Silva Birlem", origem: "Desenv", total_segundos: 115200, esperado_segundos: 115200, status: "OK" },
    { nome: "Jeferson Luiz da Cruz", origem: "Atendimento", total_segundos: 22480, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Tiago Farias Macarini", origem: "Atendimento", total_segundos: 10560, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Ligia Vitali Binatti", origem: "Atendimento", total_segundos: 17600, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Mônica Andrade da Silva Moreira", origem: "Atendimento", total_segundos: 30100, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Josiane da Silva Rocha", origem: "Atendimento", total_segundos: 29400, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Gian Teixeira", origem: "Atendimento", total_segundos: 7200, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Edianez Possoli de Souza", origem: "Atendimento", total_segundos: 11220, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Geovana de Sá Albino", origem: "Atendimento", total_segundos: 600, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Waldner Corneo Viola", origem: "Atendimento", total_segundos: 8800, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Dirceu Scarsi", origem: "Atendimento", total_segundos: 19280, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Lucas Fortunato Martins", origem: "Atendimento", total_segundos: 28800, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Alana Pinheiro da Silva", origem: "Atendimento", total_segundos: 18000, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Ronaldo Adriano Faria", origem: "Atendimento", total_segundos: 32400, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Elisangela Vargas", origem: "Atendimento", total_segundos: 10200, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Daniele Vicente Duarte", origem: "Desenv", total_segundos: 15840, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Francine Feltrin Nunes", origem: "Desenv", total_segundos: 34788, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Morgana Casagrande Guizzo Dagostin", origem: "Desenv", total_segundos: 31500, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Adler Mateus Cachuba", origem: "Desenv", total_segundos: 32400, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Leonardo Saturnino Vieira", origem: "Desenv", total_segundos: 53600, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Tatiana Viana Custodio", origem: "Desenv", total_segundos: 25260, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Alan Nicolas Lins de Albuquerque", origem: "Desenv", total_segundos: 21600, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Rodrigo Garcia Fontanela", origem: "Desenv", total_segundos: 44160, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Rangel da Silva Cardoso", origem: "Desenv", total_segundos: 27480, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Alexsandro Rodrigues", origem: "Desenv", total_segundos: 36900, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Lucas Campos Izidoro", origem: "Desenv", total_segundos: 32760, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Diana Colombo Pelegrin Tartari", origem: "Desenv", total_segundos: 2340, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Danilo Formanski", origem: "Desenv", total_segundos: 2400, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Daiane de Oliveira Joao", origem: "Desenv", total_segundos: 480, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Emily Oliveira Risse Xavier", origem: "Desenv", total_segundos: 7980, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Gustavo Dorigon Coan", origem: "Desenv", total_segundos: 7200, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Lucionei Del Castanhel Chequeto", origem: "Desenv", total_segundos: 14760, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Luiz Felipe Gonçalves Claudino", origem: "Desenv", total_segundos: 4800, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Willian Dagostin Bittencourt", origem: "Desenv", total_segundos: 28200, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Eduardo Ribarski Scalco", origem: "Desenv", total_segundos: 13200, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Evelini Stefani", origem: "Atendimento", total_segundos: 2040, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Talissa Regina Occhi Buckell", origem: "Atendimento", total_segundos: 3060, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Danielly Fernandes de Albuquerque ", origem: "Atendimento", total_segundos: 5640, esperado_segundos: 115200, status: "ALERTA" },
    { nome: "Patrick Patricio Borges", origem: "Atendimento", total_segundos: 360, esperado_segundos: 115200, status: "ALERTA" }
  ],

  // ── MENSAL — 01/04 a 24/04/2026 (todos os dias úteis) ─
  // Dados extraídos do Jira em tempo real
  apontamentos_mensal: [
    { nome: "Marlon Mazzine dos Santos Figueiredo", origem: "Desenv", total_segundos: 530280, esperado_segundos: 489600, status: "ESTOURO" },
    { nome: "Romulo Vinicius Lemes Gonçalves", origem: "Desenv", total_segundos: 489600, esperado_segundos: 489600, status: "OK" },
    { nome: "Deny Steiner", origem: "Desenv", total_segundos: 394020, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Jose Luis de Oliveira Marafon", origem: "Desenv", total_segundos: 395100, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Kelly Goudinho Cardoso", origem: "Desenv", total_segundos: 341400, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Amanda Somariva", origem: "Desenv", total_segundos: 355200, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Ana Claudia Casagrande Patricio", origem: "Desenv", total_segundos: 376560, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Marilia Teixeira Pires", origem: "Desenv", total_segundos: 329280, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Gabriel Ferreira Guinzani", origem: "Desenv", total_segundos: 329400, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Moises Delfino Campos", origem: "Desenv", total_segundos: 417300, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Protasio Wille Pauli", origem: "Desenv", total_segundos: 345900, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Fabio Duarte Euzebio", origem: "Desenv", total_segundos: 131220, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Ramon Vieira Viquetti", origem: "Desenv", total_segundos: 242820, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Franciele Fernandes", origem: "Desenv", total_segundos: 364872, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Regiane Pizzetti Borges", origem: "Desenv", total_segundos: 247860, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Gabriel Vitor Porfirio Laurindo", origem: "Desenv", total_segundos: 371700, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Joao Henrique Da Rocha Machado", origem: "Desenv", total_segundos: 405180, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Raul Silva Birlem", origem: "Desenv", total_segundos: 488400, esperado_segundos: 489600, status: "OK" },
    { nome: "Jeferson Luiz da Cruz", origem: "Atendimento", total_segundos: 156120, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Tiago Farias Macarini", origem: "Atendimento", total_segundos: 53340, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Ligia Vitali Binatti", origem: "Atendimento", total_segundos: 88200, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Mônica Andrade da Silva Moreira", origem: "Atendimento", total_segundos: 172620, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Josiane da Silva Rocha", origem: "Atendimento", total_segundos: 173400, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Gian Teixeira", origem: "Atendimento", total_segundos: 50100, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Edianez Possoli de Souza", origem: "Atendimento", total_segundos: 67020, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Geovana de Sá Albino", origem: "Atendimento", total_segundos: 840, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Waldner Corneo Viola", origem: "Atendimento", total_segundos: 61200, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Dirceu Scarsi", origem: "Atendimento", total_segundos: 98940, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Lucas Fortunato Martins", origem: "Atendimento", total_segundos: 134220, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Alana Pinheiro da Silva", origem: "Atendimento", total_segundos: 27300, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Ronaldo Adriano Faria", origem: "Atendimento", total_segundos: 59700, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Elisangela Vargas", origem: "Atendimento", total_segundos: 37800, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Daniele Vicente Duarte", origem: "Desenv", total_segundos: 98040, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Francine Feltrin Nunes", origem: "Desenv", total_segundos: 159876, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Morgana Casagrande Guizzo Dagostin", origem: "Desenv", total_segundos: 143400, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Adler Mateus Cachuba", origem: "Desenv", total_segundos: 154800, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Leonardo Saturnino Vieira", origem: "Desenv", total_segundos: 335400, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Tatiana Viana Custodio", origem: "Desenv", total_segundos: 103020, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Alan Nicolas Lins de Albuquerque", origem: "Desenv", total_segundos: 21600, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Rodrigo Garcia Fontanela", origem: "Desenv", total_segundos: 194400, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Rangel da Silva Cardoso", origem: "Desenv", total_segundos: 113160, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Alexsandro Rodrigues", origem: "Desenv", total_segundos: 112140, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Lucas Campos Izidoro", origem: "Desenv", total_segundos: 97680, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Diana Colombo Pelegrin Tartari", origem: "Desenv", total_segundos: 2340, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Danilo Formanski", origem: "Desenv", total_segundos: 2400, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Daiane de Oliveira Joao", origem: "Desenv", total_segundos: 480, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Emily Oliveira Risse Xavier", origem: "Desenv", total_segundos: 7980, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Gustavo Dorigon Coan", origem: "Desenv", total_segundos: 7200, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Lucionei Del Castanhel Chequeto", origem: "Desenv", total_segundos: 14760, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Luiz Felipe Gonçalves Claudino", origem: "Desenv", total_segundos: 4800, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Willian Dagostin Bittencourt", origem: "Desenv", total_segundos: 56400, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Eduardo Ribarski Scalco", origem: "Desenv", total_segundos: 127500, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Evelini Stefani", origem: "Atendimento", total_segundos: 2040, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Talissa Regina Occhi Buckell", origem: "Atendimento", total_segundos: 8880, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Danielly Fernandes de Albuquerque ", origem: "Atendimento", total_segundos: 5640, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Patrick Patricio Borges", origem: "Atendimento", total_segundos: 360, esperado_segundos: 489600, status: "ALERTA" },
    { nome: "Cleber de Melo Vieira", origem: "Atendimento", total_segundos: 300, esperado_segundos: 489600, status: "ALERTA" }
  ]
};
