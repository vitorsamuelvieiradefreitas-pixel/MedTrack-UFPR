export class GerenciadorDisciplinas {

    constructor() {
        this.disciplinas = [];
    }

    async carregar(nomeArquivo) {
        try {
            const resposta = await fetch(`../data/${nomeArquivo}.json`);

            if (!resposta.ok) {
                throw new Error(`Erro ao carregar ${nomeArquivo}.json`);
            }

            return await resposta.json();

        } catch (erro) {
            console.error(erro);
            return null;
        }
    }

    async carregarTodas() {

        const lista = [
            "matematica",
            "quimica",
            "biologia",
            "fisica",
            "historia",
            "geografia",
            "portugues",
            "literatura",
            "filosofia",
            "sociologia",
            "ingles",
            "producao_textual"
        ];

        this.disciplinas = [];

        for (const disciplina of lista) {

            const dados = await this.carregar(disciplina);

            if (dados) {
                this.disciplinas.push(dados);
            }

        }

        return this.disciplinas;
    }

    getQuantidadeDisciplinas() {
        return this.disciplinas.length;
    }

}
