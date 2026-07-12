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
- 🌐 Site ao vivo: **https://ledger77.github.io/site/** (domínio próprio
  `ledger77.com.br` comprado no Registro.br, aguardando configuração de DNS —
  ver seção 6)
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

### 🔒 Segurança dos produtos EXCLUSIVOS (regra crítica, não pular)
- Este repositório é **público** (obrigatório para o GitHub Pages grátis). Isso
  significa que **qualquer arquivo colocado aqui** (em `assets/` ou em qualquer
  pasta) fica **acessível a qualquer pessoa**, sem senha — mesmo sem ninguém
  "hackear" nada. É assim que repositórios públicos funcionam.
- Isso é **ok e intencional** para conteúdo grátis (como o e-book do 1984,
  propositalmente público).
- **Mas nunca faça isso com um produto `acesso: "exclusivo"`.** O arquivo de um
  produto pago (e-book, PDF, o que for) **NUNCA** deve ser commitado neste
  repositório — ficaria disponível de graça pra qualquer um, sem precisar
  comprar. O arquivo do produto exclusivo deve ficar **hospedado dentro da
  Hotmart** (área de membros dela, que só libera após pagamento confirmado); o
  `link` do produto aqui no site aponta só para o **checkout da Hotmart**, nunca
  para um arquivo local.
- Se o dono perguntar sobre segurança/vazamento de produtos pagos, é esse o
  ponto a explicar: o risco não é "hackearem o site", é **colocar sem querer**
  o arquivo pago num lugar público (aqui) em vez de dentro da Hotmart.

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
- ✅ **Ordenação** (menu "Ordenar por"): Padrão (mais novos no catálogo primeiro),
  Título A→Z / Z→A, Mais recente / Mais antigo (por `ano`). Lógica em `ordenarLista` (`app.js`).
- ✅ **Capas em 16:9** (mesma proporção da miniatura do YouTube): cards e modal
  usam `aspect-ratio: 16/9`, então a imagem aparece **inteira**, sem cortes.
- ✅ **Modal de detalhes**: clicar no card abre página de detalhes (capa grande,
  autor/ano, parágrafos, "Você vai encontrar", temas, sobre o autor, botões de ação).
  Além de clicar em qualquer parte do card, também há um botão explícito
  **"🔍 Ver detalhes"** (não é link — por isso já cai no mesmo clique do card,
  sem precisar de JS extra) para deixar claro que dá pra ver mais antes de comprar.
- ✅ **Prévia de 1 min**: no modal, o botão "▶ Prévia de 1 min" troca a capa pelo
  player do YouTube (`youtube-nocookie`, `end=60` → para sozinho aos 60s). O vídeo
  completo é só pelo botão "Assistir". O ID do vídeo é extraído da imagem/link
  (`idDoYouTube` em `app.js`); na playlist do 1984, usa a Parte 1.
- ✅ **Prévia em PDF** (para e-books, inclusive exclusivos): campo opcional
  `previa` no produto → botão "📖 Ler prévia grátis" no modal, abre o PDF numa
  aba nova. Pensada para e-books **exclusivos** mostrarem algumas páginas de
  graça antes da compra (diferente do arquivo completo, essa prévia pode ficar
  pública no repositório).
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

### Produtos atuais (10) — 8 grátis + 2 exclusivos
**Filosofia (Nietzsche) — YouTube, grátis:**
1. **Humano, Demasiado Humano** (1878) — audiobook — `https://youtu.be/kyKFWEBFe0w`
2. **Assim Falou Zaratustra** (1883) — videobook ilustrado — `https://youtu.be/VhkXzWzRIyo`
3. **Aurora** (1881) — audiobook — `https://youtu.be/Oy8kJapGQSo`
4. **A Genealogia da Moral** (1887) — audiobook — `https://youtu.be/wJfQFefWQnM`
5. **O Nascimento da Tragédia** (1872) — audiobook — `https://youtu.be/hulz3ebGFL0`
6. **Sobre Verdade e Mentira** (1873) — audiobook — `https://youtu.be/JHKta2RN280`

