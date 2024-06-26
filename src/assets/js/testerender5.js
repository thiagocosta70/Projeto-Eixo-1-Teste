import { restaurantes as restaurantesArquivoJSON } from "./restauranteJson.js";

let restaurantes;

// Salva o array de restauranteJson.js no localStorage COMO STRING e já obtém como objeto para uso local
if (localStorage.getItem("restaurantes") === null) {
  function criaRestaurantes() {
    localStorage.setItem(
      "restaurantes",
      JSON.stringify(restaurantesArquivoJSON)
    );
    restaurantes = [restaurantesArquivoJSON];
  }
  criaRestaurantes();
  restaurantes = JSON.parse(localStorage.getItem("restaurantes"));
} else {
  // Se já existir no localStorage, recupera os dados por lá
  restaurantes = JSON.parse(localStorage.getItem("restaurantes"));
}

// Abre e fecha a lateral do carrinho
const iconCart = document.querySelector(".icon-cart");
const closeBtn = document.querySelector(".btn-close");
const body = document.querySelector(".body");
iconCart.addEventListener("click", () => {
  document.body.classList.toggle("activeTabCart");
});
closeBtn.addEventListener("click", () => {
  document.body.classList.toggle("activeTabCart");
});

// Função para encontrar um prato (com seu array) a partir de seu id
function encontrarPratoPorId(idPrato) {
  for (let restaurante of restaurantes) {
    for (let prato of restaurante.cardapio) {
      if (prato.idPrato == idPrato) {
        return prato;
      }
    }
  }
}

// Adicionar novo ítem ao carrinho
window.adicionaItem = function (element) {
  // Verifica se ítem disponível em estoque
  var idPrato = element.dataset.idPrato;
  var prato = encontrarPratoPorId(idPrato);
  var quantidadeEmEstoque = prato.quantidadeEstoque;
  // Se disponível, adiciona / cria card
  if (quantidadeEmEstoque > 1) {
    var idPratoClicado = Number(element.getAttribute("data-id-prato"));
    criarCardCarrinho(idPratoClicado);
    atualizaValorTotal();
  } else {
    quantidadeLimiteAtingida();
  }
};

function criarCardCarrinho(idPrato) {
  var prato = encontrarPratoPorId(idPrato);
  var cardExistente = document.querySelector(`div[data-id-prato="${idPrato}"]`);

  // Verfica se o card já existe no carrinho
  if (cardExistente) {
    var quantidadeElement = cardExistente.querySelector(".quantidade");
    var quantidadeAtual = Number(quantidadeElement.textContent);
    var quantidadeEstoque = prato.quantidadeEstoque;

    // Verifica se quantidade disponível em estoque
    if (quantidadeAtual == quantidadeEstoque) {
      quantidadeLimiteAtingida();
      return;
    } else {
      // Aumenta quantidade do ítem no carrinho
      quantidadeAtual++;
      quantidadeElement.textContent = quantidadeAtual;
    }
  } else {
    desenhaCard(prato, idPrato);
  }
}

// Código HTML do card no carrinho
function desenhaCard(prato, idPrato) {
  var div = document.createElement("div");
  div.innerHTML = `<div class="card mb-6" id="card-item-carrinho" style="max-width: 370px" id="card-item-carrinho" data-id-prato="${idPrato}">
  <div class="col-md-3">
  <img src="${prato.imagemPrato}"  id="imagemPrato" style="max-width: 70px" alt="${prato.nomePrato}">
  </div>
  <div class="col-md-3" id="card-body">
    <p class="card-title">${prato.nomePrato}</p>
    <p class="card-price">R$ ${prato.precoPrato.toFixed(2).replace(".", ",")}</p>
  </div>
  <div id="card-quantidade">
    <div class="col-1">
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        id = removeItemCard${idPrato}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        onclick = "removeItemCard(${idPrato})"
        data-id-prato="${idPrato}"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h14"
        />
      </svg>
    </div>
    <p class="quantidade">1</p>
    <div class="col-1">
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        id = adicionaItemCard${idPrato}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        onclick = "adicionaItemCard(${idPrato})"
        data-id-prato="${idPrato}"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h14m-7 7V5"
        />
      </svg>
    </div>
  </div>
  </div>`;
  // Insere o card como elemento filho na div listCart
  var listCart = document.getElementById("listCart");
  listCart.appendChild(div);
}

// Diminuir quantidade do ítens no carrinho / remover card pelo card DO CARDÁPIO
window.removeItem = function (element) {
  var idPrato = element.getAttribute("data-id-prato");
  var cardExistente = document.querySelector(`div[data-id-prato="${idPrato}"]`);
  var quantidadeNoCarrinho = cardExistente.querySelector(".quantidade");
  var quantidadeAtual = Number(quantidadeNoCarrinho.textContent);
  quantidadeAtual--;

  if (quantidadeAtual > 0) {
    quantidadeNoCarrinho.textContent = quantidadeAtual;
  } else {
    cardExistente.parentNode.remove();
    zerarValorFinal();
  }
};

// Adicionar ítens ao carrinho pelo card DO CARRINHO
window.adicionaItemCard = function (idPrato) {
  var card = document.querySelector(`div[data-id-prato="${idPrato}"]`);
  var prato = encontrarPratoPorId(idPrato);
  var quantidadeNoCarrinho = card.querySelector(".quantidade");
  var quantidadeAtual = Number(quantidadeNoCarrinho.textContent);
  var quantidadeEstoque = prato.quantidadeEstoque;

  if (quantidadeAtual < quantidadeEstoque) {
    quantidadeAtual++;
    quantidadeNoCarrinho.textContent = quantidadeAtual;
    atualizaValorTotal();
  } else {
    quantidadeLimiteAtingida();
    return;
  }
};

// Diminuir / remover ítem pelo card DO CARRINHO
window.removeItemCard = function (idPrato) {
  var card = document.querySelector(`div[data-id-prato="${idPrato}"]`);
  var quantidadeNoCarrinho = card.querySelector(".quantidade");
  var quantidadeAtual = Number(quantidadeNoCarrinho.textContent);

  if (quantidadeAtual > 1) {
    quantidadeAtual--;
    quantidadeNoCarrinho.textContent = quantidadeAtual;
    atualizaValorTotal();
  } else {
    card.parentNode.remove();
    card.remove();
    zerarValorFinal();
  }
};

// Atualiza o valor total do carrinho
function atualizaValorTotal() {
  var cards = document.querySelectorAll("#listCart .card");
  var valorTotal = 0;
  cards.forEach((card) => {
    var preco = card.querySelector(".card-price").textContent;
    var quantidadeItem = card.querySelector(".quantidade").textContent;
    var valorPorItem = Number(preco.split(" ")[1].replace(",", "."));
    valorTotal += valorPorItem * quantidadeItem;
  });
  var valorFinal = document.querySelector("#valorFinal");
  valorFinal.innerHTML = `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
}

// Zera valor final do carrinho se não houver card nele
