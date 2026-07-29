$(document).ready(function () {
    $('#botao').click(function () {
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    })
})

/*$(document).ready(function () {
    $('#form').submit(function (event) {
        event.preventDefault();

        var dados = Object.fromEntries(new FormData(this));

        fetch('http://localhost:3000/reservas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        })
    });
});*/

$(document).ready(function () {
    $("#form").validate({
        rules: {
            nome: {
                required: true,
                minlength: 10,
                maxlength: 55
            },        
            dataEntrada: {
                required: true,
                minlength: 10
            },
            email: {
                required: true,
                email: true
            },
            dataSaida: {
                required: true,
                minlength: 10
            },
            adultos: {
                required: true,
                number: true,
                min: 1,
                max: 3
            },
            criancas: {
                required: true,
                number: true,
                max: 3
            }
        },
        messages: {
            nome: {
                required: "Campo nome é obrigatório",
                minlength: "O nome deve ter no mínimo 10 caracteres",
                maxlength: "O nome deve ter no máximo 55 caracteres"
            },
            dataEntrada: {
                required: "Campo entrada é obrigatório",
            },
            email: {
                required: "Campo e-mail é obrigatório",
                email: "O email deve estar no formato: xx@xxxxx.xxx"
            },
            dataSaida: {
                required: "Campo saída é obrigatório",
            },
            adultos: {
                required: "Campo adultos é obrigatório",
                number: "O campo só aceita numerais",
                min: "Deve ter no mínimo um adulto para reservar um quarto",
                max: "Deve ter no máximo 3 adultos em um quarto"
            },
            criancas: {
                required: "Campo crianças é obrigatório",
                number: "O campo só aceita numerais",
                max: "Deve ter no máximo 3 crianças em um quarto"
            }        
        },
        submitHandler: function (form) {
            var dados = Object.fromEntries(new FormData(form));

            fetch('http://localhost:3000/reservas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            })
            .then(function (resposta) {
                if (resposta.ok) {
                    alert("Reserva solicitada com sucesso!");
                    form.reset();
                } else {
                    alert("Erro ao salvar no servidor.");
                }
            })
            .catch(function () {
                alert("Erro de conexão com o servidor.");
            });
        }
    });
})

$(document).ready(function () {
    fetch("http://localhost:3000/reservas")
    .then((response) => response.json())
    .then((json) => {
        $('#tabelaInfos').empty();
        json.forEach(element => {
            let linha = `
                <tr>
                    <td>${element.id || ''}</td>
                    <td>${element.nome || ''}</td>
                    <td>${element.dataEntrada || ''}</td>
                    <td>${element.dataSaida || ''}</td>
                    <td>${element.observacoes || ''}</td>
                    <td>${element.email || ''}</td>
                    <td>${element.adultos || '0'}</td>
                    <td>${element.criancas || '0'}</td>
                </tr>
            `;
            $('#tabelaInfos').append(linha);
        });
    });
});

