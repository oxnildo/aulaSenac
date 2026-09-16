// ======================================
// AULA 08 - FORMULÁRIO
// js/contato.js
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