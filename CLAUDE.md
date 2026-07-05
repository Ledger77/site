# 🦉 Ledger — Catálogo de Audiobooks e Videobooks

> **Para qualquer IA (Claude, Cursor, Copilot…) que abrir este projeto:**
> Leia este arquivo inteiro antes de começar. Ele contém todo o contexto do projeto,
> as decisões já tomadas e o jeito certo de trabalhar aqui.

---

## 1. O que é este projeto

Site/catálogo digital do canal de YouTube **Ledger** (@Ledger.77), focado em
**Filosofia e Ficção**. Distribui audiobooks e videobooks:

- **Produtos grátis** → botão "▶ Assistir" leva ao vídeo no **YouTube**.
- **Produtos exclusivos** (futuros) → botão "Comprar" leva à **Hotmart**.

O dono é um criador de conteúdo (não é programador), então **simplicidade e
instruções em português** são prioridade. Toda a manutenção de produtos é feita
editando **um único arquivo**: `assets/js/produtos.js`.

### Links importantes
- 🌐 Site ao vivo: **https://ledger77.github.io/site/**
- 📦 Repositório: **https://github.com/Ledger77/site**
- ▶️ Canal YouTube: **https://www.youtube.com/@Ledger.77**
- 📧 SAC (e-mail de atendimento): **dger77@protonmail.com**
- 📊 Google Analytics 4 ID: **G-G2G86J7W92**

---

## 2. Arquitetura (mantenha simples!)

Site **estático puro**: HTML + CSS + JavaScript, **sem framework, sem build, sem
backend**. Hospedado no **GitHub Pages** a partir da branch `main`. Quando a `main`
muda, o site atualiza sozinho em 1–2 minutos.

```
/
├── index.html              # Estrutura da página (topo, hero, catálogo, modal, SAC, rodapé)
├── README.md               # Guia em PT para o dono adicionar produtos
├── CLAUDE.md               # (este arquivo) contexto para IAs
├── .nojekyll               # Faz o GitHub Pages servir a pasta assets sem processar
└── assets/
    ├── css/styles.css      # Tema escuro + acabamento (atmosfera, animações). Variáveis no :root
    ├── js/produtos.js      # ⭐ ÚNICO arquivo que o dono edita: CATEGORIAS + PRODUTOS
    ├── js/app.js           # Lógica: monta cards, modal, filtros, busca, animações, eventos GA4
    ├── img/
    │   └── ledger.png      # ✅ logo da coruja (já no lugar certo, aparece no topo)
    └── ebooks/             # Arquivos de e-books para download direto (EPUB/PDF)
        ├── 1984-ledger.epub
        └── 1984-ledger.pdf
```

### Como os dados funcionam
- `produtos.js` define `const CATEGORIAS = [...]` e `const PRODUTOS = [...]`.
- `app.js` lê esses arrays e gera tudo dinamicamente (cards, filtros, modal).
- Cada produto tem: `titulo`, `tipo` (audiobook/videobook/ebook), `categoria`,
  `acesso` (gratis/exclusivo), `preco`, `imagem`, `link`, `descricao` — e campos
  opcionais de detalhes: `autor`, `ano`, `detalhes[]`, `aprendizados[]`, `temas[]`,
  `sobreAutor`, `arquivos[]` (formatos extras de download, ver abaixo).
- Capa recomendada = miniatura do YouTube:
  `https://img.youtube.com/vi/ID_DO_VIDEO/maxresdefault.jpg`
  (o `app.js` já cai para `hqdefault` automaticamente se a `maxres` não existir).

### E-books (arquivo para baixar, não vídeo)
- `tipo: "ebook"` + `acesso: "gratis"` → o botão vira **"📥 Baixar"** (com atributo
  `download`) em vez de "▶ Assistir". O `link` aponta para o arquivo dentro do
  próprio repositório: `assets/ebooks/NOME-DO-ARQUIVO.epub`.
- Para oferecer **mais de um formato** do mesmo e-book (ex.: EPUB e PDF), use o
  campo opcional `arquivos: [{ formato: "EPUB", url: "..." }, { formato: "PDF", url: "..." }]`
  — aparecem como botões extras em "Formatos disponíveis" no modal.
- **Como subir um novo arquivo de e-book:** coloque o arquivo em `assets/ebooks/`
  (a IA pode copiar o arquivo direto pro repo se o dono conseguir anexá-lo no chat;
  se não conseguir anexar — ex.: PDF muito grande — o dono pode subir manualmente
  pelo GitHub, mesma técnica da logo: entrar na pasta, **Add file → Upload files**).
