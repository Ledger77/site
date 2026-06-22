/* ============================================================================
   Monta a página automaticamente a partir de CATEGORIAS e PRODUTOS.
   Normalmente você NÃO precisa mexer aqui — edite apenas "produtos.js".
   ============================================================================ */

// Nome e emoji de cada tipo
const TIPOS = {
  audiobook: { emoji: "🎧", label: "Audiobook" },
  videobook: { emoji: "🎬", label: "Videobook" },
  ebook:     { emoji: "📚", label: "E-book" }
};

// Elementos da página
const grade            = document.getElementById("grade-produtos");
const vazio            = document.getElementById("vazio");
const busca            = document.getElementById("busca");
const filtrosAcesso    = document.getElementById("filtros-acesso");
const filtrosCategoria = document.getElementById("filtros-categoria");

// Estado dos filtros
let filtroAcesso    = "todos";
let filtroCategoria = "todas";
let termoBusca      = "";

// Evita que textos quebrem o HTML
function esc(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

// Cria o HTML de um produto
function criarCard(p) {
  const info     = TIPOS[p.tipo] || { emoji: "📦", label: "Produto" };
  const ehGratis = p.acesso === "gratis";

  // Capa: imagem por cima do gradiente. Se a imagem falhar, tenta a versão
  // menor da miniatura e, se ainda falhar, mostra o gradiente com emoji.
  const imagem = p.imagem
    ? `<img class="capa-img" src="${esc(p.imagem)}" alt="Capa: ${esc(p.titulo)}" loading="lazy"
         onerror="if(this.src.indexOf('maxresdefault')>-1){this.src=this.src.replace('maxresdefault','hqdefault')}else{this.remove()}">`
    : "";

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
    <article class="card">
      <div class="capa capa--${esc(p.tipo)}">
        <span class="capa-emoji">${info.emoji}</span>
        ${imagem}
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

// Mensagem mostrada quando nenhum produto aparece
function mensagemVazio() {
  if (filtroAcesso === "exclusivo") return "🔒 Conteúdos exclusivos chegando em breve! Fique de olho. 👀";
  if (filtroCategoria !== "todas")  return `📖 Novidades de ${filtroCategoria} em breve!`;
  return "Nenhum produto encontrado. 😕";
}

// Desenha os produtos respeitando os filtros + busca
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

// Cria os botões de filtro por categoria a partir de CATEGORIAS
function montarFiltrosCategoria() {
  const cats = (typeof CATEGORIAS !== "undefined" && CATEGORIAS.length)
    ? CATEGORIAS
    : Array.from(new Set(PRODUTOS.map(p => p.categoria).filter(Boolean)));

  let html = `<button class="chip ativo" data-categoria="todas">Todas</button>`;
  html += cats.map(c => `<button class="chip" data-categoria="${esc(c)}">${esc(c)}</button>`).join("");
  filtrosCategoria.innerHTML = html;
}

// Liga os cliques de um grupo de filtros
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

// Inicialização
montarFiltrosCategoria();
ligarFiltros(filtrosAcesso,    b => filtroAcesso = b.dataset.acesso);
ligarFiltros(filtrosCategoria, b => filtroCategoria = b.dataset.categoria);

busca.addEventListener("input", function (e) {
  termoBusca = e.target.value;
  renderizar();
});

document.getElementById("ano").textContent = new Date().getFullYear();

renderizar();
