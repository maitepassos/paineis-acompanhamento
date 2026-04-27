// Dados reais dos worklogs extraídos do Jira
const worklogs_desenv = {
  "Arthur Bortoluzzi Coelho": { "2026-04-20": 0, "2026-04-22": 0, "2026-04-23": 0, "2026-04-24": 3900 },
  "Gustavo Taufembach Bett": { "2026-04-20": 0, "2026-04-22": 11100, "2026-04-23": 26100, "2026-04-24": 6660 },
  "Max Fertig": { "2026-04-20": 5400, "2026-04-22": 1476, "2026-04-23": 14184, "2026-04-24": 0 },
  "Tiago Gustavo Waide": { "2026-04-20": 0, "2026-04-22": 2700, "2026-04-23": 12600, "2026-04-24": 0 },
  "Ivo Roberto Oliani": { "2026-04-20": 0, "2026-04-22": 0, "2026-04-23": 3600, "2026-04-24": 0 },
  "Rai Bonassa Martins": { "2026-04-20": 4800, "2026-04-22": 14400, "2026-04-23": 3600, "2026-04-24": 0 },
  "Sandro da Silva Santos Filho": { "2026-04-20": 0, "2026-04-22": 19800, "2026-04-23": 10800, "2026-04-24": 5400 },
  "Bruno Felipe Moreira Lima": { "2026-04-20": 0, "2026-04-22": 0, "2026-04-23": 6840, "2026-04-24": 0 },
  "João Marcos Vieira dos Santos": { "2026-04-20": 10800, "2026-04-22": 18000, "2026-04-23": 10800, "2026-04-24": 0 },
  "Andrew Dutra Jorge": { "2026-04-20": 18900, "2026-04-22": 4800, "2026-04-23": 0, "2026-04-24": 0 },
  "João Miguel Fortunato Rita": { "2026-04-20": 13800, "2026-04-22": 1200, "2026-04-23": 0, "2026-04-24": 0 }
};

const worklogs_atend = {
  "Alana Pinheiro da Silva": { "2026-04-22": 1800, "2026-04-23": 1800, "2026-04-24": 5100 },
  "Juliana Lima e França": { "2026-04-20": 0, "2026-04-22": 0, "2026-04-23": 0, "2026-04-24": 0 }
};

// Calcular status baseado em margem de 10%
function calcStatus(apontado, esperado) {
  if (apontado === 0) return "SEM_REGISTRO";
  const pct = apontado / esperado;
  if (pct >= 1.10) return "ESTOURO";
  if (pct >= 0.90) return "OK";
  return "ALERTA";
}

// Esperados diários
const esperado_diario = {
  "Andrew Dutra Jorge": 28800,
  "Arthur Bortoluzzi Coelho": 28800,
  "Bruno Felipe Moreira Lima": 28800,
  "Gustavo Taufembach Bett": 28800,
  "Ivo Roberto Oliani": 28800,
  "João Marcos Vieira dos Santos": 21600,  // 6h/dia
  "João Miguel Fortunato Rita": 28800,
  "Max Fertig": 28800,
  "Rai Bonassa Martins": 28800,
  "Sandro da Silva Santos Filho": 28800,
  "Tiago Gustavo Waide": 28800,
  "Alana Pinheiro da Silva": 28800,
  "Juliana Lima e França": 28800,
  "Kamila de Souza da Silva": 14400,  // 4h Seg-Qui
  "Diogo Rodrigues Paiano": 14400,  // 4h Seg-Qui
  "Gabriel Constantino Boaventura": 21600  // 6h Seg-Qui
};

// Gerar dados para cada dia
console.log("// Dados para 23/04 (último dia útil):");
const apontamentos_23 = [];
for (const [nome, esperado] of Object.entries(esperado_diario)) {
  const worklogs = worklogs_desenv[nome] || worklogs_atend[nome] || {};
  const apontado = worklogs["2026-04-23"] || 0;
  const status = calcStatus(apontado, esperado);
  
  apontamentos_23.push({
    nome,
    apontado,
    esperado,
    status,
    diferencaa: apontado - esperado
  });
}

console.log(JSON.stringify(apontamentos_23, null, 2));
