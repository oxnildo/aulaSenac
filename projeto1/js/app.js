// ======================================
// SCRIPT GERAL DO PROJETO
// AULAS 07 E 08
// ======================================


// ======================================
// AULA 07 - CATÁLOGO
// ======================================

const listaProjetos =
    document.querySelector('#lista-projetos');

const busca =
    document.querySelector('#busca');

const statusProjetos =
    document.querySelector('#status');

const contadorSelecionados =
    document.querySelector('#contador-selecionados');

const cards =
    document.querySelectorAll('.projeto-card');

const botoesFiltro =
    document.querySelectorAll('.btn-filtro');


if (
    listaProjetos &&
    busca &&
    statusProjetos &&
    contadorSelecionados &&
    cards.length > 0
) {

    const estado = {
        categoria: 'todos',
        busca: '',
        selecionados: new Set()
    };


    function cardCombina(card) {

        const categoria =
            card.dataset.categoria;

        const texto =
            card.textContent
                .toLowerCase();

        const categoriaOk =
            estado.categoria === 'todos'
            ||
            estado.categoria === categoria;

        const buscaOk =
            texto.includes(
                estado.busca
            );

        return categoriaOk && buscaOk;
    }


    function renderizarCatalogo() {

        let totalVisiveis = 0;


        cards.forEach(
            function (card) {

                const mostrar =
                    cardCombina(card);

                if (mostrar) {

                    card.classList.remove(
                        'escondido'
                    );

                    totalVisiveis++;

                } else {

                    card.classList.add(
                        'escondido'
                    );

                }


                const id =
                    card.dataset.id;

                const selecionado =
                    estado.selecionados.has(id);

                card.classList.toggle(
                    'selecionado',
                    selecionado
                );


                const botaoSelecionar =
                    card.querySelector(
                        '.btn-selecionar'
                    );

                if (botaoSelecionar) {

                    botaoSelecionar.setAttribute(
                        'aria-pressed',
                        String(selecionado)
                    );

                    botaoSelecionar.textContent =
                        selecionado
                            ? 'Selecionado'
                            : 'Selecionar';
                }

            }
        );


        statusProjetos.textContent =
            totalVisiveis
            +
            ' projeto(s) encontrado(s).';


        contadorSelecionados.textContent =
            estado.selecionados.size
            +
            ' selecionado(s)';
    }


    botoesFiltro.forEach(
        function (botao) {

            botao.addEventListener(
                'click',
                function () {

                    estado.categoria =
                        botao.dataset.filtro;


                    botoesFiltro.forEach(
                        function (item) {

                            item.classList.remove(
                                'ativo'
                            );

                        }
                    );


                    botao.classList.add(
                        'ativo'
                    );


                    renderizarCatalogo();
                }
            );

        }
    );


    busca.addEventListener(
        'input',
        function () {

            estado.busca =
                busca.value
                    .trim()
                    .toLowerCase();

            renderizarCatalogo();
        }
    );


    // Delegação de evento:
    // um listener no container atende todos os cards.
    listaProjetos.addEventListener(
        'click',
        function (evento) {

            const botao =
                evento.target.closest(
                    '.btn-selecionar'
                );

            if (!botao) {
                return;
            }


            const card =
                botao.closest(
                    '.projeto-card'
                );

            if (!card) {
                return;
            }


            const id =
                card.dataset.id;


            if (
                estado.selecionados.has(id)
            ) {

                estado.selecionados.delete(id);

            } else {

                estado.selecionados.add(id);

            }


            renderizarCatalogo();
        }
    );


    renderizarCatalogo();
}


// ======================================
// AULA 08 - FORMULÁRIO
// ======================================

const formulario =
    document.querySelector('#form-contato');


