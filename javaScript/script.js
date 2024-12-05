const url = "http://localhost:8080/pacientes"

const respostaCriarPaciente = "Paciente cadastrado!"
const erroAoCriarPaciente = "Não foi possível cadastrar o paciente, tente novamente."
const respostaAtualizarPaciente = "Sucesso! dados cadastrais foram atualizados."
const respostaDeletarPaciente = "Paciente excluído."

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


function deletePaciente(id){
    const urlDeletar = `http://localhost:8080/pacientes/${id}`;

    axios.delete(urlDeletar)
    .then(response => {
        console.log(response.data);
        alert(respostaDeletarPaciente);
    })
    .catch(error => {
        log.error("Não foi possível deletar o paciente.", error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const deletarPaciente = document.getElementById('deletarPaciente');

    deletarPaciente.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = parseInt(document.getElementById('deleteId').value);
        deletePaciente(id);
    });
});

function getPaciente(nome) {
    const urlListarPorNome = `http://localhost:8080/pacientes/listar_por_nome?nome=${nome}`

    axios.get(urlListarPorNome)
        .then(response => {
            const searchResults = document.getElementById('searchResults');
            searchResults.innerHTML = '';

            if (response.data.length > 0) {
                response.data.forEach(paciente => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Nome: ${paciente.nome}, Preferencial: ${paciente.preferencial}`;

                    searchResults.appendChild(listItem);
                });
            } 
            else {
                const noResults = document.createElement('li');
                noResults.textContent = 'Nenhum paciente encontrado com esse nome.';
                searchResults.appendChild(noResults);
            }
        })
        .catch(error => {
            console.error("Erro ao listar pacientes: ", error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const listarPorNome = document.getElementById('listarPorNome');

    listarPorNome.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('buscarPorNome').value;
        
        if (nome) {
            getPaciente(nome);
        }
    });
});


function listarPacientes() {
    axios.get(url)
        .then(response => {
            const pacientes = response.data;
            const lista = document.getElementById('listaDePacientes');
            lista.innerHTML = '';

            if (pacientes.length > 0) {
                pacientes.forEach(paciente => {
                    const li = document.createElement('li');
                    li.textContent = `Nome: ${paciente.nome}, Preferencial: ${paciente.preferencial}`;
                    lista.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'Nenhum paciente encontrado.';
                lista.appendChild(li);
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os pacientes: ", error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const botaoListarPacientes = document.getElementById('listarPacientes');
    botaoListarPacientes.addEventListener('click', listarPacientes);
});