- **Sem capa própria** ainda: por padrão o card cai no gradiente roxo + 📚
  (`capa--ebook` / `modal-capa--ebook` no CSS). Se o dono quiser uma capa de
  verdade, é só adicionar o campo `imagem` normalmente.
- **Contagem de downloads:** como o site é 100% estático (sem servidor/backend),
  não existe um contador de downloads "de verdade". A forma de medir é via
  **Google Analytics 4**: todo clique em qualquer botão de download (no card, no
  CTA do modal ou nos botões de formato) já dispara o evento `clique_produto`
  (mesmo evento usado para "Assistir/Comprar/Ver canal"). No GA4, em
  **Relatórios → Engajamento → Eventos → clique_produto**, dá pra filtrar por
  `produto` e `acao` para ver quantas vezes cada e-book foi clicado para baixar.
  É uma contagem de **cliques no link**, não uma confirmação de que o arquivo foi
  aberto/lido — mas é o proxy padrão usado em sites estáticos sem backend.

### Método de conteúdo do canal (importante p/ cadastrar produtos)
- **Audiobook** → o livro inteiro num vídeo só (`link` = vídeo do YouTube).
- **Videobook (vídeo ilustrado)** → pode ser:
  - **completo** num vídeo (`link` = vídeo), ou
  - **em partes** (obras longas): o dono publica parte por parte e junta tudo
    numa **playlist**. Nesse caso o `link` é a **playlist** e a `imagem` é a
    miniatura de uma das partes (ex.: a Parte 1).
- ⚠️ **YouTube é bloqueado neste ambiente de IA** (proxy nega youtube.com e
  img.youtube.com). Logo, a IA **não consegue abrir os vídeos** para descobrir o
  título nem puxar a miniatura. Ao cadastrar produtos, **peça ao dono o título de
  cada obra** (e, p/ playlist, o link da Parte 1 p/ a capa). A pesquisa sobre as
  obras na web funciona normalmente.
- Todas as obras têm **adaptação da escrita feita pelo dono** (linguagem mais
  fluida, atual, simplificada e modernizada) — vale mencionar nos `detalhes`.

---

## 3. Funcionalidades já prontas

- ✅ Catálogo em grade responsiva, gerado por JS.
- ✅ Filtro por **Acesso** (Todos / 🆓 Grátis / 🔒 Exclusivos).
- ✅ Filtro por **Categoria** (Ficção / Filosofia) — gerado a partir de `CATEGORIAS`.
- ✅ Filtro por **Tipo** (🎧 Audiobook / 🎬 Videobook) — gerado automaticamente a
  partir dos tipos presentes nos produtos (`montarFiltrosTipo` em `app.js`).
- ✅ Busca por texto (título + descrição).
- ✅ **Ordenação** (menu "Ordenar por"): Padrão, Título A→Z / Z→A, Mais recente /
  Mais antigo (por `ano`). Lógica em `ordenarLista` (`app.js`).
- ✅ **Capas em 16:9** (mesma proporção da miniatura do YouTube): cards e modal
  usam `aspect-ratio: 16/9`, então a imagem aparece **inteira**, sem cortes.
- ✅ **Modal de detalhes**: clicar no card abre página de detalhes (capa grande,
  autor/ano, parágrafos, "Você vai encontrar", temas, sobre o autor, botões de ação).
- ✅ **Prévia de 1 min**: no modal, o botão "▶ Prévia de 1 min" troca a capa pelo
  player do YouTube (`youtube-nocookie`, `end=60` → para sozinho aos 60s). O vídeo
  completo é só pelo botão "Assistir". O ID do vídeo é extraído da imagem/link
  (`idDoYouTube` em `app.js`); na playlist do 1984, usa a Parte 1.
