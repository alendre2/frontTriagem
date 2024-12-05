const url = "http://localhost:8080/pacientes"
const respostaCriarPaciente = "Paciente cadastrado!"
const erroAoCriarPaciente = "Não foi possível cadastrar o paciente, tente novamente."

function postUser(paciente) {
    axios.post(url, paciente)
        .then(response => {
            console.log(response.data)
            alert(respostaCriarPaciente, response.data);
        })
        .catch(error => {
            console.error('Não foi possível cadastrar o paciente! ', error);
            alert(erroAoCriarPaciente)
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const adicionarPaciente = document.getElementById('adicionarPaciente');

    adicionarPaciente.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const preferencial = document.getElementById('preferencial').checked;

        const paciente = {
            nome: nome,
            preferencial: preferencial
        };

        postUser(paciente);
    });
});

