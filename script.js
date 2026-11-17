/* =====================================================================
   FUTELITE SHOP - O "CEREBRO" DE TODO O SITE (script.js)
   ---------------------------------------------------------------------
   Esse arquivo aqui e quem da "vida" pro site. O HTML so cria os blocos "vazios";
   aqui e onde a gente preenche tudo e diz como cada coisa vai funcionar.

   MAPA/indice/barra de buscar do site (usa o comando Ctrl+F nos titulos pra achar rapido):
     SECAO 0 - Tema claro/escuro
     SECAO 1 - Lista de produtos, categorias e imagens
     SECAO 2 - Memoria do site (carrinho, filtro e busca)
     SECAO 3 - Mostrar produtos e filtros na tela
     SECAO 4 - Carrinho de compras e finalizacao
     SECAO 5 - Login, VIP (quiz) e promocao relampago
     SECAO 6 - Inicializacao (o que rola quando a pagina abre)

   DICIONARIO RAPIDO PRA INICIANTES E QUE ESTA COMECANDO PARA SER FACIL DE ENTENDER:
     - "funcao" (function): um pedaco de codigo com nome, que so roda quando alguem chama (tipo apertar um botao).
     - "const": guarda um valor que NAO muda depois.
     - "let": guarda um valor que PODE mudar depois.
     - "localStorage": tipo uma gaveta do navegador onde o site guarda coisa (tema, carrinho, login) mesmo fechando a aba.
     - "id": o apelido de um elemento no HTML. O codigo usa
       document.getElementById('apelido') pra achar ele.
   ===================================================================== */


// ==========================================
// SECAO 0. TEMA DO SITE (CLARO / ESCURO)
// ==========================================

// Ve se o site ta no tema claro agora.
// Devolve true (sim) ou false (nao), olhando se a tag <html> tem a classe "light".
function temaClaro() { return document.documentElement.classList.contains('light'); }

// Muda o icone do botao de tema:
//   - se o site ta CLARO, mostra a LUA (clicar vai pro escuro);
//   - se ta ESCURO, mostra o SOL (clicar vai pro claro).
function atualizarIconeTema() {
  const b = document.getElementById('btnTema');   // pega o botao no HTML
  if (!b) return;                                  // se nao achar o botao, para por aqui
  b.innerHTML = `<i data-lucide="${temaClaro() ? 'moon' : 'sun'}" class="w-5 h-5"></i>`;
  lucide.createIcons();                            // pede pra biblioteca desenhar o icone de novo
}

// So roda quando o cliente CLICA no botao sol/lua.
// 1) troca a classe "light" (o style.css resolve as cores);
// 2) guarda a escolha no navegador pra lembrar depois;
// 3) troca o icone.
function alternarTema() {
  document.documentElement.classList.toggle('light');
  try { localStorage.setItem('futelite-tema', temaClaro() ? 'claro' : 'escuro'); } catch (e) {}
  atualizarIconeTema();
}


// ==========================================
// SECAO 1. LISTA DE TODOS OS PRODUTOS E CATEGORIAS
// ==========================================

