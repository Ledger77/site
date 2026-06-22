/* ============================================================================
   📦  SEUS PRODUTOS — edite só este arquivo para mexer no catálogo!
   ============================================================================ */


/* CATEGORIAS — viram os botões de filtro por categoria.
   Adicione novas com o tempo. Ex.: "Ficção", "Filosofia", "História"...        */
const CATEGORIAS = ["Ficção", "Filosofia"];


/* ----------------------------------------------------------------------------
   Cada produto é um bloco { ... }. Para adicionar outro, copie um bloco,
   cole logo abaixo e separe os blocos com vírgula.

   Campos:
   - titulo     -> nome da obra / título do vídeo
   - tipo       -> "audiobook"  ou  "videobook"
   - categoria  -> uma das CATEGORIAS acima. Ex.: "Filosofia"
   - acesso     -> "gratis"     => o botão "▶ Assistir" leva ao vídeo no YouTube
                   "exclusivo"  => o botão "Comprar" leva ao seu link da Hotmart
   - preco      -> deixe ""  quando for grátis.  Quando exclusivo, ex.: "R$ 29,90"
   - imagem     -> a capa. DICA: use a miniatura do seu vídeo do YouTube:
                   https://img.youtube.com/vi/ID_DO_VIDEO/maxresdefault.jpg
                   (o ID é o código depois de "youtu.be/" no link do vídeo)
   - link       -> grátis     => link do vídeo no YouTube
                   exclusivo  => seu link da Hotmart
   ---------------------------------------------------------------------------- */

const PRODUTOS = [

  {
    titulo: "Humano, Demasiado Humano",
    tipo: "audiobook",
    categoria: "Filosofia",
    acesso: "gratis",
    descricao: "Audiobook do clássico de Nietzsche (1878), modernizado e simplificado para hoje. Aforismos que desmontam crenças sobre moral, religião e ciência — um convite a pensar de forma mais crítica e autônoma.",
    preco: "",
    imagem: "https://img.youtube.com/vi/kyKFWEBFe0w/maxresdefault.jpg",
    link: "https://youtu.be/kyKFWEBFe0w"
  }

];
