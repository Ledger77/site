/* ============================================================================
   Código que monta a página automaticamente a partir da lista PRODUTOS.
   Normalmente você NÃO precisa mexer aqui — edite apenas "produtos.js".
   ============================================================================ */

// Nome e emoji de cada tipo de produto
const TIPOS = {
  audiobook: { emoji: "🎧", label: "Audiobook" },
  videobook: { emoji: "🎬", label: "Videobook" },
  ebook:     { emoji: "📚", label: "E-book" }
};

// Elementos da página
const grade   = document.getElementById("grade-produtos");
const vazio   = document.getElementById("vazio");
const busca   = document.getElementById("busca");
const filtros = document.getElementById("filtros");

// Estado atual dos filtros
let filtroTipo = "todos";
let termoBusca = "";

// Evita que textos quebrem o HTML
function esc(texto) {
  return String(texto ?? "").replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

// Cria o HTML de um produto (um "card")
function criarCard(p) {
  const info  = TIPOS[p.tipo] || { emoji: "📦", label: "Produto" };
  const temImg = p.imagem && p.imagem.trim() !== "";

  const classeCapa = temImg ? "capa" : "capa capa--" + p.tipo;
  const estiloCapa = temImg ? ` style="background-image:url('${esc(p.imagem)}')"` : "";
  const miolo = temImg ? "" : `<span class="capa-emoji">${info.emoji}</span>`;

  return `
    <article class="card">
      <div class="${classeCapa}"${estiloCapa}>
        ${miolo}
        <span class="badge">${info.emoji} ${info.label}</span>
      </div>
      <div class="card-corpo">
        <h3 class="card-titulo">${esc(p.titulo)}</h3>
        <p class="card-desc">${esc(p.descricao)}</p>
        <div class="card-rodape">
          <span class="preco">${esc(p.preco)}</span>
          <a class="btn-comprar" href="${esc(p.link)}" target="_blank" rel="noopener">Comprar</a>
        </div>
      </div>
    </article>`;
}

// Desenha os produtos respeitando filtro + busca
function renderizar() {
  const termo = termoBusca.toLowerCase().trim();

  const lista = PRODUTOS.filter(function (p) {
    const passaTipo  = filtroTipo === "todos" || p.tipo === filtroTipo;
    const passaBusca = !termo ||
      (p.titulo + " " + p.descricao).toLowerCase().includes(termo);
    return passaTipo && passaBusca;
  });

  grade.innerHTML = lista.map(criarCard).join("");
  vazio.hidden = lista.length > 0;
}

// Clique nos botões de filtro
filtros.addEventListener("click", function (e) {
  const botao = e.target.closest(".chip");
  if (!botao) return;
  filtros.querySelectorAll(".chip").forEach(b => b.classList.remove("ativo"));
  botao.classList.add("ativo");
  filtroTipo = botao.dataset.filtro;
  renderizar();
});

// Digitação na busca
busca.addEventListener("input", function (e) {
  termoBusca = e.target.value;
  renderizar();
});

// Ano automático no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Primeira renderização
renderizar();