// A "vitrine" da loja: cada linha entre { } e' UM item.
//   id        -> numero unico (nao repete) pra identificar o item
//   nome      -> nome que aparece no card
//   categoria -> usada nos filtros (chuteira, camisa, bola ou treino)
//   preco     -> valor em reais (usa ponto, nao virgula: 499.90)
//   tag       -> etiqueta que fica no cantinho do card
// ATENCAO !!! PRA POR UM PRODUTO NOVO: copia uma linha, usa o proximo id livre e preenche os campos (e depois coloca a imagem, ali embaixo).
const produtos = [
  { id: 1, nome: "Chuteira Puma Future Z 1.3 Instinct Neymar JR", categoria: "chuteira", preco: 499.90, tag: "Edicao Limitada" },
  { id: 2, nome: "Camisa FC Barcelona Home 24/25 Autentica", categoria: "camisa", preco: 359.90, tag: "Lancamento" },
  { id: 3, nome: "Camisa Sao Paulo FC Home I 2026 Pro", categoria: "camisa", preco: 349.90, tag: "Mais Vendido" },
  { id: 4, nome: "Camisa Real Madrid Home 24/25 Autentica", categoria: "camisa", preco: 359.90, tag: "Mais Vendido" },
  { id: 5, nome: "Bola Adidas Copa do Mundo 2026 Trionda", categoria: "bola", preco: 473.90, tag: "Oficial FIFA" },
  { id: 6, nome: "Camisa Selecao Franca I 2026", categoria: "camisa", preco: 349.90, tag: "Lancamento" },
  { id: 7, nome: "Chuteira Nike Air Zoom Mercurial Vapor 16 Elite", categoria: "chuteira", preco: 899.90, tag: "Profissional" },
  { id: 8, nome: "Conjunto de Treino PSG (Jaqueta + Calca)", categoria: "treino", preco: 375.90, tag: "Colecao Treino" },
  { id: 9, nome: "Bola Oficial UEFA Champions League", categoria: "bola", preco: 899.90, tag: "Champions League" },
  { id: 10, nome: "Kit Treino Selecao Brasileira Pro", categoria: "treino", preco: 449.90, tag: "CBF Oficial" },
  { id: 11, nome: "Camisa Arsenal Home 24/25", categoria: "camisa", preco: 349.90, tag: "Lancamento" },
  { id: 12, nome: "Chuteira Adidas Predator Elite FG", categoria: "chuteira", preco: 999.90, tag: "Profissional" },
  { id: 13, nome: "Bola Nike Premier League Flight 2021", categoria: "bola", preco: 599.90, tag: "Oficial FIFA" },
  { id: 14, nome: "Jaqueta Corta-Vento FC Barcelona", categoria: "treino", preco: 419.90, tag: "Colecao Treino" },
  { id: 15, nome: "Camisa Manchester City Home 24/25", categoria: "camisa", preco: 359.90, tag: "Mais Vendido" },
  { id: 16, nome: "Chuteira Nike Phantom GX II Elite", categoria: "chuteira", preco: 849.90, tag: "Destaque" },
  { id: 17, nome: "Bola Puma La Liga Orbita Pro", categoria: "bola", preco: 429.90, tag: "Oficial" },
  { id: 18, nome: "Calca de Treino Jogger Nike Pro", categoria: "treino", preco: 279.90, tag: "Oferta VIP" },
  { id: 19, nome: "Camisa Bayern de Munique I 24/25", categoria: "camisa", preco: 339.90, tag: "Original" },
  { id: 20, nome: "Chuteira Mizuno Morelia Neo IV Japan", categoria: "chuteira", preco: 1199.90, tag: "Edicao Limitada" },
  { id: 21, nome: "Bola Molten Europa League Match", categoria: "bola", preco: 389.90, tag: "Oficial" },
  { id: 22, nome: "Camisa Mexico Third (3) 2026 Adidas Torcedor Masculina", categoria: "treino", preco: 159.90, tag: "Promocao" },
  { id: 23, nome: "Camisa Juventus Home 24/25", categoria: "camisa", preco: 349.90, tag: "Lancamento" },
  { id: 24, nome: "Chuteira Puma King Ultimate FG", categoria: "chuteira", preco: 749.90, tag: "Profissional" },
  { id: 25, nome: "Bola Penalty S11 Pro Campo", categoria: "bola", preco: 299.90, tag: "Nacional" },
  { id: 26, nome: "Agasalho Completo Real Madrid Travel", categoria: "treino", preco: 599.90, tag: "Exclusivo" },
  { id: 27, nome: "Camisa Milan Home 24/25", categoria: "camisa", preco: 339.90, tag: "Mais Vendido" },
  { id: 28, nome: "Chuteira Nike Tiempo Legend 10 Elite", categoria: "chuteira", preco: 829.90, tag: "Destaque" },
  { id: 29, nome: "Bola Umbro Neo Swerve Pro", categoria: "bola", preco: 249.90, tag: "Oferta VIP" },
  { id: 30, nome: "Shorts Nike Dri-FIT Fast Masculino Preto", categoria: "treino", preco: 129.90, tag: "Basico" },
  { id: 31, nome: "Camisa Liverpool Home 24/25", categoria: "camisa", preco: 359.90, tag: "Lancamento" },
  { id: 32, nome: "Chuteira Under Armour Magnetico Pro", categoria: "chuteira", preco: 699.90, tag: "Importada" },
  { id: 33, nome: "Bola Select Super FIFA Quality", categoria: "bola", preco: 319.90, tag: "Oficial FIFA" },
  { id: 34, nome: "Blusao de Frio Nike Club Fleece", categoria: "treino", preco: 329.90, tag: "Colecao Inverno" },
  { id: 35, nome: "Camisa Borussia Dortmund Home 24/25", categoria: "camisa", preco: 329.90, tag: "Original" },
  { id: 36, nome: "Chuteira Skechers Razor FG", categoria: "chuteira", preco: 649.90, tag: "Novo" },
  { id: 37, nome: "Bola Mikasa FT-5 Futevolei / Campo", categoria: "bola", preco: 289.90, tag: "Mais Vendido" },
  { id: 38, nome: "Colete de Treino Dupla Face Kit 5un", categoria: "treino", preco: 189.90, tag: "Equipamento" },
  { id: 39, nome: "Camisa Inter de Milao Home 24/25", categoria: "camisa", preco: 349.90, tag: "Destaque" },
  { id: 40, nome: "Chuteira Adidas Copa Pure II Elite", categoria: "chuteira", preco: 899.90, tag: "Profissional" },
  { id: 41, nome: "Bola Topper Slate Pro Campo", categoria: "bola", preco: 219.90, tag: "Nacional" },
  { id: 42, nome: "Corta-Vento Puma Football Vent", categoria: "treino", preco: 379.90, tag: "Exclusivo" },
  { id: 43, nome: "Camisa Selecao Argentina I 2026", categoria: "camisa", preco: 369.90, tag: "Campea do Mundo" },
  { id: 44, nome: "Chuteira Mizuno Alpha Japan Branco EU 40", categoria: "chuteira", preco: 1099.90, tag: "Edicao Limitada" },
  { id: 45, nome: "Bola Kappa Campo Match", categoria: "bola", preco: 199.90, tag: "Oferta VIP" },
  { id: 46, nome: "Kit 2 Meioes Trussox Futebol Jogador Profissional", categoria: "treino", preco: 89.90, tag: "Essencial" },
  { id: 47, nome: "Camisa Portugal II 2026 Puma Torcedor Masculina Verde Agua", categoria: "camisa", preco: 349.90, tag: "Lancamento" },
  { id: 48, nome: "Chuteira Society Adulto Umbro Adamant Master Class Pro Bump Kintsugi", categoria: "chuteira", preco: 549.90, tag: "Classica" },
  { id: 49, nome: "Camisa Ajax Home 24/25", categoria: "camisa", preco: 329.90, tag: "Original" },
  { id: 50, nome: "Chuteira Penalty Brasil 70 Futsal Pro", categoria: "chuteira", preco: 299.90, tag: "Futsal" },
  { id: 51, nome: "Chuteira Futsal Umbro Pro Challenge Dragon Year Unissex", categoria: "chuteira", preco: 679.89, tag: "Classica" }
];

// Lista dos botoes de filtro. Cada par e [codigo interno, texto do botao].
// O codigo "all" quer dizer "mostrar tudo".
const categorias = [["all","Todos"],["chuteira","Chuteiras"],["camisa","Camisas"],["bola","Bolas"],["treino","Treino"]];

// Cada categoria tem um emoji. So' aparece na imagem de backup (veja ali embaixo).
// O emogi serve para aparecer no card para que nao fique vazio caso alguma imagem de prblema
const emojis = { chuteira: "👟", camisa: "👕", bola: "⚽", treino: "🧥" };

