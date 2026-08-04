import { carregarDados, salvarDados } from "./storage.js";

export function registrarQuestao(acertou) {
    const dados = carregarDados();

    dados.questoes++;

    if (acertou) {
        dados.acertos++;
    } else {
        dados.erros++;
    }

    salvarDados(dados);
}

export function estatisticasQuestoes() {
    const dados = carregarDados();

    const total = dados.acertos + dados.erros;

    return {
        respondidas: dados.questoes,
        acertos: dados.acertos,
        erros: dados.erros,
        aproveitamento:
            total === 0 ? 0 : Math.round((dados.acertos / total) * 100)
    };
}
