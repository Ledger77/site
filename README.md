# 🦉 Ledger — Audiobooks e Videobooks de Filosofia e Ficção

Catálogo dos conteúdos do canal **Ledger**. Os produtos **grátis** levam ao vídeo
no YouTube; os **exclusivos** (futuros) levam ao link da **Hotmart**.

🔗 Site no ar: **https://ledger77.github.io/site/**
▶️ Canal: **https://www.youtube.com/@Ledger.77**

---

## ✏️ Como adicionar ou editar produtos

Você só precisa mexer em **um arquivo**: `assets/js/produtos.js`.

Cada produto é um bloco assim:

```js
{
  titulo: "Humano, Demasiado Humano",
  tipo: "audiobook",            // "audiobook" ou "videobook"
  categoria: "Filosofia",       // uma das CATEGORIAS (veja no topo do arquivo)
  acesso: "gratis",             // "gratis" (vai pro YouTube) ou "exclusivo" (vai pra Hotmart)
  preco: "",                    // "" quando grátis; ex.: "R$ 29,90" quando exclusivo
  imagem: "https://img.youtube.com/vi/ID_DO_VIDEO/maxresdefault.jpg",
  link: "https://youtu.be/ID_DO_VIDEO"   // grátis: link do vídeo | exclusivo: link da Hotmart
}
```

- **Adicionar:** copie um bloco inteiro, cole logo abaixo e separe com vírgula.
- **Remover:** apague o bloco.

## 🖼️ A capa (imagem) mais fácil

Use a **miniatura do seu próprio vídeo do YouTube**. Pegue o código do vídeo
(o que vem depois de `youtu.be/`) e monte o link assim:

```
https://img.youtube.com/vi/CODIGO_DO_VIDEO/maxresdefault.jpg
```

Exemplo: para `https://youtu.be/kyKFWEBFe0w`, a capa é
`https://img.youtube.com/vi/kyKFWEBFe0w/maxresdefault.jpg`.

## 🏷️ Categorias

No topo do `produtos.js` existe a lista de categorias que viram botões de filtro:

```js
const CATEGORIAS = ["Ficção", "Filosofia"];
```

Para criar uma categoria nova (ex.: História), é só adicioná-la nessa lista
e usar o mesmo nome no campo `categoria` dos produtos.

## 🆓 Grátis x 🔒 Exclusivo

- `acesso: "gratis"` → preço aparece como **Grátis** e o botão vira **"▶ Assistir"** (abre o YouTube).
- `acesso: "exclusivo"` → aparece o **preço** e o botão **"Comprar"** (abre a Hotmart).

## 🌐 Publicar as alterações

O site é publicado pelo GitHub Pages a partir da branch **main**. Sempre que o
conteúdo da `main` mudar, o site é atualizado sozinho em 1–2 minutos.
