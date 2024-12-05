const url = "http://localhost:8080/pacientes"

const respostaCriarPaciente = "Paciente cadastrado!"
const erroAoCriarPaciente = "Não foi possível cadastrar o paciente, tente novamente."
const respostaAtualizarPaciente = "Sucesso! dados cadastrais foram atualizados."

function postPaciente(paciente) {
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

        postPaciente(paciente);
    });
});


function putPaciente(id, paciente){
    const urlAtualizar =  `http://localhost:8080/pacientes/${id}`;
    axios.put(urlAtualizar, paciente)
    .then(response => {
        console.log(response.data);
        alert(respostaAtualizarPaciente);
    })
    .catch(error => {
        console.error("Erro ao atualizar os dados cadastrais do paciente: ", error)
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const atualizarPaciente = document.getElementById('atualizarPaciente');

    atualizarPaciente.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = parseInt(document.getElementById('id').value);
        const nome = document.getElementById('atualizarNome').value;
        const preferencial = document.getElementById('atualizarStatusPreferencial').checked;

        const paciente = {
            nome: nome,
            preferencial: preferencial
        };

        putPaciente(id, paciente);
    });
});

func
