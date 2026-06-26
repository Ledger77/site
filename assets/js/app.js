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
const filtrosTipo      = document.getElementById("filtros-tipo");
const modal            = document.getElementById("modal");
const modalConteudo    = document.getElementById("modal-conteudo");

// Estado dos filtros
let filtroAcesso    = "todos";
let filtroCategoria = "todas";
let filtroTipo      = "todos";
let termoBusca      = "";

// Dá um índice fixo a cada produto (usado para abrir os detalhes)
PRODUTOS.forEach((p, i) => (p._i = i));

/* ----------------------------- Animações de entrada -----------------------------
   Revela os elementos com a classe "reveal" conforme eles entram na tela.
   Usa o IntersectionObserver do próprio navegador (sem biblioteca externa).
   Quem prefere menos animação (acessibilidade) recebe tudo já visível pelo CSS. */
const aoRevelar = (function () {
  if (!("IntersectionObserver" in window)) {
    return { observarTodos() { document.querySelectorAll(".reveal").forEach(e => e.classList.add("is-visible")); } };
  }
  const io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  return { observarTodos() { document.querySelectorAll(".reveal:not(.is-visible)").forEach(e => io.observe(e)); } };
})();

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
    <article class="card reveal" data-id="${p._i}" tabindex="0" role="button" aria-label="Ver detalhes: ${esc(p.titulo)}">
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
  // Analytics: rastreia qual produto foi visualizado
  if (typeof gtag === "function") {
    gtag("event", "ver_produto", { produto: p.titulo, tipo: p.tipo, categoria: p.categoria, acesso: p.acesso });
  }
}

function fecharModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

/* ----------------------------- Filtros e busca ----------------------------- */
function mensagemVazio() {
  if (filtroAcesso === "exclusivo") return "🔒 Conteúdos exclusivos chegando em breve! Fique de olho. 👀";
  if (filtroTipo !== "todos") {
    const t = TIPOS[filtroTipo];
    return `${t ? t.emoji + " " : ""}Nenhum ${t ? t.label.toLowerCase() : "item"} nesse filtro ainda. 😕`;
  }
  if (filtroCategoria !== "todas")  return `📖 Novidades de ${filtroCategoria} em breve!`;
  return "Nenhum produto encontrado. 😕";
}

function renderizar() {
  const termo = termoBusca.toLowerCase().trim();

  const lista = PRODUTOS.filter(function (p) {
    const okAcesso    = filtroAcesso === "todos" || p.acesso === filtroAcesso;
    const okCategoria = filtroCategoria === "todas" || p.categoria === filtroCategoria;
    const okTipo      = filtroTipo === "todos" || p.tipo === filtroTipo;
    const okBusca     = !termo || (p.titulo + " " + p.descricao).toLowerCase().includes(termo);
    return okAcesso && okCategoria && okTipo && okBusca;
  });

  grade.innerHTML = lista.map(criarCard).join("");
  aoRevelar.observarTodos();

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

function montarFiltrosTipo() {
  // Gera os botões a partir dos tipos que realmente existem nos produtos
  // (mantém a ordem definida em TIPOS: audiobook, videobook, ebook).
  const presentes = new Set(PRODUTOS.map(p => p.tipo).filter(Boolean));
  const ordem = Object.keys(TIPOS).filter(t => presentes.has(t));

  let html = `<button class="chip ativo" data-tipo="todos">Todos</button>`;
  html += ordem.map(t => {
    const info = TIPOS[t];
    return `<button class="chip" data-tipo="${esc(t)}">${info.emoji} ${esc(info.label)}</button>`;
  }).join("");
  filtrosTipo.innerHTML = html;
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

// Analytics: rastreia cliques nos botões "Assistir agora" / "Comprar agora" / "Ver canal"
modalConteudo.addEventListener("click", function (e) {
  const link = e.target.closest("a");
  if (!link || typeof gtag !== "function") return;
  const titulo = modalConteudo.querySelector(".modal-titulo");
  gtag("event", "clique_produto", {
    produto: titulo ? titulo.textContent.trim() : "desconhecido",
    acao: link.textContent.trim(),
    url: link.href
  });
});

/* ----------------------------- Início ----------------------------- */
montarFiltrosCategoria();
montarFiltrosTipo();
ligarFiltros(filtrosAcesso,    b => (filtroAcesso = b.dataset.acesso));
ligarFiltros(filtrosCategoria, b => (filtroCategoria = b.dataset.categoria));
ligarFiltros(filtrosTipo,      b => (filtroTipo = b.dataset.tipo));
document.getElementById("ano").textContent = new Date().getFullYear();
renderizar();
