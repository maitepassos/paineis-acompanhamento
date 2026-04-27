const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.title = 'BU Saude Pitch Conselho';

const C = {
  darkBlue: '1A3C6E', midBlue: '2563EB', green: '4CAF50', darkGreen: '388E3C',
  white: 'FFFFFF', lightGray: 'F5F7FA', textDark: '1E293B', textMid: '475569',
};

// ====== SLIDE 1 ======
const s1 = pres.addSlide();
s1.background = { color: C.darkBlue };

s1.addText('BU Sa\u00fade \u2014 Tra\u00e7\u00e3o Comprovada', {
  x: 0.4, y: 0.18, w: 7.5, h: 0.55, fontSize: 28, bold: true, color: C.white, fontFace: 'Calibri', margin: 0,
});
s1.addText('Mercado Endere\u00e7\u00e1vel: SAM R$1,2 bi  |  SOM R$420 mi', {
  x: 6.0, y: 0.27, w: 3.65, h: 0.35, fontSize: 9.5, color: 'A8C4E8', align: 'right', fontFace: 'Calibri', margin: 0,
});

const kpiData = [
  { big: '+97%', label: 'Crescimento de Receita Recorrente', sub: 'R$262k \u2192 R$519k/m\u00eas  (Fev/25 \u2192 Fev/26)', accent: '4CAF50' },
  { big: '160', label: 'Munic\u00edpios Clientes Ativos', sub: '+30% em 2025  (de 121 para 160)', accent: '2563EB' },
  { big: 'R$4,2mi', label: 'Faturamento Bruto 2025', sub: 'R$519k de receita recorrente mensal', accent: '9C27B0' },
];
const cW = 2.87, cH = 1.78, cGap = 0.2, cY = 0.88;
kpiData.forEach((k, i) => {
  const cx = 0.4 + i * (cW + cGap);
  s1.addShape(pres.shapes.RECTANGLE, { x: cx, y: cY, w: cW, h: cH, fill: { color: C.white }, line: { color: 'E2E8F0', width: 0 } });
  s1.addShape(pres.shapes.RECTANGLE, { x: cx, y: cY, w: cW, h: 0.07, fill: { color: k.accent }, line: { color: k.accent, width: 0 } });
  s1.addText(k.big, { x: cx + 0.1, y: cY + 0.1, w: cW - 0.2, h: 0.78, fontSize: 42, bold: true, color: C.darkBlue, fontFace: 'Calibri', margin: 0, align: 'center' });
  s1.addText(k.label, { x: cx + 0.1, y: cY + 0.9, w: cW - 0.2, h: 0.46, fontSize: 12, bold: true, color: C.textDark, fontFace: 'Calibri', margin: 0, align: 'center' });
  s1.addText(k.sub, { x: cx + 0.1, y: cY + 1.4, w: cW - 0.2, h: 0.3, fontSize: 9, color: C.textMid, fontFace: 'Calibri', margin: 0, align: 'center' });
});

const secData = [
  { val: '32%', label: 'Margem Atual' },
  { val: 'R$2.147', label: 'Ticket M\u00e9dio / M\u00eas' },
  { val: '16', label: 'Colaboradores Full-time' },
];
const sY = 2.82;
secData.forEach((s, i) => {
  const sx = 0.4 + i * (cW + cGap);
  s1.addShape(pres.shapes.RECTANGLE, { x: sx, y: sY, w: cW, h: 0.68, fill: { color: '1E4A8A' }, line: { color: '1E4A8A', width: 0 } });
  s1.addText([
    { text: s.val + '   ', options: { bold: true, fontSize: 18, color: C.white } },
    { text: s.label, options: { fontSize: 11, color: 'A8C4E8' } },
  ], { x: sx + 0.1, y: sY, w: cW - 0.2, h: 0.68, valign: 'middle', align: 'center', margin: 0, fontFace: 'Calibri' });
});

s1.addText('13 exclus\u00f5es em 2025  \u2014  taxa de reten\u00e7\u00e3o de 92%', {
  x: 0.4, y: 3.66, w: 9.15, h: 0.32, fontSize: 10, color: '7FA8D4', align: 'center', fontFace: 'Calibri', margin: 0,
});
s1.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.82, w: 10, h: 0.805, fill: { color: C.green }, line: { color: C.green, width: 0 } });
s1.addText('\u201cEm 12 meses dobramos a receita. Agora precisamos da estrutura para dobrar novamente.\u201d', {
  x: 0.35, y: 4.82, w: 9.3, h: 0.805, fontSize: 14, bold: true, italic: true, color: C.white,
  fontFace: 'Calibri', margin: 0, align: 'center', valign: 'middle',
});

// ====== SLIDE 2 ======
const s2 = pres.addSlide();
s2.background = { color: C.lightGray };

