import { carregarDados } from "./storage.js";

const disciplinas = [
    ["Matemática", "../data/matematica.json"],
    ["Química", "../data/quimica.json"],
    ["Biologia", "../data/biologia.json"],
    ["Física", "../data/fisica.json"],
    ["História", "../data/historia.json"],
    ["Geografia", "../data/geografia.json"],
    ["Português", "../data/portugues.json"],
    ["Literatura", "../data/literatura.json"],
    ["Filosofia", "../data/filosofia.json"],
    ["Sociologia", "../data/sociologia.json"],
    ["Inglês", "../data/ingles.json"]
];

async function carregarConteudos() {
    const resultados = await Promise.all(
        disciplinas.map(async ([nome, arquivo]) => {
            try {
                const resposta = await fetch(arquivo);

                if (!resposta.ok) {
                    throw new Error(`Erro ao carregar ${arquivo}`);
                }

                const conteudos = await resposta.json();

                return {
                    nome,
                    conteudos
                };

            } catch (erro) {
                console.error(`Não foi possível carregar ${nome}:`, erro);

                return {
                    nome,
                    conteudos: []
                };
            }
        })
    );

    return resultados;
}

function calcularProgresso(conteudos) {
    if (!conteudos.length) {
        return 0;
    }

    const concluidos = conteudos.filter(
        item => item.concluido === true
    ).length;

    return Math.round((concluidos / conteudos.length) * 100);
}

function atualizarDashboard(disciplinasCarregadas) {

    const dados = carregarDados();

    let totalConteudos = 0;
    let totalConcluidos = 0;
    let totalQuestoes = Number(dados.questoes) || 0;
    let totalAcertos = Number(dados.acertos) || 0;
    let totalErros = Number(dados.erros) || 0;

    disciplinasCarregadas.forEach(disciplina => {

        totalConteudos += disciplina.conteudos.length;

        totalConcluidos += disciplina.conteudos.filter(
            item => item.concluido === true
        ).length;

    });

    const progressoGeral = totalConteudos === 0
        ? 0
        : Math.round((totalConcluidos / totalConteudos) * 100);

    const totalQuestoesRegistradas =
        totalQuestoes + totalAcertos + totalErros;

    const aproveitamento =
        totalQuestoesRegistradas === 0
            ? 0
            : Math.round(
                (totalAcertos / totalQuestoesRegistradas) * 100
            );

    const horas = document.getElementById("horas");
    const questoes = document.getElementById("questoes");
    const aproveitamentoElemento =
        document.getElementById("aproveitamento");

    if (horas) {
        horas.textContent = `${dados.horas || 0}h`;
    }

    if (questoes) {
        questoes.textContent = totalQuestoesRegistradas;
    }

    if (aproveitamentoElemento) {
        aproveitamentoElemento.textContent = `${aproveitamento}%`;
    }

    console.log("MedTrack UFPR");
    console.log("Progresso geral:", progressoGeral + "%");
    console.log("Conteúdos:", totalConcluidos, "/", totalConteudos);
    console.log("Disciplinas:", disciplinasCarregadas);
}

async function inicializarDashboard() {

    try {

        const disciplinasCarregadas =
            await carregarConteudos();

        atualizarDashboard(disciplinasCarregadas);

    } catch (erro) {

        console.error(
            "Erro ao inicializar o Dashboard:",
            erro
        );

    }
}

document.addEventListener(
    "DOMContentLoaded",
    inicializarDashboard
);
