const MINUTES_MS = 60000;
const MAX_RATING = 5;

const minutesSpans = document.querySelectorAll('.minutos');
const ratingSections = document.querySelectorAll('.rating');

// Função para renderizar um novo card de pedido
function renderPedidoCard(pedido) {
  const cardContainer = document.getElementById('pedido-cards');

  const card = document.createElement('div');
  card.classList.add('card', 'mb-3');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = `Pedido Nº ${pedido.numero}`;

  const cardList = document.createElement('ul');
  cardList.classList.add('list-group', 'list-group-flush');

  pedido.itens.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.textContent = `${item.quantidade}x ${item.nome}`;
    cardList.appendChild(listItem);
  });

  const statusText = document.createElement('p');
  statusText.classList.add('card-text');
  statusText.textContent = `Tempo estimado restante: ${pedido.tempoEstimado} minuto(s)`;

  const ratingDiv = document.createElement('div');
  ratingDiv.classList.add('rating');

  for (let index = MAX_RATING; index > 0; index--) {
    ratingDiv.insertAdjacentHTML('afterbegin',
      `<i class="fa-regular fa-star" data-star-id=${index} style="cursor: pointer;" onclick="handleStarClick(this)"></i>`
    );
  }

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardList);
  cardBody.appendChild(statusText);
  cardBody.appendChild(ratingDiv);
  card.appendChild(cardBody);

  cardContainer.appendChild(card);
}

// Atualiza os minutos restantes e exibe a mensagem de atraso
minutesSpans.forEach(span => {
  let minutesLeft = span.textContent;

  function updateMinutes() {
    minutesLeft--;
    if(minutesLeft > 0) {
      span.textContent = minutesLeft;
    } else {
      const orderStatus = span.closest('.order-container');
      orderStatus.textContent = 'PEDIDO ATRASADO!';
    }
  }

  setInterval(updateMinutes, MINUTES_MS);
});

// Adiciona um novo pedido à página e ao Local Storage
function pagar() {
  alert("Seu pedido foi enviado para o restaurante!");

  const novoPedido = {
    numero: "8403",
    restaurante: "Italiano",
    itens: [
      { nome: "Panzanella", quantidade: 2 },
      { nome: "Lasanha", quantidade: 1 }
    ],
    tempoEstimado: 25,
    status: "Em andamento"
  };

  // Verifica se já existem pedidos salvos no Local Storage
  const pedidosEmAndamento = JSON.parse(localStorage.getItem('pedidosEmAndamento')) || [];
  pedidosEmAndamento.push(novoPedido);
  localStorage.setItem('pedidosEmAndamento', JSON.stringify(pedidosEmAndamento));

  // Renderiza o novo card de pedido
  renderPedidoCard(novoPedido);
}

// Adiciona as estrelas de avaliação
function handleStarClick(clickedStar) {
  const ratingDiv = clickedStar.closest('.rating');
  const clickedStarId = parseInt(clickedStar.dataset.starId, 10);

  while(ratingDiv.firstChild) {
    ratingDiv.removeChild(ratingDiv.firstChild);
  }

  for(let index = MAX_RATING; index > 0; index--) {
    if(index <= clickedStarId) {
      ratingDiv.insertAdjacentHTML('afterbegin',
        `<i class="fa-solid fa-star" data-star-id=${index}></i>`
      );
    } else {
      ratingDiv.insertAdjacentHTML('afterbegin',
        `<i class="fa-regular fa-star" data-star-id=${index}></i>`
      );
    }
  }
}