- ✅ Seção **Atendimento ao cliente (SAC)** com e-mail e canal.
- ✅ **Tema escuro** sério/intelectual (variáveis CSS em `styles.css`):
  dourado `--ouro` (#d9a441) como cor principal, vermelho para botões do YouTube.
- ✅ Fontes: "Playfair Display" (títulos) + "Inter" (corpo).
- ✅ **Google Analytics 4** instalado (ID `G-G2G86J7W92`), com eventos personalizados:
  - `ver_produto` → disparado ao abrir o modal de um produto.
  - `clique_produto` → disparado ao clicar em "Assistir/Comprar/Ver canal/Baixar"
    (tanto no botão do card quanto no modal — usado também para medir downloads).
  - `ver_previa` → disparado ao iniciar a prévia de 1 min.
- ✅ **E-books para download** (`tipo: "ebook"`): botão "📥 Baixar" (arquivo direto
  do repositório, `assets/ebooks/`), com suporte a **múltiplos formatos** (EPUB/PDF)
  via campo `arquivos[]`. Sem player de prévia (só faz sentido para vídeo).
- ✅ Logo da coruja no topo (`assets/img/ledger.png`); fallback 🦉 se faltar.
- ✅ **Acabamento visual** (atmosfera "biblioteca à meia-luz"): luz dourada que
  respira no hero, textura sutil, epígrafe de Nietzsche, traço dourado nos títulos,
  zoom suave na capa dos cards e **animações de entrada** (revelar ao rolar, via
  IntersectionObserver nativo). Respeita `prefers-reduced-motion`.

### Produtos atuais (9) — todos grátis
**Filosofia (Nietzsche) — YouTube:**
1. **Humano, Demasiado Humano** (1878) — audiobook — `https://youtu.be/kyKFWEBFe0w`
2. **Assim Falou Zaratustra** (1883) — videobook ilustrado — `https://youtu.be/VhkXzWzRIyo`
3. **Aurora** (1881) — audiobook — `https://youtu.be/Oy8kJapGQSo`
4. **A Genealogia da Moral** (1887) — audiobook — `https://youtu.be/wJfQFefWQnM`
5. **O Nascimento da Tragédia** (1872) — audiobook — `https://youtu.be/hulz3ebGFL0`
6. **Sobre Verdade e Mentira** (1873) — audiobook — `https://youtu.be/JHKta2RN280`

**Ficção (Orwell) — três formatos do mesmo livro:**
7. **1984 — Edição Completa** — videobook ilustrado (livro inteiro num vídeo) — `https://youtu.be/Uc9Ez1DG88g`
8. **1984 — Edição em Quadrinhos** — videobook em **partes** (playlist, em quadrinhos,
   personagens consistentes; a playlist cresce sozinha) —
   playlist `PLH27GiXFK5uIJxzroQJR9inaaU5Xw7afy` (capa = Parte 1, `TcImv1wqPIc`)
9. **1984 — E-book (Adaptação Ledger)** — e-book, texto completo, adaptação própria
   do dono (não é só narração/vídeo, é o **livro inteiro escrito**) — grátis, baixa
   direto do repositório em **EPUB e PDF** (`assets/ebooks/1984-ledger.epub` / `.pdf`).
   PDF gerado a partir do EPUB (conversão feita pela IA com WeasyPrint, já que o
   dono não tinha um PDF pronto pra anexar).

---

## 4. Como adicionar um novo produto

Edite **só** `assets/js/produtos.js`. Copie um bloco `{ ... }`, cole abaixo
(separado por vírgula) e preencha:

```js
{
  titulo: "Nome da obra",
  tipo: "audiobook",          // "audiobook" | "videobook" | "ebook"
  categoria: "Filosofia",     // precisa estar em CATEGORIAS (topo do arquivo)
  acesso: "gratis",           // "gratis" (YouTube) | "exclusivo" (Hotmart)
  preco: "",                  // "" se grátis; ex.: "R$ 29,90" se exclusivo
  imagem: "https://img.youtube.com/vi/ID_DO_VIDEO/maxresdefault.jpg",
  link: "https://youtu.be/ID_DO_VIDEO",
  descricao: "Frase curta do card.",
  // Opcionais (aparecem ao clicar no produto):
  autor: "Friedrich Nietzsche",
  ano: "1878",
  detalhes: ["Parágrafo 1...", "Parágrafo 2..."],
  aprendizados: ["Item 1", "Item 2"],
  temas: ["Moral", "Religião"],
  sobreAutor: "Um parágrafo sobre o autor."
}
```

Para uma nova categoria, adicione o nome em `const CATEGORIAS = [...]` e use o
mesmo texto no campo `categoria` do produto.

---

## 5. Workflow de Git (IMPORTANTE)

Este ambiente **bloqueia push direto na `main`** (retorna HTTP 503). O fluxo é:

1. Desenvolver na branch **`claude/upbeat-cannon-t1sds5`**.
2. Sincronizar com a main antes de commitar (evita conflitos no squash merge):
   ```
   git fetch origin main
   git reset --soft origin/main
   git add -A
   git commit -m "mensagem clara"
   git push -u origin claude/upbeat-cannon-t1sds5 --force
   ```
3. Abrir um Pull Request da branch → `main` e fazer **squash merge**.
4. O GitHub Pages publica sozinho em 1–2 min.

> Nota: o repositório foi renomeado de `siteman` para `site`
> (https://github.com/Ledger77/site). O remote antigo ainda redireciona.

---

## 6. Pendências / próximos passos

- [x] ~~Logo no lugar errado~~ → **feito**: movida para `assets/img/ledger.png`.
- [x] ~~Adicionar mais vídeos do canal~~ → **feito**: 9 produtos no ar (6 Nietzsche
      + 2 videobooks do 1984 + 1 e-book do 1984).
- [x] ~~Primeiro e-book para download~~ → **feito**: "1984 — E-book" (EPUB + PDF).
- [ ] Conforme o dono publica novas **partes do 1984 em quadrinhos**, nada a fazer
      no site: a playlist atualiza sozinha. (Trocar a capa só se ele quiser.)
- [ ] Quando houver produto pago, criar o 1º **exclusivo** com link da Hotmart.
- [ ] (Opcional) Domínio próprio em vez de `ledger77.github.io/site`.
- [ ] Adicionar novas obras assim que o dono postar (pedir título + tipo de cada uma).
- [ ] **⚠️ Trocar o PDF do e-book "1984"** pelo PDF próprio do dono (ele tem um com
      aparência melhor que a versão gerada pela IA a partir do EPUB). O dono não
      conseguiu anexar esse PDF no chat (mesmo problema de antes). Como resolver:
      ele mesmo sobe pelo GitHub (sem precisar da IA) — entra em `assets/ebooks/`
      no site do GitHub, **Add file → Upload files**, escolhe o PDF, garante que o
      nome do arquivo seja **exatamente `1984-ledger.pdf`** (para substituir o
      atual automaticamente) e clica em **Commit changes**. Assim que ele subir,
      pronto — nada mais precisa mudar no código.
- [ ] **⚠️ Capa do e-book "1984"**: o dono enviou uma arte de capa (livro com
      pirâmide-olho + câmeras, fundo laranja) **colada direto no chat**, mas
      imagens coladas assim (sem ser "anexo de arquivo") não ficam acessíveis
      para a IA copiar pro repositório. Pedir para o dono subir essa imagem
      direto pelo GitHub: pasta `assets/img/`, **Add file → Upload files**,
      qualquer nome (ex.: `capa-1984-ebook.jpg`) — depois a IA só precisa apontar
      o campo `imagem` desse produto em `produtos.js` para o arquivo. Importante:
      essa capa é só para o **card/modal do site**, não deve ser embutida no
      PDF/EPUB.

---

## 7. Histórico da conversa (contexto resumido)

O site evoluiu em etapas, todas já mergeadas na `main`:
1. Catálogo genérico inicial.
2. Reestruturado para o canal Ledger: filtro grátis/exclusivo + categorias
   Ficção/Filosofia + 1º produto (Nietzsche).
3. Tema escuro + modal de detalhes + seção SAC.
4. Google Analytics 4 (visitas, origem do tráfego, cliques nos produtos).
5. Logo movida para o lugar certo + acabamento visual (atmosfera + animações).
6. Catálogo completo: 8 produtos (6 obras de Nietzsche + 2 versões do 1984/Orwell),
   com detalhes pesquisados na web e a nota da adaptação do dono.

> Regra combinada com o dono: **a cada atualização do site, atualizar também este
> CLAUDE.md** (produtos, funcionalidades, pendências).

### Como medir tráfego por origem (UTM)
Para saber de onde vêm as visitas, usar links com parâmetros UTM:
- YouTube: `?utm_source=youtube&utm_medium=video&utm_campaign=ledger`
- WhatsApp: `?utm_source=whatsapp&utm_medium=social&utm_campaign=ledger`
- Instagram: `?utm_source=instagram&utm_medium=social&utm_campaign=ledger`
No GA4 aparecem em **Aquisição → Campanhas**.

---

## 8. Tom e regras ao trabalhar aqui

- O dono **não é programador** → explicar em **português**, passo a passo, sem jargão.
- **Não** adicionar frameworks, bundlers ou dependências. Manter HTML/CSS/JS puro.
- Comentários no código em português (seguir o estilo existente).
- Antes de mexer em produtos, lembrar: editar só `assets/js/produtos.js`.
- Confirmar com o dono antes de ações difíceis de reverter.
- **Não citar quantas partes** do "1984 em Quadrinhos" (ou de qualquer obra em
  partes) estão disponíveis — o dono não quer ter de atualizar isso a cada vídeo
  novo. Falar só que "é lançado em partes" e que "a playlist cresce com o tempo".
