# 📚 Sua Loja Digital — Catálogo de Audiobooks, Videobooks e E-books

Site simples e gratuito para mostrar seus produtos digitais. Cada produto tem
um botão **Comprar** que leva direto para o link da **Hotmart** daquele produto.

---

## ✏️ Como adicionar ou editar produtos

Você só precisa mexer em **um arquivo**: `assets/js/produtos.js`.

Cada produto é um bloco assim:

```js
{
  titulo: "Nome do produto",
  tipo: "ebook",                 // "audiobook", "videobook" ou "ebook"
  descricao: "Frase curta sobre o produto.",
  preco: "R$ 29,90",
  imagem: "",                    // link da capa (opcional)
  link: "https://www.hotmart.com/SEU-PRODUTO"   // 🔗 seu link da Hotmart
}
```

- Para **adicionar** um produto: copie um bloco inteiro, cole logo abaixo e
  coloque uma vírgula entre eles.
- Para **remover**: apague o bloco do produto.
- ⚠️ **Não esqueça** de trocar o `link` pelo link real da Hotmart de cada produto
  — é por ele que a venda acontece.

## 🖼️ Como colocar as capas

No campo `imagem`, cole o link de uma imagem (de preferência vertical, tipo capa
de livro). Você pode criar capas bonitas no **Canva** e usar o link da imagem aqui.
Se deixar `imagem: ""`, o site mostra uma capa colorida automática.

## 👀 Como ver o site no seu computador

Abra o arquivo `index.html` com um duplo clique. Ele abre no navegador.

## 🌐 Como publicar na internet (grátis, com GitHub Pages)

1. No GitHub, abra este repositório e clique em **Settings** (Configurações).
2. No menu da esquerda, clique em **Pages**.
3. Em **Branch**, escolha a branch do site e a pasta **/ (root)**, e clique em **Save**.
4. Aguarde 1–2 minutos. O endereço do seu site aparece no topo dessa mesma página.

Pronto! Seu catálogo estará no ar. 🎉

---

> Os produtos que já vêm no site são apenas **exemplos** — troque pelos seus.
> Pagamentos são processados com segurança pela Hotmart.
