import { carregarDados } from "./storage.js";

export function atualizarDashboard() {
    const dados = carregarDados();

    const horas = document.getElementById("horas-estudadas");
    const questoes = document.getElementById("questoes-resolvidas");
    const aproveitamento = document.getElementById("aproveitamento");

    if (horas) {
        horas.textContent = `${dados.horas}h`;
    }

    if (questoes) {
        questoes.textContent = dados.questoes;
    }

    if (aproveitamento) {
        const total = dados.acertos + dados.erros;

        const percentual = total === 0
            ? 0
            : Math.round((dados.acertos / total) * 100);

        aproveitamento.textContent = `${percentual}%`;
    }
}

document.addEventListener("DOMContentLoaded", atualizarDashboard);