// Links das fotos. A chave e o ID do item e o valor e o link da imagem.
// Exemplo: a foto do produto 1 ta no link depois de "1:".
// Se faltar link aqui, o site joga uma imagem reserva sozinho (essa "imgem que ele joga seria o emoji").
const imagens = {
  1: "https://acdn-us.mitiendanube.com/stores/001/063/592/products/bd800ff01-ceb3ef7e61622e406916875797805186-1024-1024.webp",
  2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV227IQ3JWDODigF_vcRinkNd7Dd0gNFirUWcZdZNNmQ&s=10",
  3: "https://acdn-us.mitiendanube.com/stores/001/055/309/products/comprar-camisa-titular-do-sao-paulo-new-balance-2026-2027-home-1-casa-principal-branca-preta-luciano-lucas-jogador-masculina-profissional-original-oficial-loja-online-frete-gratis-6-329a1cba0644f23edb17786960238545-1024-1024.webp",
  4: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLeu4PKr4ynY9nYWS_oWU3gkGinEmYDbsDz1204pZ4RIU-3c5FpEKqXio&s=10",
  5: "https://trilhaesportes.fbitsstatic.net/img/p/bola-campo-adidas-copa-do-mundo-fifa-2026-trionda-training-74931/304784-2.jpg?w=1000&h=1000&v=202604251012",
  6: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh3Kx-1tzExbdP3U3dhldVPsYoD1WT8iI0gdTqHZ5UCA&s=10",
  7: "https://www.futbolemotion.com/imagesarticulos/232385/750/bota-nike-air-zoom-mercurial-vapor-16-elite-fg-black-black-deep-jungle-0.webp",
  8: "https://maltaesportes.com.br/wp-content/uploads/2024/06/720285c5-Photoroom-1.png",
  9: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGk34F0j9ZyVJLwwfPGJWddKEseHOqxW4WVnu06sdGvT2qhzWV43GKVolf&s=10",
  10: "https://dcdn-us.mitiendanube.com/stores/002/822/115/products/4c440365-144f-481e-bf36-54ea473e45211-43272f9d822ebce67e16755314011356-1024-1024.webp",
  11: "https://acdn-us.mitiendanube.com/stores/001/854/034/products/85f05d74-b64517cbda247f3aa917159913200063-640-0.webp",
  12: "https://assets.adidas.com/images/w_500,f_auto,q_auto/83a56bc787fa4b08aebabe0f23d64dbd_9366/Chuteira_Predator_Elite_Campo_Vermelho_ID3882_HM1.jpg",
  13: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2i6jARs9tlMKv2J0qiu851ULcptcc7Gtxx8iUn4djldflnnsQYSyKrJk&s=10",
  14: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStIK8-qf56cil1pc_q74e4vKwpvYhEiR5FVMb0o-NQYA&s=10",
  15: "https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/775075/01/dt04/fnd/BRA/fmt/png",
  16: "https://imgnike-a.akamaihd.net/1300x1300/029016CTA12.jpg",
  17: "https://http2.mlstatic.com/D_Q_NP_2X_662963-MLB118281059020_102026-P.webp",
  18: "https://imgcentauro-a.akamaihd.net/1024x1024/99565402A2.jpg",
  19: "https://dasports.com.br/cdn/shop/files/b25808e0_5915cd59-387e-473e-9ad3-66dc5ba8dbc3.jpg?v=1763953679&width=1000",
  20: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZMi5R2b9lim3Ds1xkT9KHkHqWXDqPT-_WET8lL2_6Nw&s=10",
  21: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWWoh24MPedewfPhMrcWD7pr2I2R86bjnqDRSFnmfy7w&s=10",
  22: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh6u_lnX32HXUQIjo9hxBphaTdI0wzvnzZtZEaUOu_eA&s=10",
  23: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwj12Zv7tZaECdeIPJm1UKjPFEOwA-PtSkPvKFebZv8Q&s",
  24: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoub6a57Mow7Sa92i1O1oKX71eRkNDUJbjLVsbu-V9OQ&s",
  25: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7oOkTCePveowARmopXBSct-t9eajlQQIuHo-013G-Ew&s=10",
  26: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrOB8nNLEE823gIm0gMpAHJsZnCSBL9pE_njEA_mbNQ&s=10",
  27: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMPMPpF8Sn1VS5fJ45DbEKQHa9yZLbLbC_wqDO9l3ETA&s=10",
  28: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiik2FbLYRCAX3spJhNRz3nw5AHwQmtiHY8JMz0IuPIA&s=10",
  29: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyzaFoeoVGUocjaSKfpyZi2g5HuTD0S92mXlFtE5jplg&s",
  30: "https://imgcentauro-a.akamaihd.net/1024x1024/98831502A5.jpg",
  31: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxHCTfydg8t7D5YPmGLyPT9R1otsVuwIs1D_2lTp0dmg&s",
  32: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnrd8Isi6MnwZFxrRLDR6zbPquEsYbkPvU7dI2ReKcpg&s",
  33: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqPwHyaN1GTzmZDWwfvu-Kriy2hA1vLQvKR4fuwuavWA&s=10",
  34: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHQWbmIesPSG3FZKinO5qBPdMTSO0a9DBblhTEJT8VtA&s",
  35: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ3QGDwbqvjiulUYstl--uh0sA1lRVxTdAXwrEpKnhbg&s",
  36: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBiGr4L_9hZADUMsuywgzNwxuas0BNZwZ9lRF1rYA-vA&s=10",
  37: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWK-YhEQGnOp-SfgwlSLYH9ZoGHoRulwdALvRiK3D7A&s",
  38: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhfWF6eyJtbBjCIqpIIlC5MXgDgGNAVD6byuJJ8DLTcw&s=10",
  39: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZeUA8Z4a7-b5mJTGXOjZ6yM4A5wIfhNoaLvpkFxnq0w&s=10",
  40: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjjOm7FbsXrueiyKaMq5_fPocRBmsI8Yd4guDyaHNVnQ&s=10",
  41: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqQu8hAytsb8HD3KrrwoIWiPSAiYUMkYv0dW7JK9o9vQ&s=10",
  42: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe4_6T3Upq2sjARUICvuF5a3t15WF84N0s_L2qIH7UHA&s=10",
  43: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjPUkWw73l8GaxXZHGc_Rxf-YKNAsXHI7rOjvYCTZhkA&s=10",
  44: "https://www.mizuno.com.br/arquivos/pdp-morelia-alpha-03.png",
  45: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVlNf30fJ8GQfO_qe_0J1KvclXvDORT22vi4UA1Lexlg&s",
  46: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXPQ0Fy5kmUp_dTAag42RwFUpXlpN-b5QYUg_9p3mIcQ&s",
  47: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA83cqJAjRV9xTotnp7qvtg6iP_wTfmTdvex1nblduKg&s=10",
  48: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQS7hf8P2tfW4DHgNOd-0tNWR3Skmy1wG1uuJ8VUi-_VjulpMHqqPhziXM8zja7cWomEpJaq1Fuj_2Uoa8weCsb9Dv7fLkFyHA_2IVw3swS580rXKJMkzErlsSffyqmr6DhxWV2zoE&usqp=CAc",
  49: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfzj9ISwdGX4bTCFJCWiAfcnKvdb79uY5dzMB17XdmuA&s=10",
  50: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTepbTq9_OGdyOaadAM7HV33hR0KR54BLJQccYom9SeGw&s=10",
  51: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZsIsa22rE0bFfUYKDnZpMkEYZT9l4C-iR8SPpOeiCkw&s=10"
};