s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.72, fill: { color: C.darkBlue }, line: { color: C.darkBlue, width: 0 } });
s2.addText('O Que Nos Impede de Crescer Mais', {
  x: 0.4, y: 0, w: 9.2, h: 0.72, fontSize: 24, bold: true, color: C.white, fontFace: 'Calibri', margin: 0, valign: 'middle',
});

const pY = 0.87, pH = 3.55, lW = 4.5, lX = 0.35;
s2.addShape(pres.shapes.RECTANGLE, {
  x: lX, y: pY, w: lW, h: pH, fill: { color: C.white }, line: { color: 'E2E8F0', width: 1 },
  shadow: { type: 'outer', color: '000000', opacity: 0.08, blur: 8, offset: 2, angle: 135 },
});
s2.addShape(pres.shapes.RECTANGLE, { x: lX, y: pY, w: 0.07, h: pH, fill: { color: C.midBlue }, line: { color: C.midBlue, width: 0 } });
s2.addText('DEMANDA REPRESADA \u2014 160 CLIENTES', {
  x: lX + 0.18, y: pY + 0.15, w: lW - 0.28, h: 0.38, fontSize: 11.5, bold: true, color: C.midBlue, fontFace: 'Calibri', margin: 0,
});
const lItems = [
  { val: '421', label: 'Melhorias de desenvolvimento pendentes', color: C.midBlue },
  { val: '717', label: 'Melhorias de atendimento abertas', color: '7C3AED' },
  { val: '31', label: 'Incidentes ativos no sistema', color: 'DC2626' },
  { val: 'NPS 31', label: 'Satisfa\u00e7\u00e3o atual dos clientes (meta: 60+)', color: 'D97706' },
];
lItems.forEach((item, i) => {
  const iy = pY + 0.68 + i * 0.68;
  s2.addText(item.val, { x: lX + 0.18, y: iy, w: 1.2, h: 0.45, fontSize: 24, bold: true, color: item.color, fontFace: 'Calibri', margin: 0 });
  s2.addText(item.label, { x: lX + 1.43, y: iy + 0.04, w: lW - 1.63, h: 0.4, fontSize: 12, color: C.textMid, fontFace: 'Calibri', margin: 0, valign: 'middle' });
});

const rX = lX + lW + 0.5, rW = 10 - (lX + lW + 0.5) - 0.35;
s2.addShape(pres.shapes.RECTANGLE, {
  x: rX, y: pY, w: rW, h: pH, fill: { color: C.white }, line: { color: 'E2E8F0', width: 1 },
  shadow: { type: 'outer', color: '000000', opacity: 0.08, blur: 8, offset: 2, angle: 135 },
});
s2.addShape(pres.shapes.RECTANGLE, { x: rX, y: pY, w: 0.07, h: pH, fill: { color: C.green }, line: { color: C.green, width: 0 } });
s2.addText('OPORTUNIDADE PERDIDA EM EDITAIS', {
  x: rX + 0.18, y: pY + 0.15, w: rW - 0.28, h: 0.38, fontSize: 11.5, bold: true, color: C.darkGreen, fontFace: 'Calibri', margin: 0,
});
const rItems = [
  { val: '182', label: 'editais analisados desde Jan/2025', color: C.textDark },
  { val: '41%', label: 'ader\u00eancia atual \u2014 apenas 76 aprovados', color: 'DC2626' },
  { val: '70%', label: 'meta com produto completo (e-SUS)', color: C.darkGreen },
];
rItems.forEach((item, i) => {
  const ry = pY + 0.68 + i * 0.68;
  s2.addText(item.val, { x: rX + 0.18, y: ry, w: 1.05, h: 0.45, fontSize: 24, bold: true, color: item.color, fontFace: 'Calibri', margin: 0 });
  s2.addText(item.label, { x: rX + 1.28, y: ry + 0.04, w: rW - 1.48, h: 0.4, fontSize: 12, color: C.textMid, fontFace: 'Calibri', margin: 0, valign: 'middle' });
});
s2.addShape(pres.shapes.RECTANGLE, {
  x: rX + 0.18, y: pY + 2.78, w: rW - 0.36, h: 0.65, fill: { color: 'FFF9E6' }, line: { color: 'F59E0B', width: 1 },
});
s2.addText('Causa: sistema incompleto \u2014 n\u00e3o atende e-SUS integralmente', {
  x: rX + 0.28, y: pY + 2.81, w: rW - 0.56, h: 0.59, fontSize: 11, color: '92400E', fontFace: 'Calibri', margin: 0, valign: 'middle',
});

