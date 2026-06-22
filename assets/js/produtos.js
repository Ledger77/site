/* ============================================================================
   📦  SEUS PRODUTOS — edite só este arquivo para mexer no catálogo!
   ============================================================================ */


/* CATEGORIAS — viram os botões de filtro por categoria.
   Adicione novas com o tempo. Ex.: "Ficção", "Filosofia", "História"...        */
const CATEGORIAS = ["Ficção", "Filosofia"];


/* ----------------------------------------------------------------------------
   Cada produto é um bloco { ... }. Para adicionar outro, copie um bloco,
   cole logo abaixo e separe os blocos com vírgula.

   CAMPOS PRINCIPAIS
   - titulo     -> nome da obra / título do vídeo
   - tipo       -> "audiobook"  ou  "videobook"
   - categoria  -> uma das CATEGORIAS acima. Ex.: "Filosofia"
   - acesso     -> "gratis"     => botão "▶ Assistir" leva ao vídeo no YouTube
                   "exclusivo"  => botão "Comprar" leva ao seu link da Hotmart
   - preco      -> "" quando grátis.  Quando exclusivo, ex.: "R$ 29,90"
   - imagem     -> capa. DICA: use a miniatura do vídeo do YouTube:
                   https://img.youtube.com/vi/ID_DO_VIDEO/maxresdefault.jpg
   - link       -> grátis: link do vídeo | exclusivo: link da Hotmart
   - descricao  -> frase curta que aparece no card

   CAMPOS DOS DETALHES (opcionais — aparecem ao CLICAR no produto)
   - autor        -> ex.: "Friedrich Nietzsche"
   - ano          -> ex.: "1878"
   - detalhes     -> lista de parágrafos (textos longos sobre a obra)
   - aprendizados -> lista do "Você vai encontrar"
   - temas        -> lista de temas (viram etiquetas)
   - sobreAutor   -> um parágrafo sobre o autor
   ---------------------------------------------------------------------------- */

const PRODUTOS = [

  {
    titulo: "Humano, Demasiado Humano",
    tipo: "audiobook",
    categoria: "Filosofia",
    acesso: "gratis",
    preco: "",
    imagem: "https://img.youtube.com/vi/kyKFWEBFe0w/maxresdefault.jpg",
    link: "https://youtu.be/kyKFWEBFe0w",
    descricao: "Audiobook do clássico de Nietzsche (1878), modernizado e simplificado para hoje.",

    autor: "Friedrich Nietzsche",
    ano: "1878",

    detalhes: [
      "Versão em audiobook do livro \"Humano, Demasiado Humano\", de Friedrich Nietzsche, modernizada e simplificada para os dias de hoje — feita para ser fácil de entender, sem perder a profundidade.",
      "Nesta obra, Nietzsche abandona o estilo romântico e monolítico para apresentar uma série de aforismos e reflexões curtas que desmontam crenças consolidadas sobre moral, religião, ciência e o \"sentido\" da vida. Com ironia e rigor filosófico, ele investiga as raízes históricas e psicológicas dos nossos valores e convida o ouvinte a cultivar um pensamento mais autônomo e crítico.",
      "Publicado em 1878, o livro marca a fase do chamado \"espírito livre\": o momento em que Nietzsche se afasta de influências como Wagner e Schopenhauer e passa a confiar na ciência, na história e na psicologia para questionar aquilo que costumamos aceitar sem pensar."
    ],

    aprendizados: [
      "Como nossos valores morais foram construídos ao longo da história",
      "Por que Nietzsche questiona certezas religiosas e metafísicas",
      "O conceito de \"espírito livre\" e o pensamento independente",
      "Uma porta de entrada acessível para a filosofia de Nietzsche"
    ],

    temas: ["Moral", "Religião", "Ciência e verdade", "Livre-pensamento", "Crítica à metafísica"],

    sobreAutor: "Friedrich Nietzsche (1844–1900) foi um dos filósofos mais influentes da história. Conhecido pelo estilo provocador e pela crítica radical à moral tradicional, deixou obras como \"Assim Falou Zaratustra\", \"Para Além do Bem e do Mal\" e \"A Genealogia da Moral\"."
  }

];
