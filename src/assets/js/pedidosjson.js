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
      {
        "idPrato": 102,
        "nomePrato": "Moqueca de Peixe",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Peixe cozido em leite de coco, azeite de dendê e pimentões, servido com arroz.",
        "quantidadeEstoque": 8,
        "precoPrato": 34.50,
        "categoriaPrato": "La carte"
      },
      {
        "idPrato": 103,
        "nomePrato": "Coxinha de Frango",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Salgadinho brasileiro recheado com frango desfiado e temperado.",
        "quantidadeEstoque": 50,
        "precoPrato": 5.00,
        "categoriaPrato": "Petisco"
      },
      {
        "idPrato": 104,
        "nomePrato": "Picanha na Chapa",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Picanha suculenta grelhada na chapa, servida com farofa e vinagrete.",
        "quantidadeEstoque": 6,
        "precoPrato": 45.00,
        "categoriaPrato": "La carte"
      },
      {
        "idPrato": 105,
        "nomePrato": "Brigadeiro",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Doce brasileiro feito com leite condensado, chocolate e granulado.",
        "quantidadeEstoque": 30,
        "precoPrato": 2.50,
        "categoriaPrato": "Sobremesa"
      },
      {
        "idPrato": 106,
        "nomePrato": "Caipirinha",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Bebida tradicional brasileira feita com cachaça, limão e açúcar.",
        "quantidadeEstoque": 20,
        "precoPrato": 15.00,
        "categoriaPrato": "Bebida"
      }
    ]
  },
  {
    "idRestaurante": 2,
    "nomeRestaurante": "Cantina Italiana",
    "imagemRestaurante": "https://placehold.co/600x400/EEE/31343C",
    "descricaoRestaurante": "Autêntica cozinha italiana com massas frescas e vinhos importados.",
    "cardapio": [
      {
        "idPrato": 201,
        "nomePrato": "Spaghetti Carbonara",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Tradicional prato italiano feito com ovos, queijo, pancetta e pimenta preta.",
        "quantidadeEstoque": 15,
        "precoPrato": 22.00,
        "categoriaPrato": "La carte"
      },
      {
        "idPrato": 202,
        "nomePrato": "Lasagna alla Bolognese",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Lasanha clássica com molho bolognese, queijo e massa fresca.",
        "quantidadeEstoque": 12,
        "precoPrato": 26.00,
        "categoriaPrato": "La carte"
      },
      {
        "idPrato": 203,
        "nomePrato": "Tiramisu",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Sobremesa italiana feita com mascarpone, café e cacau.",
        "quantidadeEstoque": 20,
        "precoPrato": 12.00,
        "categoriaPrato": "Sobremesa"
      },
      {
        "idPrato": 204,
        "nomePrato": "Pizza Margherita",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Pizza clássica italiana com molho de tomate, mozzarella e manjericão.",
        "quantidadeEstoque": 10,
        "precoPrato": 30.00,
        "categoriaPrato": "Pizzas"
      },
      {
        "idPrato": 205,
        "nomePrato": "Risotto ai Funghi",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Risoto cremoso com cogumelos frescos e queijo parmesão.",
        "quantidadeEstoque": 10,
        "precoPrato": 24.00,
        "categoriaPrato": "La carte"
      },
      {
        "idPrato": 206,
        "nomePrato": "Panna Cotta",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Sobremesa italiana suave feita com creme de leite, açúcar e baunilha.",
        "quantidadeEstoque": 15,
        "precoPrato": 10.00,
        "categoriaPrato": "Sobremesa"
      },
      {
        "idPrato": 207,
        "nomePrato": "Vinho Chianti",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Vinho tinto italiano da região da Toscana, perfeito para acompanhar massas.",
        "quantidadeEstoque": 25,
        "precoPrato": 45.00,
        "categoriaPrato": "Bebida"
      }
    ]
  },
  {
    "idRestaurante": 3,
    "nomeRestaurante": "Sushi Zen",
    "imagemRestaurante": "https://placehold.co/600x400/EEE/31343C",
    "descricaoRestaurante": "Experiência de sushi e pratos japoneses com ingredientes frescos e de alta qualidade.",
    "cardapio": [
      {
        "idPrato": 301,
        "nomePrato": "Sashimi de Salmão",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Fatias finas de salmão fresco servidas com molho de soja e wasabi.",
        "quantidadeEstoque": 20,
        "precoPrato": 28.00,
        "categoriaPrato": "La carte"
      },
      {
        "idPrato": 302,
        "nomePrato": "Temaki de Atum",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Cone de alga nori recheado com arroz e atum fresco temperado.",
        "quantidadeEstoque": 25,
        "precoPrato": 18.50,
        "categoriaPrato": "La carte"
      },
      {
        "idPrato": 303,
        "nomePrato": "Uramaki Califórnia",
        "imagemPrato": "https://placehold.co/600x400/EEE/31343C",
        "descricaoPrato": "Rolo de sushi invertido com abacate, kani e pepino, coberto com gergelim.",
        "quantidadeEstoque": 30,
        "precoPrato": 22.00,
        "categoriaPrato": "La carte"
      },
      {
        "idPrato": 304,
        "nomePrato": "Hot Roll",
        "imagemPrato": "https://placehold