// Aqui cada produto ganha dois campos novos:
//   p.fallback -> imagem reserva (um fundo escuro com o emoji da categoria) (que e oque falmos antes),
//                 usada se a foto original nao carregar (link quebrado, sem net, etc.)
//   p.img      -> a imagem que vai pro ar: a foto da lista ali em cima
//                 ou, se nao tiver, a imagem reserva.
produtos.forEach(p => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#1e293b"/><text x="200" y="185" font-size="120" text-anchor="middle">${emojis[p.categoria]}</text></svg>`;
  p.fallback = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
  p.img = imagens[p.id] || p.fallback;
});

// Joga a foto do produto n° 1 no banner grandao (a secao "hero" do HTML).
// O "onerror" e' o plano B: se a foto der erro, troca pela imagem reserva.
const hero = document.getElementById('imgHero');
if (hero) {
  hero.onerror = () => { hero.onerror = null; hero.src = produtos[0].fallback; };
  hero.src = produtos[0].img;
}


// ==========================================
// SECAO 2. ESTADO QUE O SITE GUARDA (CARRINHO, FILTRO, BUSCA)
// ==========================================
// "Estado" = o que o site precisa lembrar enquanto o cliente navega.

let carrinho = [];           // itens que o cliente jogou no carrinho
let categoriaAtual = 'all';   // categoria escolhida no filtro ('all' = todas)
let termoBusca = '';          // o texto digitado na busca

// Quando o site abre, tenta PUXAR de volta o carrinho salvo da outra visita.
// So guarda id + quantidade; aqui monta os itens inteiros de novo
// cacando os produtos pelo id. Se der ruim, comeca vazio.
try {
  const salvo = JSON.parse(localStorage.getItem('futelite-carrinho') || '[]');
  carrinho = salvo.map(s => {
    const p = produtos.find(x => x.id === s.id);
    return p ? { ...p, qtd: s.qtd } : null;
  }).filter(Boolean);
} catch (e) { carrinho = []; }

// Guarda o carrinho no navegador (so' id e quantidade, pra gastar menos espaco).
function salvarCarrinho() {
  try { localStorage.setItem('futelite-carrinho', JSON.stringify(carrinho.map(c => ({ id: c.id, qtd: c.qtd })))); } catch (e) {}
}

// Formata um numero como dinheiro do brasil (em poucas palavras faz ele virar o REAL moeda barsileira).
// Exemplo: 499.9 vira "R$ 499,90" (duas casas e virgula).
function formatarPreco(v) { return `R$ ${v.toFixed(2).replace('.', ',')}`; }


// ==========================================
// SECAO 3. DESENHAR PRODUTOS E FILTROS NA TELA
// ==========================================

// Calcula o preco que o cliente paga de verdade.
// Se for VIP, aplica desconto (20%). Se nao, manda o preco cheio.
function precoAtual(p) {
  let val = p.preco;
  if (ler('futelite-vip', false)) val *= (1 - DESCONTO);
  return val;
}

// Monta o HTML do preco dentro do card:
//   - VIP: preco antigo riscado + preco novo em dourado;
//   - nao VIP: so' o preco normal em branco.
function htmlPreco(p) {

    const vip = ler('futelite-vip', false);
  if (vip) {
    return `<div class="flex items-center gap-2"><span class="text-slate-500 line-through text-xs">${formatarPreco(p.preco)}</span><span class="text-amber-500 font-extrabold text-lg">${formatarPreco(precoAtual(p))}</span></div>`;
  }
  return `<span class="font-extrabold text-white text-lg">${formatarPreco(p.preco)}</span>`;
}

// Desenha os botoes de categoria (Todos, Chuteiras, Camisas...).
// O botao da categoria ATIVA fica amarelo, os outros ficam cinza.
function renderFiltros() {
  const el = document.getElementById('botoesFiltro');
  if (!el) return;
  el.innerHTML = categorias.map(([cat, nome]) => {
    const ativo = cat === categoriaAtual;
    const cls = ativo ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 font-medium border border-slate-700';
    return `<button onclick="filtrar('${cat}')" class="${cls} px-5 py-2 rounded-full text-sm whitespace-nowrap">${nome}</button>`;
  }).join('');
}

