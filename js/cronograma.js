export class Cronograma {
    constructor() {
        this.dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
        this.horasPorDia = 2;
        this.semanas = 156;
    }

    gerarSemana(numeroSemana) {
        const semana = [];

        this.dias.forEach((dia) => {
            semana.push({
                dia,
                horas: this.horasPorDia,
                atividades: [
                    {
                        tipo: "Conteúdo",
                        disciplina: "",
                        assunto: "",
                        concluido: false
                    },
                    {
                        tipo: "Questões",
                        quantidade: 20,
                        concluido: false
                    },
                    {
                        tipo: "Revisão",
                        periodo: "24h",
                        concluido: false
                    }
                ]
            });
        });

        return {
            semana: numeroSemana,
            dias: semana
        };
    }

    gerarCronogramaCompleto() {
        const cronograma = [];

        for (let i = 1; i <= this.semanas; i++) {
            cronograma.push(this.gerarSemana(i));
        }

        return cronograma;
    }
             }
