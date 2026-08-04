import { carregarDados, salvarDados } from "./storage.js";

const INTERVALOS = [1, 7, 30, 90, 180];

export function agendarRevisoes(dataInicial = new Date()) {
    return INTERVALOS.map((dias) => {
        const data = new Date(dataInicial);
        data.setDate(data.getDate() + dias);

        return {
            dias,
            data: data.toISOString().split("T")[0],
            concluida: false
        };
    });
}

export function concluirRevisao(disciplina, assunto, dias) {
    const dados = carregarDados();

    if (!dados.disciplinas[disciplina]) return;

    const topico = dados.disciplinas[disciplina].find(
        (item) => item.nome === assunto
    );

    if (!topico) return;

    const revisao = topico.revisoes.find((r) => r.dias === dias);

    if (revisao) {
        revisao.concluida = true;
    }

    salvarDados(dados);
}

export function revisarHoje() {
    const hoje = new Date().toISOString().split("T")[0];
    const dados = carregarDados();

    const pendentes = [];

    Object.keys(dados.disciplinas).forEach((disciplina) => {
        dados.disciplinas[disciplina].forEach((topico) => {
            if (!topico.revisoes) return;

            topico.revisoes.forEach((revisao) => {
                if (!revisao.concluida && revisao.data === hoje) {
                    pendentes.push({
                        disciplina,
                        assunto: topico.nome,
                        dias: revisao.dias
                    });
                }
            });
        });
    });

    return pendentes;
}