// Monta a grade de produtos na tela, olhando o filtro e a pesquisa.
function mostrarProdutos() {
  // 1) Pega so' os produtos que batem nas duas regras:
  //    - estar na categoria escolhida (ou "all" = todas);
  //    - ter o texto da busca no nome.
  const lista = produtos.filter(p =>
    (categoriaAtual === 'all' || p.categoria === categoriaAtual) &&
    p.nome.toLowerCase().includes(termoBusca));
  const grid = document.getElementById('gridProdutos');
  if (!grid) return;

  // 2) Se nao achar nada, mostra um aviso simpatico e encerra.
  if (!lista.length) {
    grid.innerHTML = `<p class="col-span-full text-center text-slate-500 py-8">Nenhum produto foi encontrado.</p>`;
    return;
  }

  // 3) Cria um card pra cada item (foto, tag, nome, categoria,
  //    preco e botao de por no carrinho) e joga na grade.
  grid.innerHTML = lista.map(p => `
    <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col group">
      <div class="relative overflow-hidden h-52 bg-slate-800">
        <span class="absolute top-3 left-3 z-10 bg-amber-500/90 text-slate-950 font-black text-xs px-2.5 py-1 rounded-md">${p.tag}</span>
        <img src="${p.img}" onerror="this.onerror=null;this.src='${p.fallback}'" alt="${p.nome}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
      </div>
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="font-bold text-white text-base leading-snug">${p.nome}</h3>
          <p class="text-xs text-slate-400 mt-1 capitalize">${p.categoria}</p>
        </div>
        <div class="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div><span class="text-xs text-slate-400 block">Preco</span>${htmlPreco(p)}</div>
          <button onclick="adicionarAoCarrinho(${p.id})" aria-label="Adicionar ao carrinho" class="bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 p-2.5 rounded-xl transition">
            <i data-lucide="shopping-cart" class="w-5 h-5"></i>
          </button>
        </div>
      </div>
    </div>`).join('');

  // 4) Pede pra biblioteca desenhar os icones dos cards novos.
  lucide.createIcons();
}

// Roda quando o cliente clica num botao de categoria:
// guarda a categoria escolhida e desenha de novo os botoes e os produtos.
function filtrar(cat) { categoriaAtual = cat; renderFiltros(); mostrarProdutos(); }


// ==========================================
// SECAO 4. CARRINHO DE COMPRAS E CONCLUSAO
// ==========================================

// Joga um produto no carrinho (pelo ID).
// Se ja' tiver la', soma +1 na quantidade; senao, coloca com quantidade 1.
function adicionarAoCarrinho(id) {
  const existente = carrinho.find(c => c.id === id);
  if (existente) existente.qtd++;
  else carrinho.push({ ...produtos.find(p => p.id === id), qtd: 1 });
  atualizarCarrinho();
}

// Atalho do botao "Comprar Agora": coloca no carrinho e ja' abre o painel.
function adicionarEAbrir(id) { adicionarAoCarrinho(id); verCarrinho(); }

// Muda a quantidade de um item. "delta" e' +1 (botao +) ou -1 (botao -).
// Se zerar a quantidade, tira o item do carrinho.
function alterarQtd(id, delta) {
  const item = carrinho.find(c => c.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) carrinho = carrinho.filter(c => c.id !== id);
  atualizarCarrinho();
}

// Tira um item do carrinho na hora (botao da lixeira).
function removerItem(id) { carrinho = carrinho.filter(c => c.id !== id); atualizarCarrinho(); }

// A funcao mais importante do carrinho: redesenha tudo que o cliente ta vendo.
// Roda toda vez que mexe em alguma coisa (por, tirar, mudar quantidade).
function atualizarCarrinho() {
  const lista = document.getElementById('listaCarrinho');
  const qtdCarrinhoEl = document.getElementById('qtdCarrinho');

  // Atualiza o numero na bolinha do botao do carrinho (soma de todas as quantidades).
  if (qtdCarrinhoEl) qtdCarrinhoEl.innerText = carrinho.reduce((a, i) => a + i.qtd, 0);
  if (!lista) return;

  // Carrinho vazio: mostra um aviso. Com itens: monta uma linha pra cada um.
  if (!carrinho.length) {
    lista.innerHTML = `<div class="text-center py-12 text-slate-500"><i data-lucide="shopping-bag" class="w-12 h-12 mx-auto mb-2 opacity-40"></i><p>Seu carrinho esta' vazio.</p></div>`;
  } else {
    lista.innerHTML = carrinho.map(item => `
      <div class="flex items-center gap-4 bg-slate-800/50 p-3 rounded-xl border border-slate-800">
        <img src="${item.img}" onerror="this.onerror=null;this.src='${item.fallback}'" alt="${item.nome}" class="w-16 h-16 object-cover rounded-lg">
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold text-white truncate">${item.nome}</h4>
          <p class="text-xs text-amber-500 font-bold mt-1">${formatarPreco(precoAtual(item))}</p>
          <div class="flex items-center gap-2 mt-2">
            <button onclick="alterarQtd(${item.id}, -1)" class="bg-slate-700 hover:bg-slate-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">-</button>
            <span class="text-xs font-bold">${item.qtd}</span>
            <button onclick="alterarQtd(${item.id}, 1)" class="bg-slate-700 hover:bg-slate-600 text-white w-6 h-6 rounded flex items-center justify-center text-xs">+</button>
          </div>
        </div>
        <button onclick="removerItem(${item.id})" aria-label="Remover" class="text-slate-500 hover:text-red-400"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>`).join('');
  }

  // Soma o total: pra cada item, preco (ja' com desconto VIP) x quantidade.
  const total = carrinho.reduce((a, i) => a + precoAtual(i) * i.qtd, 0);
  const sub = document.getElementById('subtotal');
  const tot = document.getElementById('totalFinal');
  if (sub) sub.innerText = formatarPreco(total);
  if (tot) tot.innerText = formatarPreco(total);

  salvarCarrinho();     // guarda o carrinho no navegador
  lucide.createIcons(); // desenha os icones novos (lixeira, etc.)
}

