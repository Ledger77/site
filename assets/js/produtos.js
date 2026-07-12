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
   - link       -> grátis: link do vídeo (ou de uma PLAYLIST, p/ videobook em partes)
                   exclusivo: link da Hotmart
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
      "Versão em audiobook do livro “Humano, Demasiado Humano”, de Friedrich Nietzsche, modernizada e simplificada para os dias de hoje — feita para ser fácil de entender, sem perder a profundidade.",
      "Nesta obra, Nietzsche abandona o estilo romântico e monolítico para apresentar uma série de aforismos e reflexões curtas que desmontam crenças consolidadas sobre moral, religião, ciência e o “sentido” da vida. Com ironia e rigor filosófico, ele investiga as raízes históricas e psicológicas dos nossos valores e convida o ouvinte a cultivar um pensamento mais autônomo e crítico.",
      "Publicado em 1878, o livro marca a fase do chamado “espírito livre”: o momento em que Nietzsche se afasta de influências como Wagner e Schopenhauer e passa a confiar na ciência, na história e na psicologia para questionar aquilo que costumamos aceitar sem pensar."
    ],

    aprendizados: [
      "Como nossos valores morais foram construídos ao longo da história",
      "Por que Nietzsche questiona certezas religiosas e metafísicas",
      "O conceito de “espírito livre” e o pensamento independente",
      "Uma porta de entrada acessível para a filosofia de Nietzsche"
    ],

    temas: ["Moral", "Religião", "Ciência e verdade", "Livre-pensamento", "Crítica à metafísica"],

    sobreAutor: "Friedrich Nietzsche (1844–1900) foi um dos filósofos mais influentes da história. Conhecido pelo estilo provocador e pela crítica radical à moral tradicional, deixou obras como “Assim Falou Zaratustra”, “Para Além do Bem e do Mal” e “A Genealogia da Moral”."
  },

  {
    titulo: "Assim Falou Zaratustra",
    tipo: "videobook",
    categoria: "Filosofia",
    acesso: "gratis",
    preco: "",
    imagem: "https://img.youtube.com/vi/VhkXzWzRIyo/maxresdefault.jpg",
    link: "https://youtu.be/VhkXzWzRIyo",
    descricao: "Videobook ilustrado da obra mais célebre de Nietzsche (1883), com a escrita modernizada.",

    autor: "Friedrich Nietzsche",
    ano: "1883",

    detalhes: [
      "Videobook ilustrado de “Assim Falou Zaratustra”, a obra mais conhecida de Nietzsche — com a escrita adaptada por mim para uma linguagem mais fluida, atual e simplificada, fácil de acompanhar sem perder a força do original.",
      "Em forma de poema filosófico, acompanhamos Zaratustra, que, depois de dez anos isolado nas montanhas, desce para partilhar com os homens aquilo que aprendeu. É ali que ele anuncia algumas das ideias mais marcantes do filósofo: a “morte de Deus”, o além-do-homem (o super-homem) e o eterno retorno.",
      "Mais do que um tratado, é um convite à autossuperação: abandonar os valores herdados sem reflexão, criar os próprios valores e dizer “sim” à vida exatamente como ela é."
    ],

    aprendizados: [
      "O que Nietzsche quis dizer com “Deus está morto”",
      "O conceito de além-do-homem (super-homem) e a autossuperação",
      "A ideia do eterno retorno e o amor ao próprio destino",
      "A diferença entre o “último homem” e quem cria os próprios valores"
    ],

    temas: ["Além-do-homem", "Eterno retorno", "Vontade de potência", "Crítica à moral", "Sentido da vida"],

    sobreAutor: "Friedrich Nietzsche (1844–1900) foi um dos filósofos mais influentes da história. Conhecido pelo estilo provocador e pela crítica radical à moral tradicional, deixou obras como “Assim Falou Zaratustra”, “Para Além do Bem e do Mal” e “A Genealogia da Moral”."
  },

  {
    titulo: "Aurora",
    tipo: "audiobook",
    categoria: "Filosofia",
    acesso: "gratis",
    preco: "",
    imagem: "https://img.youtube.com/vi/Oy8kJapGQSo/maxresdefault.jpg",
    link: "https://youtu.be/Oy8kJapGQSo",
    descricao: "Audiobook de “Aurora” (1881), em que Nietzsche questiona, aforismo a aforismo, nossos preconceitos morais.",

    autor: "Friedrich Nietzsche",
    ano: "1881",

    detalhes: [
      "Versão em audiobook de “Aurora — Reflexões sobre os preconceitos morais”, com a escrita modernizada e simplificada por mim para soar natural aos ouvidos de hoje.",
      "Publicado em 1881, o livro reúne centenas de aforismos — textos curtos, de poucas linhas a algumas páginas — nos quais Nietzsche investiga a origem da nossa moral. Sua tese é provocadora: aquilo que tratamos como “sagrado” e inquestionável (o bem, o dever, a culpa, a compaixão) foi, na verdade, construído pela história e pela cultura.",
      "O título traduz a esperança do filósofo: como uma aurora, o nascer de um novo dia em que possamos pensar livres das velhas ilusões. “Há tantas auroras que ainda não brilharam”, diz a epígrafe que abre o livro."
    ],

    aprendizados: [
      "Como os valores morais nascem da história, e não “do céu”",
      "O que é pensar por aforismos",
      "Por que Nietzsche desconfia da culpa e do “dever”",
      "Uma porta de entrada serena para a crítica da moral"
    ],

    temas: ["Moral", "Preconceitos", "Cultura e história", "Livre-pensamento", "Aforismos"],

    sobreAutor: "Friedrich Nietzsche (1844–1900) foi um dos filósofos mais influentes da história. Conhecido pelo estilo provocador e pela crítica radical à moral tradicional, deixou obras como “Assim Falou Zaratustra”, “Para Além do Bem e do Mal” e “A Genealogia da Moral”."
  },

  {
    titulo: "A Genealogia da Moral",
    tipo: "audiobook",
    categoria: "Filosofia",
    acesso: "gratis",
    preco: "",
    imagem: "https://img.youtube.com/vi/wJfQFefWQnM/maxresdefault.jpg",
    link: "https://youtu.be/wJfQFefWQnM",
    descricao: "Audiobook de “A Genealogia da Moral” (1887): de onde vêm, afinal, o bem e o mal?",

    autor: "Friedrich Nietzsche",
    ano: "1887",

    detalhes: [
      "Versão em audiobook de “A Genealogia da Moral”, adaptada por mim para uma linguagem mais fluida e atual, sem perder o rigor do texto de Nietzsche.",
      "Organizado em três ensaios (ou “dissertações”), o livro investiga de onde vêm os nossos juízos de “bom” e “mau”. No primeiro, Nietzsche opõe a “moral dos senhores” à “moral dos escravos”, mostrando como o ressentimento dos fracos teria invertido os valores antigos. No segundo, examina a origem da culpa e da “má consciência”. No terceiro, pergunta o que significam os ideais de renúncia e ascetismo.",
      "Publicado em 1887, é um dos textos mais lidos e influentes do filósofo — uma escavação das raízes psicológicas e históricas daquilo que chamamos de moralidade."
    ],

    aprendizados: [
      "A diferença entre a “moral dos senhores” e a “moral dos escravos”",
      "O que é o ressentimento e como ele molda valores",
      "A origem da culpa e da “má consciência”",
      "O que Nietzsche entende por ideal ascético"
    ],

    temas: ["Moral", "Ressentimento", "Bem e mal", "Culpa", "Crítica ao cristianismo"],

    sobreAutor: "Friedrich Nietzsche (1844–1900) foi um dos filósofos mais influentes da história. Conhecido pelo estilo provocador e pela crítica radical à moral tradicional, deixou obras como “Assim Falou Zaratustra”, “Para Além do Bem e do Mal” e “A Genealogia da Moral”."
  },

  {
    titulo: "O Nascimento da Tragédia",
    tipo: "audiobook",
    categoria: "Filosofia",
    acesso: "gratis",
    preco: "",
    imagem: "https://img.youtube.com/vi/hulz3ebGFL0/maxresdefault.jpg",
    link: "https://youtu.be/hulz3ebGFL0",
    descricao: "Audiobook do primeiro livro de Nietzsche (1872), sobre os impulsos apolíneo e dionisíaco na arte.",

    autor: "Friedrich Nietzsche",
    ano: "1872",

    detalhes: [
      "Versão em audiobook de “O Nascimento da Tragédia”, o primeiro livro de Nietzsche, com a escrita modernizada e simplificada por mim para facilitar o acompanhamento.",
      "Aqui Nietzsche apresenta dois impulsos que, segundo ele, movem toda a arte: o apolíneo (de Apolo) — a forma, a medida, o sonho, a clareza — e o dionisíaco (de Dionísio) — a embriaguez, o êxtase, a força que dissolve os limites do indivíduo. A grande arte grega, a tragédia, teria nascido justamente da tensão entre os dois.",
      "Publicado em 1872, o livro é também um manifesto: Nietzsche lamenta a “morte” da tragédia pelo excesso de racionalismo (que ele associa a Sócrates) e defende a arte como a forma mais alta de dar sentido à existência."
    ],

    aprendizados: [
      "O que são os impulsos apolíneo e dionisíaco",
      "Como nasceu — e por que “morreu” — a tragédia grega",
      "A crítica de Nietzsche ao excesso de racionalismo",
      "Por que, para ele, a arte justifica a vida"
    ],

    temas: ["Arte", "Apolíneo e dionisíaco", "Tragédia grega", "Estética", "Crítica ao racionalismo"],

    sobreAutor: "Friedrich Nietzsche (1844–1900) foi um dos filósofos mais influentes da história. Conhecido pelo estilo provocador e pela crítica radical à moral tradicional, deixou obras como “Assim Falou Zaratustra”, “Para Além do Bem e do Mal” e “A Genealogia da Moral”."
  },

  {
    titulo: "Sobre Verdade e Mentira",
    tipo: "audiobook",
    categoria: "Filosofia",
    acesso: "gratis",
    preco: "",
    imagem: "https://img.youtube.com/vi/JHKta2RN280/maxresdefault.jpg",
    link: "https://youtu.be/JHKta2RN280",
    descricao: "Audiobook do ensaio em que Nietzsche pergunta: o que é, afinal, a “verdade”?",

    autor: "Friedrich Nietzsche",
    ano: "1873",

    detalhes: [
      "Versão em audiobook do ensaio “Sobre Verdade e Mentira no Sentido Extramoral”, adaptado por mim para uma linguagem mais clara e atual.",
      "Escrito em 1873 (e publicado mais tarde), este texto curto e poderoso começa quase como uma fábula, lembrando o quanto o conhecimento humano é pequeno e passageiro diante da imensidão do universo. A partir daí, Nietzsche faz a sua pergunta mais incômoda: o que é, exatamente, aquilo que chamamos de “verdade”?",
      "Sua resposta ficou célebre: a verdade seria “um exército móvel de metáforas” — palavras e imagens que, de tanto serem repetidas, passaram a parecer fixas e obrigatórias. Um convite a desconfiar da suposta neutralidade da linguagem e a reconhecer o poder criador da arte."
    ],

    aprendizados: [
      "Por que Nietzsche chama a verdade de “exército de metáforas”",
      "Como a linguagem molda aquilo que aceitamos como real",
      "A tensão entre ciência e arte",
      "Um texto curto, ótimo como porta de entrada ao autor"
    ],

    temas: ["Verdade", "Linguagem", "Metáfora", "Conhecimento", "Arte e ciência"],

    sobreAutor: "Friedrich Nietzsche (1844–1900) foi um dos filósofos mais influentes da história. Conhecido pelo estilo provocador e pela crítica radical à moral tradicional, deixou obras como “Assim Falou Zaratustra”, “Para Além do Bem e do Mal” e “A Genealogia da Moral”."
  },

  {
    titulo: "1984 — Edição Completa",
    tipo: "videobook",
    categoria: "Ficção",
    acesso: "gratis",
    preco: "",
    imagem: "https://img.youtube.com/vi/Uc9Ez1DG88g/maxresdefault.jpg",
    link: "https://youtu.be/Uc9Ez1DG88g",
    descricao: "Videobook ilustrado com o clássico distópico de George Orwell na íntegra, em um único vídeo.",

    autor: "George Orwell",
    ano: "1949",

    detalhes: [
      "Videobook ilustrado de “1984”, de George Orwell, com o romance completo em um único vídeo — texto adaptado por mim para uma linguagem mais fluida e atual.",
      "Em um futuro sombrio, o mundo se divide entre superpotências em guerra perpétua. Em Oceania, o Partido tudo vigia sob o olhar do “Grande Irmão”. Acompanhamos Winston Smith, um funcionário que reescreve o passado a mando do regime — até começar a duvidar de tudo e ousar pensar por conta própria.",
      "Publicado em 1949, “1984” não foi escrito como previsão, mas como advertência: um alerta contra o totalitarismo, a vigilância e a manipulação da verdade. Daqui vêm ideias que usamos até hoje, como “Grande Irmão”, “duplipensar” e “novilíngua”."
    ],

    aprendizados: [
      "Como um regime totalitário controla a informação e a memória",
      "O que significam “Grande Irmão”, “duplipensar” e “novilíngua”",
      "Por que a liberdade de pensar é o coração do livro",
      "Por que “1984” continua tão atual"
    ],

    temas: ["Distopia", "Totalitarismo", "Vigilância", "Liberdade", "Manipulação da verdade"],

    sobreAutor: "George Orwell (1903–1950), pseudônimo de Eric Arthur Blair, foi um escritor e jornalista britânico. Crítico contundente de todo autoritarismo, tornou-se mundialmente conhecido por “A Revolução dos Bichos” e “1984”, livros que viraram símbolos da defesa da liberdade, da verdade e do pensamento independente."
  },

  {
    titulo: "1984 — E-book (Adaptação Ledger)",
    tipo: "ebook",
    categoria: "Ficção",
    acesso: "exclusivo",
    preco: "R$ 3,90",
    imagem: "assets/img/capa-1984-ebook.jpeg",
    link: "https://pay.hotmart.com/M106614679D",
    previa: "assets/ebooks/1984-ledger-previa.pdf?v=2",   // prévia grátis — ?v=2 força navegador a pegar o PDF novo
    descricao: "Minha adaptação completa de “1984” em e-book — 401 páginas, disponível em PDF e EPUB.",

    autor: "George Orwell",
    ano: "1949",

    detalhes: [
      "Minha adaptação completa de “1984”, de George Orwell, em formato de e-book — o romance na íntegra, com 401 páginas e linguagem modernizada e simplificada por mim, dividido em 9 partes. Disponível em PDF (ideal para ler no computador ou imprimir) e em EPUB (ideal para celular e leitores de e-book).",
      "Em um futuro sombrio, o mundo se divide entre superpotências em guerra perpétua. Em Oceania, o Partido tudo vigia sob o olhar do “Grande Irmão”. Acompanhamos Winston Smith, um funcionário que reescreve o passado a mando do regime — até começar a duvidar de tudo e ousar pensar por conta própria.",
      "Publicado em 1949, “1984” não foi escrito como previsão, mas como advertência: um alerta contra o totalitarismo, a vigilância e a manipulação da verdade. Daqui vêm ideias que usamos até hoje, como “Grande Irmão”, “duplipensar” e “novilíngua”."
    ],

    aprendizados: [
      "O romance completo de “1984”, para ler no seu ritmo",
      "Como um regime totalitário controla a informação e a memória",
      "O que significam “Grande Irmão”, “duplipensar” e “novilíngua”",
      "Por que “1984” continua tão atual"
    ],

    temas: ["Distopia", "Totalitarismo", "Vigilância", "Liberdade", "Manipulação da verdade"],

    sobreAutor: "George Orwell (1903–1950), pseudônimo de Eric Arthur Blair, foi um escritor e jornalista britânico. Crítico contundente de todo autoritarismo, tornou-se mundialmente conhecido por “A Revolução dos Bichos” e “1984”, livros que viraram símbolos da defesa da liberdade, da verdade e do pensamento independente."
  },

  {
    titulo: "A Gaia Ciência — E-book (Adaptação Ledger)",
    tipo: "ebook",
    categoria: "Filosofia",
    acesso: "exclusivo",
    preco: "R$ 15,00",
    imagem: "assets/img/capa-gaia-ciencia.png",
    link: "https://pay.hotmart.com/T106711358H",
    previa: "assets/ebooks/gaia-ciencia-previa.pdf",   // prévia grátis (30 páginas) — pode ser pública
    descricao: "Minha adaptação completa de “A Gaia Ciência”, de Nietzsche — 335 páginas, em PDF e EPUB.",

    autor: "Friedrich Nietzsche",
    ano: "1882",

    detalhes: [
      "Minha adaptação completa de “A Gaia Ciência” (Die fröhliche Wissenschaft), de Friedrich Nietzsche — uma das obras mais pessoais e variadas do filósofo, com 335 páginas e linguagem modernizada e simplificada por mim para soar natural hoje, sem perder a força do original. Disponível em PDF (ideal para computador ou impressão) e em EPUB (ideal para celular e leitores de e-book).",
      "Publicada em 1882 e ampliada em 1887, a obra reúne centenas de aforismos, poemas, parábolas e pequenos ensaios sobre arte, moral, história, conhecimento, ilusão e verdade. É aqui que Nietzsche proclama, pela primeira vez, a “morte de Deus” (no famoso aforismo do Louco), esboça a ideia do eterno retorno e apresenta Zaratustra antes de “Assim Falou Zaratustra”. O próprio Nietzsche chamou este livro de “o mais pessoal de todos os meus livros”.",
      "Diferente de um tratado acadêmico, “A Gaia Ciência” é filosofia vivida: alegre, irônica, trágica e afirmativa ao mesmo tempo. Nietzsche convida o leitor a questionar preconceitos morais herdados, a rir das certezas dogmáticas e a dizer “sim” à vida — mesmo diante do niilismo que se abre quando as antigas verdades perdem o sentido."
    ],

    aprendizados: [
      "O que Nietzsche quis dizer com a “morte de Deus” e por que isso importa hoje",
      "A primeira aparição de Zaratustra e os esboços do eterno retorno",
      "Como pensar por aforismos — textos curtos que abrem reflexões profundas",
      "A filosofia da alegria, do riso e da afirmação da vida frente ao niilismo",
      "Uma porta de entrada acessível a uma das obras centrais de Nietzsche"
    ],

    temas: ["Morte de Deus", "Eterno retorno", "Moral", "Arte e conhecimento", "Niilismo", "Aforismos", "Alegria e afirmação da vida"],

    sobreAutor: "Friedrich Nietzsche (1844–1900) foi um dos filósofos mais influentes da história. Conhecido pelo estilo provocador e pela crítica radical à moral tradicional, deixou obras como “Assim Falou Zaratustra”, “Para Além do Bem e do Mal” e “A Genealogia da Moral”."
  },

  {
    titulo: "A Gaia Ciência",
    tipo: "audiobook",
    categoria: "Filosofia",
    acesso: "gratis",
    preco: "",
    imagem: "https://img.youtube.com/vi/5hng5Uc_jBY/maxresdefault.jpg",
    link: "https://youtu.be/5hng5Uc_jBY",
    descricao: "Audiobook de “A Gaia Ciência” (1882), com texto na tela e linguagem adaptada para hoje.",

    autor: "Friedrich Nietzsche",
    ano: "1882",

    detalhes: [
      "Versão em audiobook de “A Gaia Ciência” (Die fröhliche Wissenschaft), de Friedrich Nietzsche — com o texto na tela e a escrita modernizada e simplificada por mim para soar natural hoje, sem perder a força do original.",
      "Publicada em 1882 e ampliada em 1887, a obra reúne centenas de aforismos, poemas, parábolas e pequenos ensaios sobre arte, moral, história, conhecimento, ilusão e verdade. É aqui que Nietzsche proclama, pela primeira vez, a “morte de Deus” (no famoso aforismo do Louco), esboça a ideia do eterno retorno e apresenta Zaratustra antes de “Assim Falou Zaratustra”. O próprio Nietzsche chamou este livro de “o mais pessoal de todos os meus livros”.",
      "Diferente de um tratado acadêmico, “A Gaia Ciência” é filosofia vivida: alegre, irônica, trágica e afirmativa ao mesmo tempo. Nietzsche convida o ouvinte a questionar preconceitos morais herdados, a rir das certezas dogmáticas e a dizer “sim” à vida — mesmo diante do niilismo que se abre quando as antigas verdades perdem o sentido."
    ],

    aprendizados: [
      "O que Nietzsche quis dizer com a “morte de Deus” e por que isso importa hoje",
      "A primeira aparição de Zaratustra e os esboços do eterno retorno",
      "Como pensar por aforismos — textos curtos que abrem reflexões profundas",
      "A filosofia da alegria, do riso e da afirmação da vida frente ao niilismo",
      "Uma porta de entrada acessível a uma das obras centrais de Nietzsche"
    ],

    temas: ["Morte de Deus", "Eterno retorno", "Moral", "Arte e conhecimento", "Niilismo", "Aforismos", "Alegria e afirmação da vida"],

    sobreAutor: "Friedrich Nietzsche (1844–1900) foi um dos filósofos mais influentes da história. Conhecido pelo estilo provocador e pela crítica radical à moral tradicional, deixou obras como “Assim Falou Zaratustra”, “Para Além do Bem e do Mal” e “A Genealogia da Moral”."
  }

];
