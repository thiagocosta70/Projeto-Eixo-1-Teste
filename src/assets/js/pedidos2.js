const MINUTES_MS = 60000;
const MAX_RATING = 5;

const minutesSpans = document.querySelectorAll('.minutos');
const ratingSections = document.querySelectorAll('.rating');

// Cria / recupera lista de pedidos no localStorage
if (localStorage.getItem("pedidos") === null) {
  var pedidos = [];
  var numeroPedido = 1;
} else {
  var pedidos = JSON.parse(localStorage.getItem("pedidos"));
  var ultimoPedido = pedidos.length;
  var numeroPedido = ultimoPedido + 1;
}

// Atualiza os minutos restantes e exibe a mensagem de atraso
minutesSpans.forEach(span => {
  let minutesLeft = span.textContent;

  function updateMinutes() {
    minutesLeft--;
    if (minutesLeft > 0) {
      span.textContent = minutesLeft;
    } else {
      const orderStatus = span.closest('.order-container')
      orderStatus.textContent = 'PEDIDO ATRASADO!';
    }
  }

  setInterval(updateMinutes, MINUTES_MS);
});

// Adiciona as estrelas de avaliação
for (let index = MAX_RATING; index > 0; index--) {
  ratingSections.forEach(element => {
    element.insertAdjacentHTML('afterbegin',
      `<i class="fa-regular fa-star" data-star-id=${index} style="cursor: pointer;" onclick="handleStarClick(this)"></i>`
    )
  });
}

function handleStarClick(clickedStar) {
  const ratingDiv = clickedStar.closest('.rating');
  const clickedStarId = parseInt(clickedStar.dataset.starId, 10);

  while (ratingDiv.firstChild) {
    ratingDiv.removeChild(ratingDiv.firstChild);
  }

  for (let index = MAX_RATING; index > 0; index--) {
    if (index <= clickedStarId) {
      ratingDiv.insertAdjacentHTML('afterbegin',
        `<i class="fa-solid fa-star" data-star-id=${index}></i>`
      )
    } else {
      ratingDiv.insertAdjacentHTML('afterbegin',
        `<i class="fa-regular fa-star" data-star-id=${index}></i>`
      )
    }
  }
}

// Envia pedido finalizado ao localStorage
function pedidoFeito() {
  var cards = document.querySelectorAll("#listCart .card");
  var itensDoPedido = [];
  cards.forEach((card) => {
    var idComprado = card.getAttribute("data-id-prato");
    var quantidadeComprada = card.querySelector(".quantidade").textContent;
    var itemComprado = {
      idComprado: idComprado,
      quantidadeComprada: quantidadeComprada,
    };
    itensDoPedido.push(itemComprado);
  });
  var pedido = { pedido: numeroPedido, itens: itensDoPedido };
  pedidos.push(pedido);
  console.log(pedidos);
  numeroPedido++;
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}