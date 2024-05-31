const MINUTES_MS = 60000;
const MAX_RATING = 5;

const restaurantes = [
  {
    "idRestaurante": 1,
    "nomeRestaurante": "Restaurante Sabor Brasileiro",
    "imagemRestaurante": "https://placehold.co/600x400/EEE/31343C",
    "descricaoRestaurante": "Restaurante tradicional brasileiro oferecendo pratos típicos com um toque moderno.",
    "cardapio": [
      {
        "idPrato": 101,
        "nomePrato": "Feijoada Completa",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Um prato clássico brasileiro com feijão preto, carne suína e acompanhamentos.",
        "quantidadeEstoque": 10,
        "precoPrato": 29.90,
        "categoriaPrato": "La carte"
      },
      // Adicione os outros pratos aqui
    ]
  },
  // Adicione os outros restaurantes aqui
];

// Função para criar o HTML dos restaurantes e pratos
function renderRestaurantes(restaurantes) {
  const container = document.querySelector('#restaurantes-container');
  container.innerHTML = ''; // Limpa o container

  restaurantes.forEach(restaurante => {
    const restauranteDiv = document.createElement('div');
    restauranteDiv.classList.add('restaurante');

    restauranteDiv.innerHTML = `
      <h2>${restaurante.nomeRestaurante}</h2>
      <img src="${restaurante.imagemRestaurante}" alt="${restaurante.nomeRestaurante}">
      <p>${restaurante.descricaoRestaurante}</p>
    `;

    const cardapioDiv = document.createElement('div');
    cardapioDiv.classList.add('cardapio');

    restaurante.cardapio.forEach(prato => {
      const pratoDiv = document.createElement('div');
      pratoDiv.classList.add('prato');

      pratoDiv.innerHTML = `
        <h3>${prato.nomePrato}</h3>
        <img src="${prato.imagemPrato}" alt="${prato.nomePrato}">
        <p>${prato.descricaoPrato}</p>
        <p>Preço: R$${prato.precoPrato}</p>
        <p>Estoque: ${prato.quantidadeEstoque}</p>
      `;

      cardapioDiv.appendChild(pratoDiv);
    });

    restauranteDiv.appendChild(cardapioDiv);
    container.appendChild(restauranteDiv);
  });
}

// Chame a função para renderizar os restaurantes ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  renderRestaurantes(restaurantes);

  // Atualiza os minutos restantes e exibe a mensagem de atraso
  const minutesSpans = document.querySelectorAll('.minutos');
  minutesSpans.forEach(span => {
    let minutesLeft = span.textContent;

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

  // Adicione as classificações (se necessário)
  const ratingSections = document.querySelectorAll('.rating');
  ratingSections.forEach(ratingSection => {
    const rating = parseFloat(ratingSection.textContent);
    ratingSection.textContent = '';

    for (let i = 0; i < MAX_RATING; i++) {
      const star = document.createElement('span');
      star.textContent = i < rating ? '★' : '☆';
      ratingSection.appendChild(star);
    }
  });
});