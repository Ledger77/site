# 🦉 Ledger — Audiobooks e Videobooks de Filosofia e Ficção

Catálogo dos conteúdos do canal **Ledger**, com tema escuro e página de detalhes.
Produtos **grátis** levam ao vídeo no YouTube; os **exclusivos** levam à **Hotmart**.

🔗 Site: **https://ledger77.github.io/site/**
▶️ Canal: **https://www.youtube.com/@Ledger.77**

---

## ✏️ Como adicionar ou editar produtos

Você só mexe em **um arquivo**: `assets/js/produtos.js`.

```js
{
  titulo: "Nome da obra",
  tipo: "audiobook",            // "audiobook" ou "videobook"
  categoria: "Filosofia",       // uma das CATEGORIAS (topo do arquivo)
  acesso: "gratis",             // "gratis" (YouTube) ou "exclusivo" (Hotmart)
  preco: "",                    // "" quando grátis; ex.: "R$ 29,90" quando exclusivo
  imagem: "https://img.youtube.com/vi/ID_DO_VIDEO/maxresdefault.jpg",
  link: "https://youtu.be/ID_DO_VIDEO",
  descricao: "Frase curta que aparece no card.",

  // Detalhes (opcionais) — aparecem quando a pessoa clica no produto:
  autor: "Friedrich Nietzsche",
  ano: "1878",
  detalhes: ["Parágrafo 1...", "Parágrafo 2..."],
  aprendizados: ["Item 1", "Item 2"],
  temas: ["Moral", "Religião"],
  sobreAutor: "Um parágrafo sobre o autor."
}
```

## 🦉 Logo (a imagem da coruja)

O site procura o arquivo **`assets/img/ledger.png`**. Se ele existir, vira a logo;
se não, aparece a corujinha 🦉.

**Para subir sua coruja:** no GitHub, entre na pasta `assets/img`, clique em
**Add file → Upload files**, arraste sua imagem (salve com o nome `ledger.png`)
e clique em **Commit changes**.

## 🏷️ Categorias

No topo do `produtos.js`:

```js
const CATEGORIAS = ["Ficção", "Filosofia"];
```

Adicione novas categorias nessa lista e use o mesmo nome no campo `categoria`.

## 🌐 Publicar alterações

O site é publicado pelo GitHub Pages a partir da branch **main**. Quando a `main`
muda, o site se atualiza sozinho em 1–2 minutos.