// Abre o painel do carrinho se tiver fechado, e fecha se tiver aberto.
// ("toggle" = liga/desliga a classe "hidden", que esconde o painel.)
function verCarrinho() { const p = document.getElementById('painelCarrinho'); if (p) p.classList.toggle('hidden'); }

// Botao "Finalizar Pedido". Avisa se o carrinho ta vazio; se tiver coisa,
// confirma o pedido, limpa o carrinho e fecha o painel.
// (Obs: e' so' simulacao, nao tem pagamento real aqui.)
function finalizarCompra() {
  if (!carrinho.length) { alert("Adicione produtos ao carrinho primeiro!"); return; }
  alert("Pedido realizado com sucesso!");
  carrinho = [];
  atualizarCarrinho();
  verCarrinho();
}

// PESQUISA: toda vez que o cliente digita uma letra no campo de busca,
// guardamos o texto (em minusculo e sem espaco nas pontas)
// e desenhamos de novo os produtos ja' filtrados.
const campoBuscaEl = document.getElementById('campoBusca');
if (campoBuscaEl) {
  campoBuscaEl.addEventListener('input', e => {
    termoBusca = e.target.value.toLowerCase().trim();
    mostrarProdutos();
  });
}


// ==========================================
// SECAO 5. LOGIN, VIP E PROMOCAO RELAMPAGO
// ==========================================

// ---------- 5.1 CONFIGURACOES (mexe aqui pra ajustar as regras) ----------
const DESCONTO = 0.20;        // desconto VIP: 0.20 = 20%
const ACERTOS_MINIMOS = 4;    // quantas certas o quiz pede pra virar VIP
const PROMO_MINUTOS = 1;      // tempo da promocao relampago, em minutos

// ---------- 5.2 PERGUNTAS DO QUIZ ----------
// q = a pergunta | o = as 4 opcoes | c = posicao da resposta CERTA.
// Cuidado: a contagem comeca no ZERO. c: 2 quer dizer a TERCEIRA opcao.
const perguntas = [
  { q: "Quantos jogadores cada equipe coloca em campo (com o goleiro)?", o: ["9", "10", "11", "12"], c: 2 },
  { q: "Qual pais conquistou a Copa do Mundo de 2022?", o: ["Franca", "Argentina", "Brasil", "Croacia"], c: 1 },
  { q: "Quanto dura uma partida, sem prorrogacao?", o: ["80 minutos", "90 minutos", "100 minutos", "120 minutos"], c: 1 },
  { q: "Qual pais possui mais titulos da Copa do Mundo masculina?", o: ["Alemanha", "Italia", "Brasil", "Argentina"], c: 2 },
  { q: "O que acontece quando um jogador recebe cartao vermelho?", o: ["E' expulso e o time joga com um a menos", "Cobra um penalti", "E' so' advertido", "Troca de posicao"], c: 0 }
];

// ---------- 5.3 ESTILOS QUE REAPROVEITAMOS ----------
// Textos de classes do Tailwind guardados em nomes curtos pra nao ficar repetindo.
const BTN = "w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-lg transition";                                          // botao dourado
const BTN2 = "w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 px-4 rounded-lg transition text-left";                          // botao cinza (opcoes do quiz)
const CAMPO = "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-amber-500"; // campos de formulario

// ---------- 5.4 FERRAMENTAS DE MEMORIA DO NAVEGADOR ----------
// ler(chave, padrao): busca algo guardado no navegador. Se nao tiver
//   (ou der erro), devolve o valor "padrao" que vc escolheu.
const ler = (k, padrao) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? padrao; } catch (e) { return padrao; } };

// gravar(chave, valor): guarda algo no navegador.
const gravar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

// esc(texto): ferramenta de SEGURANCA. Troca caracteres especiais (< > & " ')
// por versoes seguras. Assim, se alguem digitar codigo malicioso no
// nome/e-mail, aparece como texto normal e NAO roda.
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- 5.5 ESTADO INICIAL DO LOGIN E DA PROMOCAO ----------
let usuario = ler('futelite-usuario', null);   // quem ta logado (ou null se ninguem)
let promoFim = ler('futelite-promo-fim', null); // a hora em que a promocao acaba

// Se nao tem promocao rodando (primeira vez) OU ela ja' acabou,
// abre uma nova: marca o fim pra daqui a 30 min e zera o VIP.
if (!promoFim || promoFim < Date.now()) {
  promoFim = Date.now() + (PROMO_MINUTOS * 60 * 1000);
  gravar('futelite-promo-fim', promoFim);
  gravar('futelite-vip', false);
}
// ---------- 5.6 JANELA FLUTUANTE (MODAL) ----------

// Abre a janela e joga nela o HTML que vc mandar.
function abrirModal(html) {
  const m = document.getElementById('modal');
  const c = document.getElementById('modalConteudo');
  if (m && c) {
    c.innerHTML = html;          // coloca o conteudo
    m.classList.remove('hidden'); // deixa a janela visivel
    lucide.createIcons();
  }
}

// Fecha a janela (esconde de novo).
function fecharModal() {
  const m = document.getElementById('modal');
  if (m) m.classList.add('hidden');
}

// ---------- 5.7 CONTA DO USUARIO ----------

