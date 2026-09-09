console.log("JavaScript carregando!")

const listaProjeto =
    document.querySelector("#listar-projetos");

const statusProjeto =
    document.querySelector("#status");

const contatoSelecionados =
    document.querySelector("#contador-selecionados");

const cards =
    document.querySelectorAll(".projeto-card");

const busca =
    document.querySelector("#busca");

const botoesFiltro =
    document.querySelectorAll(".btn-filtro");

if (listaProjeto && busca && statusProjeto && contatoSelecionados && cards.length > 0) {
    const estado = {
        categoria: "todos",
        busca: "",
        Selection: new Set()
    };
    function cardCombin(card) {
        const categoria = card.dataset.categoria;

        const texto = card.textContent.toLowerCase();
        const categoriaOk = estado.categoria === "todos"
            || estado.categoria === categoria;

        const buscaOk = texto.includes(estado.busca);

        return categoriaOk && buscaOk;
    }

    function rederizarCatalogo() {
        let totalVisivel = 0;

        cards.forEach(
            function (card) {
                const mostrar = cardCombina(card);

                if (mostrar) {
                    card.classList.remove("escondido");
                    totalVisivel++;
                } else {
                    card.classList.add("escondido");
                }

                const id = card.dataset.id;
                const selecionado = estado.selecionados.has(id)

                card.classList.toggle("selecionado", selecionado)

                const botaoSelecionar = card.querySelector(".btn-selecionar");

                if (botaoSelecionar) {
                    botaoSelecionar.setAttribute("aria-pressed", String(selecionado));
                }

                botaoSelecionar.textContent = selecionado ? "selecionado" : "Selecionar"
            }
        );

        statusProjeto.textContent = totalVisivel + "projetos*(s) encontado(s).";

        contatoSelecionados.textContent = estado.selecionados.size + "selecionado(s)";
    }

    botoesFiltro.forEach(
        function (botao) {
            botao.addEventListener('click',
                function () {
                    estado.categoria = botao.dataset.filtro;

                    botoesFiltro.forEach(
                        function (item) {
                            item.classList.remove("ativo");
                        }
                    );

                    botao.classList.add("ativo");
                    rederizarCatalogo();
                }
            );
        }
    );

    busca.addEventListener("input",
        function () {
            estado.busca = busca.value.trim().toLowerCase();
            rederizarCatalogo();
        })
}

// botoesFiltro.forEach(function(botao){
//     botao.addEventListener('click', function() {
//         console.log("cliquei!");
//         alert("cliquei!")
//         });
// });