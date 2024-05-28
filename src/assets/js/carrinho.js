let iconCart = document.querySelector(".icon-cart");
let btnClose = document.querySelector(".btn-close");
let body = document.querySelector("body");

iconCart.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
});

btnClose.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
});

function pagar() {
    // Alerta informando que o pedido foi enviado para o restaurante
    alert("Seu pedido foi enviado para o restaurante!");

    // Salvar o pedido no Local Storage
    const pedido = {
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

    // Adiciona o novo pedido à lista de pedidos em andamento
    pedidosEmAndamento.push(pedido);

    // Salva a lista atualizada no Local Storage
    localStorage.setItem('pedidosEmAndamento', JSON.stringify(pedidosEmAndamento));
}
