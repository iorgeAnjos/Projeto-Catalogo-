const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

const deck = [
  {
    id: 1,
    img: 'img/deck1/deckReisDoFogo (1).png',
    nome: 'Investida dos Reis do Fogo',
    descricao:
      'Investida dos Reis de Fogo Deck Estrutural é um Deck Estrutural no Yu-Gi-Oh! Estampas Ilustradas. Ele é o vigésimo quarto Deck na série de Decks Estruturais do TCG. É o sucessor do Structure Deck: Realm of the Sea Emperor e o antecessor do Saga do Dragão Branco de Olhos Azuis Deck Estrutural.',
    card1: '/img/deck1/garunix.png',
    card2: '/img/deck1/barong.jpg',
    card3: '/img/deck1/kirin (1).png',
  },
  {
    id: 2,
    img: 'img/deck2/rugido (1).png',
    nome: 'Rugido do Dragão ',
    descricao:
      'O Deck Estrutura: Rugido do Dragão é um Deck Estrutural do Yu-Gi-Oh! Trading Card Game. Ele é o primeiro Deck da série de Decks Estruturais do TCG. É o antecessor do Deck Estrutura: Insanidade Zumbi.',
    card1: '/img/deck2/dragaoOV.png',
    card2: '/img/deck2/dragaoOVN.png',
    card3: '/img/deck2/behemot.png',
  },
];
let cards = undefined;

app.get('/', (req, res) => {
  res.render('index', { deck, cards });
});

app.get('/detalhes/:id', (req, res) => {
  const id = +req.params.id - 1;
  res.render('detalhes', { deck, id });
});
app.get('/cadastro', (req, res) => {
  res.render('cadastro', { deck, cards });
});

app.get("/update/:id", (req, res) => {
  const id = req.params.id - 1;
  res.render("update", { deck, id });
})

/* app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete deck[id];
  res.redirect("/");
}); */

app.post('/create', (req, res) => {
  const cards = req.body;
  cards.id = deck.length + 1;
  deck.push(cards);
  res.redirect('/');
});

app.post('/update/:id', (req, res) => {
  const id = +req.params.id - 1;
  cards = deck.find((cards) => cards.id === id);

  const newCard = req.body;
  newCard.id = id + 1;
  deck[id] = newCard;
  cards = undefined;

  res.redirect('/');
});

app.listen(3000, () =>
  console.log('Servidor rodando em http://localhost:3000'),
);
