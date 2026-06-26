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
├── Ledger.png              # ⚠️ logo enviada pelo dono (ver "Pendências")
└── assets/
    ├── css/styles.css      # Tema escuro (variáveis CSS no :root)
    ├── js/produtos.js      # ⭐ ÚNICO arquivo que o dono edita: CATEGORIAS + PRODUTOS
    ├── js/app.js           # Lógica: monta cards, modal, filtros, busca, eventos GA4
    └── img/
        ├── ledger.png      # logo esperada AQUI (assets/img/ledger.png)
        └── LEIA-ME.txt     # instruções de upload da logo
```

### Como os dados funcionam
- `produtos.js` define `const CATEGORIAS = [...]` e `const PRODUTOS = [...]`.
- `app.js` lê esses arrays e gera tudo dinamicamente (cards, filtros, modal).
- Cada produto tem: `titulo`, `tipo` (audiobook/videobook/ebook), `categoria`,
  `acesso` (gratis/exclusivo), `preco`, `imagem`, `link`, `descricao` — e campos
  opcionais de detalhes: `autor`, `ano`, `detalhes[]`, `aprendizados[]`, `temas[]`,
  `sobreAutor`.
- Capa recomendada = miniatura do YouTube:
  `https://img.youtube.com/vi/ID_DO_VIDEO/maxresdefault.jpg`
  (o `app.js` já cai para `hqdefault` automaticamente se a `maxres` não existir).

---

## 3. Funcionalidades já prontas

- ✅ Catálogo em grade responsiva, gerado por JS.
- ✅ Filtro por **Acesso** (Todos / 🆓 Grátis / 🔒 Exclusivos).
- ✅ Filtro por **Categoria** (Ficção / Filosofia) — gerado a partir de `CATEGORIAS`.
- ✅ Busca por texto (título + descrição).
- ✅ **Modal de detalhes**: clicar no card abre página de detalhes (capa grande,
  autor/ano, parágrafos, "Você vai encontrar", temas, sobre o autor, botões de ação).
- ✅ Seção **Atendimento ao cliente (SAC)** com e-mail e canal.
- ✅ **Tema escuro** sério/intelectual (variáveis CSS em `styles.css`):
  dourado `--ouro` (#d9a441) como cor principal, vermelho para botões do YouTube.
- ✅ Fontes: "Playfair Display" (títulos) + "Inter" (corpo).
- ✅ **Google Analytics 4** instalado (ID `G-G2G86J7W92`), com eventos personalizados:
  - `ver_produto` → disparado ao abrir o modal de um produto.
  - `clique_produto` → disparado ao clicar em "Assistir/Comprar/Ver canal".
- ✅ Logo com fallback: usa `assets/img/ledger.png`; se não existir, mostra 🦉.

### Produtos atuais
1. **Humano, Demasiado Humano** — Nietzsche (1878), Filosofia, audiobook, grátis.
   Vídeo: `https://youtu.be/kyKFWEBFe0w`

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

- [ ] **⚠️ Logo no lugar errado:** o dono subiu `Ledger.png` na **raiz** do repo,
      mas o site procura em **`assets/img/ledger.png`** (minúsculo). Enquanto não
      for movida/renomeada, o site mostra a coruja 🦉 de fallback. Ação: mover/
      renomear o arquivo para `assets/img/ledger.png`.
- [ ] Adicionar mais vídeos do canal como produtos (ex.: 1984/Orwell, Aurora,
      Assim Falou Zaratustra, Sobre Verdade e Mentira, O Nascimento da Tragédia).
- [ ] Quando houver produto pago, criar o 1º **exclusivo** com link da Hotmart.
- [ ] (Opcional) Domínio próprio em vez de `ledger77.github.io/site`.

---

## 7. Histórico da conversa (contexto resumido)

O site evoluiu em etapas, todas já mergeadas na `main`:
1. Catálogo genérico inicial.
2. Reestruturado para o canal Ledger: filtro grátis/exclusivo + categorias
   Ficção/Filosofia + 1º produto (Nietzsche).
3. Tema escuro + modal de detalhes + seção SAC.
4. Google Analytics 4 (visitas, origem do tráfego, cliques nos produtos).

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