s2.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.65, w: 10, h: 0.975, fill: { color: C.darkBlue }, line: { color: C.darkBlue, width: 0 } });
s2.addText('Cada edital perdido por limita\u00e7\u00e3o t\u00e9cnica \u00e9 receita recorrente que n\u00e3o entra. Com o produto completo, podemos ir de 41% para 70%+ de ader\u00eancia.', {
  x: 0.4, y: 4.65, w: 9.2, h: 0.975, fontSize: 13, color: C.white, fontFace: 'Calibri', margin: 0, align: 'center', valign: 'middle',
});

// ====== SLIDE 3 ======
const s3 = pres.addSlide();
s3.background = { color: C.lightGray };

s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.darkBlue }, line: { color: C.darkBlue, width: 0 } });
s3.addText('Proposta \u2014 Uso da Margem para Amadurecimento do Produto', {
  x: 0.4, y: 0.05, w: 9.2, h: 0.5, fontSize: 22, bold: true, color: C.white, fontFace: 'Calibri', margin: 0, valign: 'middle',
});
s3.addText('N\u00e3o pedimos capital externo. Pedimos autoriza\u00e7\u00e3o para reinvestir o que j\u00e1 geramos.', {
  x: 0.4, y: 0.6, w: 9.2, h: 0.38, fontSize: 12, color: 'A8C4E8', italic: true, fontFace: 'Calibri', margin: 0,
});

const c3Y = 1.15, c3H = 3.45, c3W = 2.93, c3G = 0.25;
const c3Xs = [0.35, 0.35 + c3W + c3G, 0.35 + 2 * (c3W + c3G)];

// Col 1
s3.addShape(pres.shapes.RECTANGLE, { x: c3Xs[0], y: c3Y, w: c3W, h: c3H, fill: { color: 'E8F5E9' }, line: { color: 'A5D6A7', width: 1 } });
s3.addShape(pres.shapes.RECTANGLE, { x: c3Xs[0], y: c3Y, w: c3W, h: 0.5, fill: { color: C.green }, line: { color: C.green, width: 0 } });
s3.addText('O QUE TEMOS HOJE', { x: c3Xs[0] + 0.1, y: c3Y, w: c3W - 0.2, h: 0.5, fontSize: 11, bold: true, color: C.white, fontFace: 'Calibri', margin: 0, align: 'center', valign: 'middle' });
const col1Data = [
  { val: 'R$251k', label: 'Margem Mensal Atual', big: true },
  { val: 'R$180.661', label: 'Investimento Squad/m\u00eas', big: true },
  { val: '~R$70k', label: 'Saldo p\u00f3s-investimento', big: false },
  { val: '160 munic\u00edpios', label: 'Clientes Ativos', big: false },
  { val: 'R$519k/m\u00eas', label: 'Receita Recorrente Mensal', big: false },
];
col1Data.forEach((item, i) => {
  const iy = c3Y + 0.62 + i * 0.55;
  s3.addText(item.val, { x: c3Xs[0] + 0.1, y: iy, w: c3W - 0.2, h: 0.32, fontSize: item.big ? 20 : 13, bold: item.big, color: item.big ? C.darkBlue : C.textDark, fontFace: 'Calibri', margin: 0, align: 'center' });
  s3.addText(item.label, { x: c3Xs[0] + 0.1, y: iy + 0.32, w: c3W - 0.2, h: 0.18, fontSize: 9, color: C.textMid, fontFace: 'Calibri', margin: 0, align: 'center' });
});

