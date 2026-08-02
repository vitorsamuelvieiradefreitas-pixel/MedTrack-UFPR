const STORAGE_KEY = "medtrack-ufpr";

export function carregarDados() {
    const dados = localStorage.getItem(STORAGE_KEY);

    if (!dados) {
        return {
            horas: 0,
            questoes: 0,
            acertos: 0,
            erros: 0,
            disciplinas: {}
        };
    }

    return JSON.parse(dados);
}

export function salvarDados(dados) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
}

export function limparDados() {
    localStorage.removeItem(STORAGE_KEY);
              }