// Botao "Minha Conta". O que aparece depende de a pessoa tar logada:
//   - logada: mostra nome, e-mail, status VIP e botao de sair;
//   - nao logada: mostra o formulario de login.
function abrirConta() {
  if (usuario) {
    const vip = ler('futelite-vip', false);
    abrirModal(`
      <div class="space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 class="text-lg font-bold text-white flex items-center gap-2"><i data-lucide="user-check" class="text-amber-500"></i> Minha Conta</h3>
          <button onclick="fecharModal()" class="text-slate-400 hover:text-white"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <div class="bg-slate-800/50 p-4 rounded-xl border border-slate-800 space-y-2">
          <p class="text-sm text-slate-300"><strong>Nome:</strong> ${esc(usuario.nome)}</p>
          <p class="text-sm text-slate-300"><strong>E-mail:</strong> ${esc(usuario.email)}</p>
          <p class="text-sm"><strong>Status VIP:</strong> <span class="${vip ? 'text-emerald-400 font-bold' : 'text-amber-500'}">${vip ? 'Ativo (20% OFF)' : 'Inativo'}</span></p>
        </div>
        ${!vip ? `<button onclick="participarPromo()" class="${BTN}">Tornar-se Membro VIP (Quiz)</button>` : ''}
        <button onclick="sairConta()" class="w-full bg-slate-800 hover:bg-slate-700 text-red-400 font-bold py-2.5 rounded-lg transition">Sair da Conta</button>
      </div>
    `);
  } else {
    abrirModal(`
      <div class="space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 class="text-lg font-bold text-white flex items-center gap-2"><i data-lucide="log-in" class="text-amber-500"></i> Entrar na FutElite</h3>
          <button onclick="fecharModal()" class="text-slate-400 hover:text-white"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <form onsubmit="fazerLogin(event)" class="space-y-3">
          <div><label class="block text-xs text-slate-400 mb-1">E-mail</label><input type="email" id="loginEmail" required class="${CAMPO}"></div>
          <div><label class="block text-xs text-slate-400 mb-1">Senha</label><input type="password" id="loginSenha" required class="${CAMPO}"></div>
          <button type="submit" class="${BTN} mt-2">Entrar</button>
        </form>
      </div>
    `);
  }
}

// Roda quando o cliente manda o formulario de login.
// IMPORTANTE: esse login e' so' de DEMONSTRACAO. Ele aceita qualquer e-mail/senha,
// nao checa a senha e pega o pedaco do e-mail antes do "@" como nome.
// Um login de verdade precisaria de um servidor (back-end).
function fazerLogin(e) {
  e.preventDefault(); // trava o recarregamento da pagina ao enviar o form
  const email = document.getElementById('loginEmail').value.trim();
  usuario = { nome: email.split('@')[0], email };
  gravar('futelite-usuario', usuario);
  atualizarRotuloConta();
  fecharModal();
  mostrarProdutos();
}

// Botao "Sair da Conta": esquece o usuario e atualiza a tela.
function sairConta() {
  usuario = null;
  localStorage.removeItem('futelite-usuario');
  atualizarRotuloConta();
  fecharModal();
  mostrarProdutos();
}

// Troca o texto do botao do topo:
// mostra o nome do cliente se tiver logado, ou "Minha Conta" se nao.
function atualizarRotuloConta() {
  const rotulo = document.getElementById('rotuloConta');
  if (rotulo) rotulo.innerText = usuario ? usuario.nome : "Minha Conta";
}

// ---------- 5.8 QUIZ PRA VIRAR VIP ----------

let indiceQuiz = 0;   // em qual pergunta o cliente ta (comeca no 0 = primeira)
let acertosQuiz = 0;  // quantas ja' acertou

// Comeca (ou recomeca) o quiz. Se a pessoa ja' e' VIP, so' avisa e fecha.
function participarPromo() {
  if (ler('futelite-vip', false)) {
    alert("Voce ja possui o status VIP ativo com 20% de desconto em todo o site!");
    fecharModal();
    return;
  }
  indiceQuiz = 0;
  acertosQuiz = 0;
  proximaPerguntaQuiz();
}

// Mostra a PROXIMA pergunta. Se acabou as perguntas, mostra o placar.
function proximaPerguntaQuiz() {

  // CASO 1: acabaram as perguntas -> mostra aprovado ou reprovado.
  if (indiceQuiz >= perguntas.length) {
    const passou = acertosQuiz >= ACERTOS_MINIMOS;
    if (passou) {
      // Passou: liga o VIP e mostra a tela de parabens.
      gravar('futelite-vip', true);
      abrirModal(`
        <div class="text-center space-y-4 py-4">
          <i data-lucide="award" class="w-16 h-16 text-amber-500 mx-auto"></i>
          <h3 class="text-xl font-extrabold text-white">Parabens, Craque!</h3>
          <p class="text-sm text-slate-300">Voce acertou ${acertosQuiz} de ${perguntas.length} questoes e desbloqueou o status **VIP** com 20% de desconto em todos os produtos!</p>
          <button onclick="fecharModal(); mostrarProdutos();" class="${BTN}">Aproveitar Descontos</button>
        </div>
      `);
    } else {
      // Nao passou: mostra quantos acertou e chama pra tentar de novo.
      abrirModal(`
        <div class="text-center space-y-4 py-4">
          <i data-lucide="alert-circle" class="w-16 h-16 text-red-400 mx-auto"></i>
          <h3 class="text-xl font-extrabold text-white">Quase la'!</h3>
          <p class="text-sm text-slate-300">Voce acertou ${acertosQuiz} de ${perguntas.length}. Eram necessarios pelo menos ${ACERTOS_MINIMOS} acertos para garantir o VIP.</p>
          <button onclick="participarPromo()" class="${BTN}">Tentar Novamente</button>
        </div>
      `);
    }
    return; // corta a funcao aqui
  }

  // CASO 2: ainda tem pergunta -> mostra a pergunta da vez com as opcoes.
  const p = perguntas[indiceQuiz];
  abrirModal(`
    <div class="space-y-4">
      <div class="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-bold text-amber-500">
        <span>QUESTAO ${indiceQuiz + 1} DE ${perguntas.length}</span>
        <span>Acertos: ${acertosQuiz}</span>
      </div>
      <h3 class="font-bold text-white text-base">${esc(p.q)}</h3>
      <div class="space-y-2">
        ${p.o.map((opcao, i) => `<button onclick="responderQuiz(${i})" class="${BTN2}">${esc(opcao)}</button>`).join('')}
      </div>
    </div>
  `);
}

// Roda quando o cliente clica numa opcao. "escolha" e' a posicao que ele clicou.
// Se bater com a posicao certa (c), soma um ponto. Depois vai pra proxima.
function responderQuiz(escolha) {
  if (escolha === perguntas[indiceQuiz].c) acertosQuiz++;
  indiceQuiz++;
  proximaPerguntaQuiz();
}

