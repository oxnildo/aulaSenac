console.log("JavaScript carregando!")

const busca = document.querySelector("#busca");

const cards = document.querySelectorAll(".projeto-card");

const botoes = document.querySelectorAll(".btn-filtro");

console.log(busca);
console.log(cards);
console.log(botoes);

botoes.forEach(function(botao){
botao.addEventListener('click', function() {
    console.log("cliquei!");
    alert("cliquei!")
    });
});