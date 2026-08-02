// =========================================
// MedTrack UFPR
// Arquivo principal da aplicação
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("MedTrack UFPR iniciado com sucesso!");

    inicializarDashboard();

});

function inicializarDashboard() {

    carregarProgresso();

    atualizarCards();

}

function carregarProgresso() {

    if (!localStorage.getItem("medtrack")) {

        const dados = {

            progresso: 0,

            horas: 0,

            questoes: 0,

            acertos: 0,

            erros: 0,

            revisoes: [],

            disciplinas: {}

        };

        localStorage.setItem("medtrack", JSON.stringify(dados));

    }

}

function atualizarCards() {

    const dados = JSON.parse(localStorage.getItem("medtrack"));

    console.log(dados);

}