// ---------- 5.9 CRONOMETRO DA PROMOCAO ----------

// Roda todo segundo (veja a Secao 6). Ve quanto tempo falta e:
//   - se acabou: esconde o banner;
//   - se nao: mostra o banner e escreve o relogio no jeito MM:SS.
function atualizarCronometro() {
  const agora = Date.now();          // hora de agora
  const restante = promoFim - agora;   // quanto falta (em milissegundos)
  const banner = document.getElementById('bannerPromo');
  const relogio = document.getElementById('contagem');

  // Acabou o tempo: esconde o banner e para.
  if (restante <= 0) {
    if (banner) banner.classList.add('hidden');
    return;
  }

  // Ainda tem tempo: garante que o banner ta aparecendo.
  if (banner) banner.classList.remove('hidden');

  // Transforma milissegundos em minutos e segundos.
  const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((restante % (1000 * 60)) / 1000);

  // padStart(2, '0') deixa sempre com dois digitos (ex.: 5 vira "05").
  if (relogio) {
    relogio.innerText = `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  }
}

// ---------- 5.10 ASSISTENTE (NOVO) ----------
// ATENCAO: este assistente foi feito por uma IA (Claude).
// Eu quis a versao mais simples possivel: NAO e IA de verdade,
// ele responde por palavras-chave.
// Pra ensinar algo novo, copie um "if (t.includes('palavra')) return 'resposta';".

// Abre/fecha o chat. Na primeira abertura, manda um oi.
function alternarAssistente() {
  const j = document.getElementById('janelaAssistente');
  j.classList.toggle('hidden');
  const msgs = document.getElementById('msgsAssistente');
  if (!j.classList.contains('hidden') && !msgs.children.length) {
    addMsg("Oi! Pergunte sobre chuteiras, camisas, bolas, treino, VIP ou carrinho.", 'bot');
  }
}

// Escreve uma mensagem na tela (quem = 'bot' ou 'eu'). Usa textContent por seguranca.
function addMsg(texto, quem) {
  const msgs = document.getElementById('msgsAssistente');
  const d = document.createElement('div');
  d.textContent = texto;
  d.className = quem === 'eu'
    ? 'bg-amber-500 text-slate-950 px-3 py-2 rounded-xl ml-8'
    : 'bg-slate-800 text-slate-200 px-3 py-2 rounded-xl mr-8';
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

// O "cerebro": olha as palavras da pergunta e escolhe a resposta.
function responderAssistente(pergunta) {
  const t = pergunta.toLowerCase();

  // Categorias (compara so as 4 primeiras letras: chut, cami, bola, trei).
  for (const [cat, nome] of categorias) {
    if (cat !== 'all' && t.includes(nome.toLowerCase().slice(0, 4))) {
      const precos = produtos.filter(p => p.categoria === cat).map(p => precoAtual(p));
      return `Temos ${precos.length} itens em ${nome}, de ${formatarPreco(Math.min(...precos))} ate ${formatarPreco(Math.max(...precos))}.`;
    }
  }
  if (t.includes('vip') || t.includes('desconto') || t.includes('quiz'))
    return `Acerte ${ACERTOS_MINIMOS} de ${perguntas.length} perguntas no quiz (Minha Conta) e ganhe ${DESCONTO * 100}% de desconto!`;
  if (t.includes('barato')) {
    const p = [...produtos].sort((a, b) => a.preco - b.preco)[0];
    return `O mais em conta: ${p.nome} por ${formatarPreco(precoAtual(p))}.`;
  }
  if (t.includes('carrinho')) {
    const n = carrinho.reduce((a, i) => a + i.qtd, 0);
    return n ? `Voce tem ${n} item(ns) no carrinho.` : "Seu carrinho esta vazio.";
  }
  if (t.includes('frete') || t.includes('entrega'))
    return "O frete e GRATIS em todos os pedidos!";
  if (/\b(oi|ola)\b/.test(t)) return "Oi! Como posso ajudar?";

  // Ultimo recurso: procura uma palavra da pergunta no nome dos produtos.
  const achado = produtos.find(p => t.split(' ').some(w => w.length > 3 && p.nome.toLowerCase().includes(w)));
  if (achado) return `Achei: ${achado.nome} por ${formatarPreco(precoAtual(achado))}.`;

  return "Nao entendi. Tente: chuteiras, camisas, bolas, treino, VIP ou carrinho.";
}

// Roda quando o cliente envia a mensagem.
function enviarAssistente(e) {
  e.preventDefault();
  const input = document.getElementById('inputAssistente');
  const texto = input.value.trim();
  if (!texto) return;
  addMsg(texto, 'eu');
  input.value = '';
  setTimeout(() => addMsg(responderAssistente(texto), 'bot'), 400);
}


// ==========================================
// SECAO 6. INICIALIZACAO DO SISTEMA
// ==========================================
// Esse e' o "botao de ligar" do site. O evento DOMContentLoaded dispara
// quando o navegador termina de montar o HTML. So' ai rodamos tudo
// que precisa dos elementos da pagina ja' existindo.
window.addEventListener('DOMContentLoaded', () => {
  atualizarIconeTema();                      // poe o icone certo (sol ou lua)
  atualizarRotuloConta();                     // mostra o nome do cliente, se logado
  renderFiltros();                           // desenha os botoes de categoria
  mostrarProdutos();                         // desenha os cards de produto
  atualizarCarrinho();                       // monta o carrinho e o contador
  atualizarCronometro();                     // ja' mostra o relogio na hora
  setInterval(atualizarCronometro, 1000);    // faz o relogio andar a cada 1s
});

// ATENCAO! Sobre o uso de IA, foi utilizada somente para entender e aprender tags novas para facilitar 
// ou otimizar ou ate msm melhorar o site e melhorar a experiencia dos que iram visitar ele.