const formRegisterClient = document.querySelector('#formRegisterClient')
const registerSuccess = document.querySelector('.registerSuccess')

const api = "http://localhost:8080/lanchonete"
let listEmail = []
let listTel = []

//Buscando clientes cadastrados e validando email
formRegisterClient.onsubmit = e => {
    e.preventDefault()

    const name = document.forms['formRegisterClient'].name.value
    const email = document.forms['formRegisterClient'].email.value
    const tel = document.forms['formRegisterClient'].tel.value
    const adress = document.forms['formRegisterClient'].adress.value

    fetch(api + '/clientes')
        .then(response => {
            return response.json().then(data => {
                data.forEach(client => {
                    listEmail.push(client.email)
                    listTel.push(client.tel)
                })
                if(listEmail.includes(email)){
                    setTimeout(() => {
                        registerSuccess.innerHTML = ''
                    }, 2000);
                    registerSuccess.innerHTML = 'Erro! E-mail já cadastrado!'
                } else if(listTel.includes(parseInt(tel))){
                    setTimeout(() => {
                        registerSuccess.innerHTML = ''
                    }, 2000);
                    registerSuccess.innerHTML = 'Erro! Telefone já cadastrado!'
                } else{
                    addClient(name, email, tel, adress)
                }
            })
        })
}

//Adicionando um novo cliente
function addClient(name, email, tel, adress){
    fetch(api + '/clientes', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name,
            email,
            tel,
            adress
        })
    })
        .then(response => {
            return response.json().then(data => {
                if(data.message === 'success'){
                    setTimeout(() => {
                        registerSuccess.innerHTML = ''
                    }, 2000);
                    formRegisterClient.reset()
                    registerSuccess.innerHTML = 'Cadastro realizado com sucesso!'
                }
            })
        })
}