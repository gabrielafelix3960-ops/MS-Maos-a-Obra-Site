/* site.js - gerir serviços, cálculo de orçamento e slideshow com overlay por imagem */

/* carregar serviços (services.json) e popular select */
let SERVICES = [];
fetch('services.json')
.then(r => r.json())
.then(data => {
SERVICES = data;
const sel = document.getElementById('servico-select');
if(!sel) return;
SERVICES.forEach(s => {
const opt = document.createElement('option');
opt.value = s.id;
opt.textContent = ${s.nome} — ${s.categoria};
sel.appendChild(opt);
});
})
.catch(err => console.warn('Erro a carregar services.json (ok em desenvolvimento):', err));

/* função de cálculo (retorna object com valores) */
function calcularOrcamentoObj({area, nTrabalhadores, materiaisEurM2, produtividadeM2Dia, valorDiaEmpregado=70, ivaPercent=23, arredondamentoHalfDay=true}) {
const valorDiaEfetivo = Math.max(valorDiaEmpregado, 70);
const workerDays = area / (produtividadeM2Dia * nTrabalhadores);
let workerDaysArred = arredondamentoHalfDay ? Math.ceil(workerDays * 2)/2 : Math.ceil(workerDays);
const maoObraTotal = workerDaysArred * nTrabalhadores * valorDiaEfetivo;
const maoObraPorM2 = maoObraTotal / area;
const materiaisTotal = materiaisEurM2 * area;
const subtotal = materiaisTotal + maoObraTotal;
const iva = +(subtotal * (ivaPercent/100));
const total = subtotal + iva;
return {
area, nTrabalhadores, workerDays, workerDaysArred, valorDiaEfetivo,
maoObraTotal: +maoObraTotal.toFixed(2),
maoObraPorM2: +maoObraPorM2.toFixed(2),
materiaisTotal: +materiaisTotal.toFixed(2),
subtotal: +subtotal.toFixed(2),
iva: +iva.toFixed(2),
total: +total.toFixed(2)
};
}

/* acionar cálculo e mostrar no painel */
function calcularEExibir() {
const servId = document.getElementById('servico-select')?.value;
const area = parseFloat(document.getElementById('area').value) || 0;
const nTrab = parseInt(document.getElementById('nTrab').value) || 1;
const serv = SERVICES.find(s => s.id === servId);
if (!serv) { alert('Serviço não encontrado. Se estiver a testar localmente, verifique services.json.'); return; }
const res = calcularOrcamentoObj({
area, nTrabalhadores: nTrab,
materiaisEurM2: serv.materiais_eur_m2,
produtividadeM2Dia: serv.produtividade_m2_por_dia_por_empregado,
valorDiaEmpregado: serv.valor_dia_por_empregado,
ivaPercent: serv.iva_percent, arredondamentoHalfDay: true
});
const div = document.getElementById('resultado-orcamento');
div.innerHTML =     <h4 class="text-lg font-semibold">${serv.nome}</h4>     <div class="text-sm mt-2">Área: ${res.area} m² · Trabalhadores: ${res.nTrabalhadores}</div>     <div class="mt-3 text-sm">Dias por trabalhador (estimado): ${res.workerDays.toFixed(2)}</div>     <div class="text-sm">Dias arredondados por trabalhador: ${res.workerDaysArred}</div>     <hr class="my-2" />     <div class="text-sm">Materiais (total): €${res.materiaisTotal}</div>     <div class="text-sm">Mão de obra (total): €${res.maoObraTotal}</div>     <div class="text-sm">Mão de obra por m²: €${res.maoObraPorM2}</div>     <div class="text-sm mt-2 font-medium">Subtotal (s/IVA): €${res.subtotal}</div>     <div class="text-sm">IVA (${serv.iva_percent}%): €${res.iva}</div>     <div class="text-xl font-bold mt-2">Total (c/IVA): €${res.total}</div>     <div class="mt-3 text-xs text-yellow-800">Estimativa indicativa. Valor final sujeito a vistoria técnica.</div>  ;
window._ULTIMO_ORCAMENTO = {servId: serv.id, servNome: serv.nome, resultado: res};
}

/* envio de pedido (no protótipo apenas simula) */
async function enviarPedido() {
const nome = document.getElementById('nomeEmpresa').value.trim();
const telefone = document.getElementById('telefone').value.trim();
const email = document.getElementById('email').value.trim();
if (!nome || !telefone || !email) { alert('Preencha Nome, Telefone e Email.'); return; }
const orc = window._ULTIMO_ORCAMENTO || {};
const payload = { nome, telefone, email, mensagem: document.getElementById('mensagem').value.trim(), orcamento: orc, createdAt: new Date().toISOString() };
// Aqui substitua por fetch() para o endpoint real (Firebase Function / endpoint)
alert('Pedido registado (protótipo). Iremos contactar em breve.');
console.log('Pedido (simulado):', payload);
}

/* HERO slideshow com overlay por imagem */
(function setupHeroSlideshow(){
const hero = document.getElementById('heroBg');
const overlay = document.getElementById('heroOverlay');
if(!hero || !overlay) return;

const slides = [
{url:'assets/hero_bg.jpg', overlay:'linear-gradient(180deg, rgba(7,26,43,0.80), rgba(7,26,43,0.92))'}, // piscina - mais escuro
{url:'assets/hero_bg_2.jpg', overlay:'linear-gradient(180deg, rgba(7,26,43,0.75), rgba(7,26,43,0.88))'}, // betão
{url:'assets/interior_03.jpg', overlay:'linear-gradient(180deg, rgba(7,26,43,0.65), rgba(7,26,43,0.85))'}, // pedra
{url:'assets/interior_04.jpg', overlay:'linear-gradient(180deg, rgba(7,26,43,0.60), rgba(7,26,43,0.78))'}, // mármore
{url:'assets/interior_01.jpg', overlay:'linear-gradient(180deg, rgba(7,26,43,0.55), rgba(7,26,43,0.72))'}, // plantas
{url:'assets/interior_05.jpg', overlay:'linear-gradient(180deg, rgba(7,26,43,0.52), rgba(7,26,43,0.70))'}, // jardim interior
{url:'assets/interior_02.jpg', overlay:'linear-gradient(180deg, rgba(7,26,43,0.50), rgba(7,26,43,0.68))'}, // quarto
{url:'assets/team_back.jpg', overlay:'linear-gradient(180deg, rgba(7,26,43,0.58), rgba(7,26,43,0.75))'} // trabalhador
];

let idx = 0;
function setSlide(i){
hero.style.transition = 'opacity .35s ease';
overlay.style.transition = 'opacity .35s ease';
hero.style.opacity = 0;
overlay.style.opacity = 0;
setTimeout(()=> {
hero.style.backgroundImage = url('${slides[i].url}');
overlay.style.background = slides[i].overlay;
hero.style.opacity = 1;
overlay.style.opacity = 1;
}, 300);
}

// pré-load imagens
slides.forEach(s => { const img = new Image(); img.src = s.url; });

// iniciar
setSlide(0);
if(slides.length > 1){
setInterval(()=> { idx = (idx + 1) % slides.length; setSlide(idx); }, 8000);
}
})();