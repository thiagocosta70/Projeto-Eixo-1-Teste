// Função para renderizar um novo pedido na página e salvar no Local Storage
function renderPedido(pedido) {
    // Adiciona o pedido ao Local Storage
    const pedidosEmAndamento = JSON.parse(localStorage.getItem('pedidosEmAndamento')) || [];
    pedidosEmAndamento.push(pedido);
    localStorage.setItem('pedidosEmAndamento', JSON.stringify(pedidosEmAndamento));
  
    // Renderiza o pedido na página
    const pedidosAbertosSection = document.getElementById('pills-abertos');
    const carouselInner = pedidosAbertosSection.querySelector('.carousel-inner');
  
    const novoItemCarousel = document.createElement('div');
    novoItemCarousel.classList.add('carousel-item');
  
    novoItemCarousel.innerHTML = `
      <div class="card h-100">
        <img src="../assets/img/pedidos/${pedido.restaurante.toLowerCase().replace(/\s/g, '')}.png" alt="Logo do restaurante" />
        <div class="card-body d-flex flex-column text-center">
          <h5 class="card-title">PEDIDO Nº ${pedido.numero}</h5>
          <div class="dotted_line"></div>
          <ul class="mb-2 mt-2 text-start align-self-center">
            ${pedido.itens.map(item => `<li>${item.quantidade}x ${item.nome}</li>`).join('')}
          </ul>
          <div class="dotted_line"></div>
          <div class="mt-auto order-container">
            <span>Tempo estimado restante: <span class="minutos">${pedido.tempoEstimado}</span> minuto(s)</span>
            <p class="status_pedido">${pedido.status}</p>
          </div>
        </div>
      </div>
    `;
  
    carouselInner.appendChild(novoItemCarousel);
  }
  
  // Adiciona um novo pedido à página
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
  
  renderPedido(novoPedido);
  
  // Atualiza os minutos restantes e exibe a mensagem de atraso
  const minutosSpans = document.querySelectorAll('.minutos');
  
  minutosSpans.forEach(span => {
    let minutesLeft = parseInt(span.textContent);
  
    function updateMinutes() {
      minutesLeft--;
      if (minutesLeft > 0) {
        span.textContent = minutesLeft;
      } else {
        const orderStatus = span.closest('.order-container');
        orderStatus.textContent = 'PEDIDO ATRASADO!';
      }
    }
  
    setInterval(updateMinutes, MINUTES_MS);
  });
  
  // Função para renderizar a avaliação de um pedido
  function renderAvaliacao(ratingSection, ratingValue) {
    ratingSection.innerHTML = '';
    for (let index = MAX_RATING; index > 0; index--) {
      if (index <= ratingValue) {
        ratingSection.insertAdjacentHTML('afterbegin',
          `<i class="fa-solid fa-star" data-star-id=${index}></i>`
        );
      } else {
        ratingSection.insertAdjacentHTML('afterbegin',
          `<i class="fa-regular fa-star" data-star-id=${index}></i>`
        );
      }
    }
  }
  
  // Renderiza as avaliações iniciais dos pedidos
  const ratingSections = document.querySelectorAll('.rating');
  
  ratingSections.forEach(section => {
    renderAvaliacao(section, 3); // Exemplo de avaliação inicial, poderia ser a média real das avaliações
  });
  
  // Função para lidar com o clique nas estrelas de avaliação
  function handleStarClick(clickedStar) {
    const ratingDiv = clickedStar.closest('.rating');
    const clickedStarId = parseInt(clickedStar.dataset.starId, 10);
    renderAvaliacao(ratingDiv, clickedStarId);
  }
  