**Ficção (Orwell):**
7. **1984 — Edição Completa** — videobook ilustrado, grátis (livro inteiro num vídeo) — `https://youtu.be/Uc9Ez1DG88g`
8. **1984 — E-book (Adaptação Ledger)** — 🔒 **EXCLUSIVO**, **R$ 3,90** (primeiro
   produto pago do site). Texto completo em PDF e EPUB, adaptação própria do
   dono. `link` aponta para o checkout da Hotmart: `https://pay.hotmart.com/M106614679D`.
   Capa própria em `assets/img/capa-1984-ebook.jpeg`.
   - **Prévia grátis (20 páginas):** botão "📖 Ler prévia grátis" no modal, ao lado
     de "Comprar agora". Usa o campo opcional `previa` (caminho do PDF), lido em
     `montarModal()` no `app.js`. Arquivo em `assets/ebooks/1984-ledger-previa.pdf`.
     **Diferente do arquivo completo:** esta prévia é só um recorte da obra e
     **pode sim ficar pública** no repositório — é a "vitrine" antes da compra
     (tipo "Look Inside"), não o produto inteiro. A regra de segurança da seção 2
     (nunca commitar arquivo exclusivo) vale para o **arquivo completo**, não para
     prévias curtas como esta.
   - **Histórico de segurança:** este produto **era grátis** até o dono decidir
     monetizá-lo. Os arquivos (`assets/ebooks/1984-ledger.pdf`/`.epub`) foram
     **removidos do repositório** nesse momento (só existiam porque era grátis —
     seguindo a regra de segurança da seção 2). Ficam hospedados só dentro da
     Hotmart a partir de agora. **Atenção:** como o repositório é público e esses
     arquivos ficaram acessíveis por um tempo (enquanto o produto era grátis, de
     propósito), cópias feitas nesse período não podem ser "revogadas" — isso é
     esperado (é assim que qualquer transição grátis→pago funciona) e não é uma
     falha a corrigir. O histórico de commits do Git também mantém essas versões
     antigas tecnicamente acessíveis (não removemos do histórico — isso exigiria
     reescrever o histórico do repositório, uma operação arriscada; só fazer se o
     dono pedir explicitamente).
   - **Decisão registrada (perguntado ao dono):** ele optou por **deixar o
     histórico do Git como está** — risco considerado baixo por enquanto (0 forks,
     0 watchers no repositório, ninguém de fora observando). As outras opções
     (reescrever o histórico ou recomeçar o repositório do zero) ficam disponíveis
     se o site crescer e isso passar a preocupar de verdade — não fazer nenhuma
     das duas sem o dono pedir de novo.

**Filosofia (Nietzsche) — e-book exclusivo:**
9. **A Gaia Ciência — E-book (Adaptação Ledger)** — 🔒 **EXCLUSIVO**, **R$ 15,00**.
   Texto completo em PDF e EPUB (335 páginas), adaptação própria do dono.
   Prévia grátis (30 páginas) em `assets/ebooks/gaia-ciencia-previa.pdf`.
   Capa em `assets/img/capa-gaia-ciencia.png`.
   `link` aponta para o checkout da Hotmart: `https://pay.hotmart.com/T106711358H`.

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

> **Se o site não atualizar depois de 5+ min:** o deploy do GitHub Pages pode ter
> falhado por instabilidade do próprio GitHub (erro genérico "Deployment failed,
> try again later" — já aconteceu, nada a ver com o conteúdo do site). Ver em
> `github.com/Ledger77/site` → aba **Actions** se o último "pages build and
> deployment" está com ❌. Se sim, clicar em **Re-run jobs**; se travar em
> "queued" por muito tempo, um novo commit (qualquer um) dispara um deploy novo.

> Nota: o repositório foi renomeado de `siteman` para `site`
> (https://github.com/Ledger77/site). O remote antigo ainda redireciona.

---

## 6. Pendências / próximos passos

- [x] ~~Logo no lugar errado~~ → **feito**: movida para `assets/img/ledger.png`.
- [x] ~~Adicionar mais vídeos do canal~~ → **feito**: 8 produtos no ar (6 Nietzsche
      + 1 videobook do 1984 + 1 e-book do 1984).
- [x] ~~Primeiro e-book para download~~ → **feito**: "1984 — E-book" (EPUB + PDF).
- [x] ~~Trocar o PDF do e-book "1984" pelo PDF próprio do dono~~ → **feito**: ele
      subiu direto pelo GitHub em `assets/ebooks/1984-ledger.pdf` (401 páginas).
- [x] ~~Capa do e-book "1984"~~ → **feito**: dono subiu pelo GitHub em
      `assets/img/capa-1984-ebook.jpeg`; campo `imagem` do produto já aponta pra lá.
- [x] ~~Quando houver produto pago, criar o 1º exclusivo com link da Hotmart~~ →
      **feito**: "1984 — E-book" virou exclusivo, **R$ 3,90**
      (`https://pay.hotmart.com/M106614679D`).
- [ ] **Domínio próprio** `ledger77.com.br` — **comprado no Registro.br** (2026).
      Arquivo `CNAME` já criado neste repositório apontando pra ele. **Falta só**
      o dono configurar o DNS no painel do Registro.br (registros A + CNAME,
      ver instruções que a IA já passou no chat) e marcar "Enforce HTTPS" em
      Settings → Pages no GitHub depois que o DNS propagar.
- [ ] Adicionar novas obras assim que o dono postar (pedir título + tipo de cada uma).

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
- **Não citar quantas partes** de uma obra lançada em partes (playlist) estão
  disponíveis — o dono não quer ter de atualizar isso a cada vídeo novo. Falar só
  que "é lançado em partes" e que "a playlist cresce com o tempo".