// Col 2
s3.addShape(pres.shapes.RECTANGLE, { x: c3Xs[1], y: c3Y, w: c3W, h: c3H, fill: { color: 'EBF2FF' }, line: { color: '93C5FD', width: 1 } });
s3.addShape(pres.shapes.RECTANGLE, { x: c3Xs[1], y: c3Y, w: c3W, h: 0.5, fill: { color: C.midBlue }, line: { color: C.midBlue, width: 0 } });
s3.addText('SQUAD NECESS\u00c1RIO', { x: c3Xs[1] + 0.1, y: c3Y, w: c3W - 0.2, h: 0.5, fontSize: 11, bold: true, color: C.white, fontFace: 'Calibri', margin: 0, align: 'center', valign: 'middle' });
const squadData = [
  { role: '6 \u00d7 Dev S\u00eanior', cost: 'R$79.067' },
  { role: '1 \u00d7 Analista Produto Sr', cost: 'R$16.101' },
  { role: '2 \u00d7 Arquiteto Sistemas Sr', cost: 'R$48.183' },
  { role: '1 \u00d7 Analista Qualidade Sr', cost: 'R$13.178' },
  { role: '1 \u00d7 Coordenador Desenv.', cost: 'R$24.132' },
];
squadData.forEach((sq, i) => {
  const sy = c3Y + 0.62 + i * 0.49;
  s3.addText(sq.role, { x: c3Xs[1] + 0.14, y: sy, w: c3W - 0.65, h: 0.35, fontSize: 11, color: C.textDark, fontFace: 'Calibri', margin: 0, valign: 'middle' });
  s3.addText(sq.cost, { x: c3Xs[1] + c3W - 0.58, y: sy, w: 0.48, h: 0.35, fontSize: 11, bold: true, color: C.midBlue, fontFace: 'Calibri', margin: 0, valign: 'middle', align: 'right' });
  if (i < squadData.length - 1) {
    s3.addShape(pres.shapes.LINE, { x: c3Xs[1] + 0.14, y: sy + 0.38, w: c3W - 0.28, h: 0, line: { color: 'BFDBFE', width: 0.5 } });
  }
});
const tBarY = c3Y + 3.0;
s3.addShape(pres.shapes.RECTANGLE, { x: c3Xs[1] + 0.14, y: tBarY, w: c3W - 0.28, h: 0.38, fill: { color: C.midBlue }, line: { color: C.midBlue, width: 0 } });
s3.addText([
  { text: 'Total: ', options: { fontSize: 11, color: 'A8C4E8' } },
  { text: 'R$180.661/m\u00eas', options: { fontSize: 13, bold: true, color: C.white } },
  { text: '  (11 pessoas)', options: { fontSize: 9, color: 'A8C4E8' } },
], { x: c3Xs[1] + 0.14, y: tBarY, w: c3W - 0.28, h: 0.28, align: 'center', valign: 'middle', margin: 0, fontFace: 'Calibri' });
s3.addText('Anual Mai\u2013Dez: R$1.445.286', {
  x: c3Xs[1] + 0.14, y: tBarY + 0.28, w: c3W - 0.28, h: 0.22,
  fontSize: 9, color: C.textMid, fontFace: 'Calibri', margin: 0, align: 'center', italic: true,
});

// Col 3
s3.addShape(pres.shapes.RECTANGLE, { x: c3Xs[2], y: c3Y, w: c3W, h: c3H, fill: { color: C.white }, line: { color: 'E2E8F0', width: 1 } });
s3.addShape(pres.shapes.RECTANGLE, { x: c3Xs[2], y: c3Y, w: c3W, h: 0.5, fill: { color: C.darkBlue }, line: { color: C.darkBlue, width: 0 } });
s3.addText('RESULTADO EM 12 MESES', { x: c3Xs[2] + 0.1, y: c3Y, w: c3W - 0.2, h: 0.5, fontSize: 11, bold: true, color: C.white, fontFace: 'Calibri', margin: 0, align: 'center', valign: 'middle' });
const resultData = [
  { text: 'Zerar backlog cr\u00edtico dos 160 clientes', hl: false },
  { text: 'Ader\u00eancia editais: 41% \u2192 70%', hl: true },
  { text: 'Completar integra\u00e7\u00e3o e-SUS', hl: false },
  { text: 'Meta: +40 munic\u00edpios (160 \u2192 200)', hl: true },
  { text: 'ROI: R$2.147/m\u00eas por novo cliente', hl: false },
];
resultData.forEach((item, i) => {
  const ry = c3Y + 0.65 + i * 0.55;
  s3.addShape(pres.shapes.OVAL, {
    x: c3Xs[2] + 0.14, y: ry + 0.04, w: 0.28, h: 0.28,
    fill: { color: item.hl ? C.green : C.midBlue },
    line: { color: item.hl ? C.green : C.midBlue, width: 0 },
  });
  s3.addText('\u2713', { x: c3Xs[2] + 0.14, y: ry + 0.03, w: 0.28, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: 'Calibri', margin: 0, align: 'center', valign: 'middle' });
  s3.addText(item.text, { x: c3Xs[2] + 0.5, y: ry, w: c3W - 0.65, h: 0.38, fontSize: 11, color: item.hl ? C.darkBlue : C.textDark, bold: item.hl, fontFace: 'Calibri', margin: 0, valign: 'middle' });
  if (i < resultData.length - 1) {
    s3.addShape(pres.shapes.LINE, { x: c3Xs[2] + 0.14, y: ry + 0.44, w: c3W - 0.28, h: 0, line: { color: 'E2E8F0', width: 0.5 } });
  }
});

s3.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.75, w: 10, h: 0.875, fill: { color: C.green }, line: { color: C.green, width: 0 } });
s3.addText('R$251k de margem mensal  \u2192  R$180.661 em equipe (11 pessoas)  \u2192  Produto completo  \u2192  +40 clientes  \u2192  Mais margem. O ciclo se paga sozinho.', {
  x: 0.35, y: 4.75, w: 9.3, h: 0.875, fontSize: 13, bold: true, color: C.white,
  fontFace: 'Calibri', margin: 0, align: 'center', valign: 'middle',
});

pres.writeFile({ fileName: 'C:\\Claude\\Skill\\BU_Saude_Pitch.pptx' });
console.log('Done: BU_Saude_Pitch.pptx saved');
