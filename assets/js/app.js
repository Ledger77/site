/* ============================================================================
   Monta a página (catálogo + página de detalhes) a partir de CATEGORIAS e
   PRODUTOS. Normalmente você NÃO precisa mexer aqui — edite só "produtos.js".
   ============================================================================ */

const TIPOS = {
  audiobook: { emoji: "🎧", label: "Audiobook" },
  videobook: { emoji: "🎬", label: "Videobook" },
  ebook:     { emoji: "📚", label: "E-book" }
};

const CANAL = "https://www.youtube.com/@Ledger.77";

// Elementos da página
const grade            = document.getElementById("grade-produtos");
const vazio            = document.getElementById("vazio");
const busca            = document.getElementById("busca");
const filtrosAcesso    = document.getElementById("filtros-acesso");
const filtrosCategoria = document.getElementById("filtros-categoria");
const modal            = document.getElementById("modal");
const modalConteudo    = document.getElementById("modal-conteudo");

// Estado dos filtros
let filtroAcesso    = "todos";
let filtroCategoria = "todas";
let termoBusca      = "";

// Dá um índice fixo a cada produto (usado para abrir os detalhes)
PRODUTOS.forEach((p, i) => (p._i = i));

// Evita que textos quebrem o HTML
function esc(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

// Imagem da capa com fallback automático (maxres -> hq -> gradiente)
function imagemCapa(p, classe) {
  if (!p.imagem) return "";
  return `<img class="${classe}" src="${esc(p.imagem)}" alt="Capa: ${esc(p.titulo)}" loading="lazy"
    onerror="if(this.src.indexOf('maxresdefault')>-1){this.src=this.src.replace('maxresdefault','hqdefault')}else{this.remove()}">`;
}

/* ----------------------------- Cartões ----------------------------- */
function criarCard(p) {
  const info     = TIPOS[p.tipo] || { emoji: "📦", label: "Produto" };
  const ehGratis = p.acesso === "gratis";

  const seloAcesso = ehGratis
    ? `<span class="badge badge-acesso badge-acesso--gratis">🆓 Grátis</span>`
    : `<span class="badge badge-acesso badge-acesso--exclusivo">🔒 Exclusivo</span>`;

  const preco = ehGratis
    ? `<span class="preco preco--gratis">Grátis</span>`
    : `<span class="preco">${esc(p.preco)}</span>`;

  const botao = ehGratis
    ? `<a class="btn-comprar btn-assistir" href="${esc(p.link)}" target="_blank" rel="noopener">▶ Assistir</a>`
    : `<a class="btn-comprar" href="${esc(p.link)}" target="_blank" rel="noopener">Comprar</a>`;

  const categoria = p.categoria ? `<span class="card-cat">${esc(p.categoria)}</span>` : "";

  return `
    <article class="card" data-id="${p._i}" tabindex="0" role="button" aria-label="Ver detalhes: ${esc(p.titulo)}">
      <div class="capa capa--${esc(p.tipo)}">
        <span class="capa-emoji">${info.emoji}</span>
        ${imagemCapa(p, "capa-img")}
        <span class="badge badge-tipo">${info.emoji} ${info.label}</span>
        ${seloAcesso}
      </div>
      <div class="card-corpo">
        ${categoria}
        <h3 class="card-titulo">${esc(p.titulo)}</h3>
        <p class="card-desc">${esc(p.descricao)}</p>
        <div class="card-rodape">
          ${preco}
          ${botao}
        </div>
      </div>
    </article>`;
}

/* ----------------------------- Página de detalhes (modal) ----------------------------- */
function montarModal(p) {
  const info     = TIPOS[p.tipo] || { emoji: "📦", label: "Produto" };
  const ehGratis = p.acesso === "gratis";

  const capa = p.imagem
    ? imagemCapa(p, "modal-capa")
    : `<div class="modal-capa modal-capa--${esc(p.tipo)}"><span class="capa-emoji">${info.emoji}</span></div>`;

  const meta = [p.autor, p.ano, info.label, p.categoria].filter(Boolean).map(esc).join(" &bull; ");

  const detalhes = Array.isArray(p.detalhes) && p.detalhes.length
    ? p.detalhes.map(t => `<p>${esc(t)}</p>`).join("")
    : `<p>${esc(p.descricao)}</p>`;

  const aprendizados = Array.isArray(p.aprendizados) && p.aprendizados.length
    ? `<h4 class="modal-sub">Você vai encontrar</h4>
       <ul class="modal-lista">${p.aprendizados.map(a => `<li>${esc(a)}</li>`).join("")}</ul>`
    : "";

  const temas = Array.isArray(p.temas) && p.temas.length
    ? `<h4 class="modal-sub">Temas</h4>
       <div class="modal-temas">${p.temas.map(t => `<span class="tema">${esc(t)}</span>`).join("")}</div>`
    : "";

  const sobreAutor = p.sobreAutor
    ? `<h4 class="modal-sub">Sobre o autor</h4><p>${esc(p.sobreAutor)}</p>`
    : "";

  const selo = ehGratis
    ? `<span class="badge badge-acesso--gratis modal-selo">🆓 Grátis</span>`
    : `<span class="badge badge-acesso--exclusivo modal-selo">🔒 Exclusivo</span>`;

  const cta = ehGratis
    ? `<a class="btn btn-grande btn-yt" href="${esc(p.link)}" target="_blank" rel="noopener">▶ Assistir agora</a>`
    : `<a class="btn btn-grande" href="${esc(p.link)}" target="_blank" rel="noopener">Comprar agora — ${esc(p.preco)}</a>`;

  return `
    <div class="modal-topo">${capa}</div>
    <div class="modal-corpo">
      <div class="modal-cab">
        ${p.categoria ? `<span class="card-cat">${esc(p.categoria)}</span>` : ""}
        ${selo}
      </div>
      <h2 class="modal-titulo">${esc(p.titulo)}</h2>
      ${meta ? `<p class="modal-meta">${meta}</p>` : ""}
      <div class="modal-texto">${detalhes}</div>
      ${aprendizados}
      ${temas}
      ${sobreAutor}
      <div class="modal-acoes">
        ${cta}
        <a class="btn btn-grande btn-sec" href="${CANAL}" target="_blank" rel="noopener">Ver canal</a>
      </div>
    </div>`;
}

function abrirModal(i) {
  const p = PRODUTOS[i];
  if (!p) return;
  modalConteudo.innerHTML = montarModal(p);
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  const caixa = modal.querySelector(".modal-caixa");
  if (caixa) caixa.scrollTop = 0;
}

function fecharModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

/* ----------------------------- Filtros e busca ----------------------------- */
function mensagemVazio() {
  if (filtroAcesso === "exclusivo") return "🔒 Conteúdos exclusivos chegando em breve! Fique de olho. 👀";
  if (filtroCategoria !== "todas")  return `📖 Novidades de ${filtroCategoria} em breve!`;
  return "Nenhum produto encontrado. 😕";
}

function renderizar() {
  const termo = termoBusca.toLowerCase().trim();

  const lista = PRODUTOS.filter(function (p) {
    const okAcesso    = filtroAcesso === "todos" || p.acesso === filtroAcesso;
    const okCategoria = filtroCategoria === "todas" || p.categoria === filtroCategoria;
    const okBusca     = !termo || (p.titulo + " " + p.descricao).toLowerCase().includes(termo);
    return okAcesso && okCategoria && okBusca;
  });

  grade.innerHTML = lista.map(criarCard).join("");

  if (lista.length > 0) {
    vazio.hidden = true;
  } else {
    vazio.hidden = false;
    vazio.textContent = mensagemVazio();
  }
}

function montarFiltrosCategoria() {
  const cats = (typeof CATEGORIAS !== "undefined" && CATEGORIAS.length)
    ? CATEGORIAS
    : Array.from(new Set(PRODUTOS.map(p => p.categoria).filter(Boolean)));

  let html = `<button class="chip ativo" data-categoria="todas">Todas</button>`;
  html += cats.map(c => `<button class="chip" data-categoria="${esc(c)}">${esc(c)}</button>`).join("");
  filtrosCategoria.innerHTML = html;
}

function ligarFiltros(container, aoSelecionar) {
  container.addEventListener("click", function (e) {
    const botao = e.target.closest(".chip");
    if (!botao) return;
    container.querySelectorAll(".chip").forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");
    aoSelecionar(botao);
    renderizar();
  });
}

/* ----------------------------- Eventos ----------------------------- */
// Clicar no cartão abre os detalhes (mas deixa os links "Assistir/Comprar" funcionarem)
grade.addEventListener("click", function (e) {
  if (e.target.closest("a")) return;
  const card = e.target.closest(".card");
  if (card) abrirModal(Number(card.dataset.id));
});
grade.addEventListener("keydown", function (e) {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest(".card");
  if (card) { e.preventDefault(); abrirModal(Number(card.dataset.id)); }
});

// Fechar o modal: clique fora, botão X ou tecla Esc
modal.addEventListener("click", function (e) {
  if (e.target === modal || e.target.hasAttribute("data-fechar")) fecharModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.hidden) fecharModal();
});

busca.addEventListener("input", function (e) {
  termoBusca = e.target.value;
  renderizar();
});

/* ----------------------------- Início ----------------------------- */
montarFiltrosCategoria();
ligarFiltros(filtrosAcesso,    b => (filtroAcesso = b.dataset.acesso));
ligarFiltros(filtrosCategoria, b => (filtroCategoria = b.dataset.categoria));
document.getElementById("ano").textContent = new Date().getFullYear();
renderizar();