if (formulario) {

    const nome =
        document.querySelector('#nome');

    const email =
        document.querySelector('#email');

    const assunto =
        document.querySelector('#assunto');

    const mensagem =
        document.querySelector('#mensagem');

    const statusFormulario =
        document.querySelector(
            '#status-formulario'
        );

    const erroNome =
        document.querySelector(
            '#erro-nome'
        );

    const erroEmail =
        document.querySelector(
            '#erro-email'
        );

    const erroAssunto =
        document.querySelector(
            '#erro-assunto'
        );

    const erroMensagem =
        document.querySelector(
            '#erro-mensagem'
        );


    function limparErroCampo(
        campo,
        elementoErro
    ) {

        elementoErro.textContent = '';

        campo.classList.remove(
            'erro'
        );

        campo.removeAttribute(
            'aria-invalid'
        );
    }


    function marcarErro(
        campo,
        elementoErro,
        texto
    ) {

        elementoErro.textContent =
            texto;

        campo.classList.add(
            'erro'
        );

        campo.setAttribute(
            'aria-invalid',
            'true'
        );
    }


    function emailValido(valor) {

        const padrao =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return padrao.test(valor);
    }


    function limparTodosErros() {

        limparErroCampo(
            nome,
            erroNome
        );

        limparErroCampo(
            email,
            erroEmail
        );

        limparErroCampo(
            assunto,
            erroAssunto
        );

        limparErroCampo(
            mensagem,
            erroMensagem
        );


        statusFormulario.textContent =
            '';

        statusFormulario.classList.remove(
            'sucesso',
            'erro'
        );
    }


    formulario.addEventListener(
        'submit',
        function (evento) {

            evento.preventDefault();

            limparTodosErros();


            let formularioValido =
                true;

            let primeiroCampoComErro =
                null;


            if (
                nome.value.trim() === ''
            ) {

                marcarErro(
                    nome,
                    erroNome,
                    'Informe seu nome.'
                );

                formularioValido =
                    false;

                primeiroCampoComErro =
                    primeiroCampoComErro
                    ||
                    nome;
            }


            const valorEmail =
                email.value.trim();


            if (valorEmail === '') {

                marcarErro(
                    email,
                    erroEmail,
                    'Informe seu e-mail.'
                );

                formularioValido =
                    false;

                primeiroCampoComErro =
                    primeiroCampoComErro
                    ||
                    email;

            } else if (
                !emailValido(valorEmail)
            ) {

                marcarErro(
                    email,
                    erroEmail,
                    'Informe um e-mail válido.'
                );

                formularioValido =
                    false;

                primeiroCampoComErro =
                    primeiroCampoComErro
                    ||
                    email;
            }


            if (
                assunto.value.trim() === ''
            ) {

                marcarErro(
                    assunto,
                    erroAssunto,
                    'Informe o assunto.'
                );

                formularioValido =
                    false;

                primeiroCampoComErro =
                    primeiroCampoComErro
                    ||
                    assunto;
            }


            if (
                mensagem.value.trim() === ''
            ) {

                marcarErro(
                    mensagem,
                    erroMensagem,
                    'Informe sua mensagem.'
                );

                formularioValido =
                    false;

                primeiroCampoComErro =
                    primeiroCampoComErro
                    ||
                    mensagem;
            }


            if (!formularioValido) {

                statusFormulario.textContent =
                    'Revise os campos destacados.';

                statusFormulario.classList.add(
                    'erro'
                );


                if (
                    primeiroCampoComErro
                ) {

                    primeiroCampoComErro.focus();
                }


                return;
            }


            statusFormulario.textContent =
                'Mensagem validada com sucesso!';

            statusFormulario.classList.add(
                'sucesso'
            );


            formulario.reset();
        }
    );


    // Remove o erro enquanto o aluno corrige o campo.
    [
        [nome, erroNome],
        [email, erroEmail],
        [assunto, erroAssunto],
        [mensagem, erroMensagem]
    ].forEach(
        function ([campo, erro]) {

            campo.addEventListener(
                'input',
                function () {

                    limparErroCampo(
                        campo,
                        erro
                    );
                }
            );

        }
    );
}