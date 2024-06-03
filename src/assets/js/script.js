const MINUTES_MS = 60000;
const MAX_RATING = 5;

const minutesSpans = document.querySelectorAll('.minutos')
const ratingSections = document.querySelectorAll('.rating');

// Atualiza os minutos restantes e exibe a mensagem de atraso
minutesSpans.forEach(span => {
  let minutesLeft = span.textContent;

  function updateMinutes() {
    minutesLeft--;
    if(minutesLeft > 0) {
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

  while(ratingDiv.firstChild) {
    ratingDiv.removeChild(ratingDiv.firstChild);
  }


  for(let index = MAX_RATING; index > 0; index--) {
    if(index <= clickedStarId) {
      ratingDiv.insertAdjacentHTML('afterbegin',
        `<i class="fa-solid fa-star" data-star-id=${index}></i>`
      )
    } else {
      ratingDiv.insertAdjacentHTML('afterbegin',
        `<i class="fa-regular fa-star" data-star-id=${index}></i>`
      )}
    }
}

// Finaliza o pedido
window.pagar = function () {
  // Impede pagamento se carrinho estiver vazio
  var valorFinal = document.querySelector("#valorFinal");
  if (valorFinal.textContent == "R$ 0,00") {
    alert("Carrinho vazio, faça seu pedido");
    return;
  } else {
    // Não permite pagar se não selecionar a forma de pagamento:
    var pagamentoSelecionado = document.getElementById("formaDePagamento");
    if (pagamentoSelecionado.value == "Selecionar forma de pagamento") {
      alert("Selecione a forma de pagamento");
      return;
    } else {
      // Finaliza o pedido: salva o pedido no localStorage, limpa o carrinho e altera a quantidade em estoque no localStorage
      alert("Seu pedido foi enviado ao restaurante e está sendo preparado!");
      pedidoFeito();
      alteraQuantidadeEstoque();
      limpaCarrinho();
    }
  }
};

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
  criarCardPedido(pedido);
}

function criarCardPedido(pedido) {
  const listPedidos = document.getElementById("listPedidos");

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("order-container");

  let itensHtml = '';
  pedido.itens.forEach(item => {
    const prato = encontrarPratoPorId(item.idComprado);
    itensHtml += `
      <div>
        <p>Prato: ${prato.nomePrato}</p>
        <p>Quantidade: ${item.quantidadeComprada}</p>
        <p>Preço: R$ ${(prato.precoPrato * item.quantidadeComprada).toFixed(2).replace('.', ',')}</p>
      </div>
    `;
  });

  const cardHtml = `
    <div>
      <h3>Pedido #${pedido.pedido}</h3>
      <p>Restaurante: ${restaurantes[0].nome}</p>
      <div>${itensHtml}</div>
      <p>Total: R$ ${atualizaValorPedido(pedido).toFixed(2).replace('.', ',')}</p>
      <div class="minutos">30</div> <!-- Exemplo de minutos -->
      <div class="rating"></div>
    </div>
  `;

  cardDiv.innerHTML = cardHtml;
  listPedidos.appendChild(cardDiv);

  // Adicionar funcionalidade de atualização de minutos e avaliação ao novo card
  adicionarFuncionalidadesExtras(cardDiv);
}

function atualizaValorPedido(pedido) {
  let valorTotal = 0;
  pedido.itens.forEach(item => {
    const prato = encontrarPratoPorId(item.idComprado);
    valorTotal += prato.precoPrato * item.quantidadeComprada;
  });
  return valorTotal;
}

function adicionarFuncionalidadesExtras(cardDiv) {
  const MINUTES_MS = 60000;
  const MAX_RATING = 5;

  const minutesSpan = cardDiv.querySelector('.minutos');
  let minutesLeft = parseInt(minutesSpan.textContent, 10);

  function updateMinutes() {
    minutesLeft--;
    if (minutesLeft > 0) {
      minutesSpan.textContent = minutesLeft;
    } else {
      const orderStatus = minutesSpan.closest('.order-container');
      orderStatus.textContent = 'PEDIDO ATRASADO!';
    }
  }

  setInterval(updateMinutes, MINUTES_MS);

  const ratingSection = cardDiv.querySelector('.rating');
  for (let index = MAX_RATING; index > 0; index--) {
    ratingSection.insertAdjacentHTML('afterbegin',
      `<i class="fa-regular fa-star" data-star-id=${index} style="cursor: pointer;" onclick="handleStarClick(this)"></i>`
    );
  }
}

// Função existente handleStarClick
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
      );
    } else {
      ratingDiv.insertAdjacentHTML('afterbegin',
        `<i class="fa-regular fa-star" data-star-id=${index}></i>`
      );
    }
  }
}