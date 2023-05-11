const user = document.querySelector('#iuser')
const password = document.querySelector('#ipassword')
const alert = document.querySelector('.alert')
const alertSuccess= document.querySelector('.alertSuccess')
const form = document.querySelector('#form')
const sectionForms = document.querySelector('.forms')
const buttonsCategory = document.querySelectorAll('.buttonsCategory')
const sectionDashboard = document.querySelector('.dashboard')
const btnListClients = document.querySelector('.btnListClients')
const btnListRequests = document.querySelector('.btnListRequests')
const btnListProducts = document.querySelector('.btnListProducts')
const btnRegisterProducts = document.querySelector('.btnRegisterProducts')
const btnLogout = document.querySelector('.btnLogout')
const divClients = document.querySelector('.clients')
const divRequests = document.querySelector('.requests')
const divProductsList = document.querySelector('.productsList')
const divProductRegister = document.querySelector('.productsRegister')
const formRegisterProduct = document.querySelector('#formRegisterProduct')

const api = "http://localhost:8080/lanchonete"

form.onsubmit = (e) => {
    e.preventDefault()
    if(validation(user, password)){
        sectionForms.classList.add('notVisible')
        sectionDashboard.classList.remove('notVisible')
    }
}

//Validação do formulário de login do Administrador
function validation(user, password){
    if (user.value != 'admin' || password.value != '12345678'){
        alert.innerHTML = `
            <span>Usuário e/ou senha incorreto. Tente novamente!</span>
        `
        setTimeout(() => {
                alert.style.left = '-100%'
        }, 3000);
        alert.style.left = '5%'

        return false
    }     
    return true
}

//Listando clientes cadastrados
btnListClients.onclick = () => {
    if (divClients.classList.contains('notVisible')){
        divClients.classList.remove('notVisible')
        btnListClients.classList.add('colorFixed')
    } else{
        divClients.classList.add('notVisible')
        btnListClients.classList.remove('colorFixed')
    }

    generateListClients()
}

//Listando pedidos feitos no Postman
btnListRequests.onclick = () => {
    if (divRequests.classList.contains('notVisible')){
        divRequests.classList.remove('notVisible')
        btnListRequests.classList.add('colorFixed')
    } else{
        divRequests.classList.add('notVisible')
        btnListRequests.classList.remove('colorFixed')
    }

    generateListRequests()
}

//Listando produtos cadastrados
btnListProducts.onclick = () => {
    if (divProductsList.classList.contains('notVisible')){
        divProductsList.classList.remove('notVisible')
        btnListProducts.classList.add('colorFixed')
    } else{
        divProductsList.classList.add('notVisible')
        btnListProducts.classList.remove('colorFixed')
    }

    generateListProducts()
}

//Cadastrando produtos
btnRegisterProducts.onclick = () => {
    if (divProductRegister.classList.contains('notVisible')){
        divProductRegister.classList.remove('notVisible')
        btnRegisterProducts.classList.add('colorFixed')
    } else{
        divProductRegister.classList.add('notVisible')
        btnRegisterProducts.classList.remove('colorFixed')
    }

    formRegisterProduct.onsubmit = (e) => {
        e.preventDefault()

        const name = document.forms['formRegisterProduct'].name.value
        const price = document.forms['formRegisterProduct'].price.value

        fetch(api + '/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                price
            })
        })
            .then(response => {
                return response.json().then(data => {
                    setTimeout(() => {
                        alertSuccess.innerHTML = ''
                    }, 2000);
                    if(data.message === 'success'){
                        alertSuccess.innerHTML = 'Produto cadastrado!'
                        formRegisterProduct.reset()
                    }
                }).catch(() => {
                    alertSuccess.innerHTML = 'Erro! Produto não cadastrado!'
                })
            })
    }
}

//Botão para logout
btnLogout.onclick = () => {
    sectionForms.classList.remove('notVisible')
    sectionDashboard.classList.add('notVisible')
    form.reset()
    location.reload()
}

//Adicionando evento no select
function addOnSelect(status, id){
    fetch(api + `/pedidos/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            status
        })
    })
        .then(response => {
            return response.json().then(data => {
                console.log(data.message)
                if(data.message === 'success'){
                    generateListRequests()
                } else{
                    alert('Não foi possível alterar o status do pedido!')
                }
            })
        })
}

//Adicionando evento de click no botão de remoção de produto
function addEventClickRemoveProduct(){
    const btnsRemove = document.querySelectorAll('.btnRemoveProduct')

    btnsRemove.forEach(btn => {
        btn.onclick = e => {
            const id = e.srcElement.dataset.id

            fetch(api + `/produtos/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    return response.json().then(data => {
                        if(data.message === 'success'){
                            generateListProducts()
                        }
                    })
                })
        }
    })
}

//Adicionando evento de click no botão de remoção de cliente
function addEventClickRemoveClient(){
    const btnsRemove = document.querySelectorAll('.btnRemoveClient')

    btnsRemove.forEach(btn => {
        btn.onclick = e => {
            const id = e.target.dataset.id

            fetch(api + `/clientes/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    return response.json().then(data => {
                        if(data.message === 'success'){
                            generateListClients()
                        }
                    })
                })
        }
    })
}

//Adicionando evento de click no botão de remoção de pedido
function addEventCLickRemoveRequest(){
    const btnsRemove = document.querySelectorAll('.btnRemoveRequest')

    btnsRemove.forEach(btn => {
        btn.onclick = e => {
            const id = e.target.dataset.id

            fetch(api + `/pedidos/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    return response.json().then(data => {
                        if(data.message === 'success'){
                            generateListRequests()
                        }
                    })
                })
        }
    })
}

//Gerando lista de clientes
function generateListClients(){
    fetch(api + '/clientes')
        .then(response => {
            return response.json().then(data => {
                let html = ''
                data.forEach(client => {
                    html  += `
                    <div class="res">
                        <ul class="list">
                            <li>Nome: ${client.name}</li>
                            <li>E-mail: ${client.email}</li>
                            <li>Endereço: ${client.adress}</li>
                            <li>
                                <a href="#" class="btnRemoveClient" data-id="${client._id}">Excluir</a>
                            </li>
                        </ul>
                    </div>
                    `
                })
                divClients.innerHTML = html
                addEventClickRemoveClient()
            })
        })
}

//Gerando lista de produtos cadastrados
function generateListProducts(){
    fetch(api + '/produtos')
        .then(response => {
            return response.json().then(data => {
                let html = ''
                let price = ''

                data.forEach(product => {
                    price = product.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
                    html += `
                    <div>
                        <ul class="list">
                            <li>Nome: ${product.name}</li>
                            <li>Preço: ${price}</li>
                            <li>
                                <a href="#" class="btnRemoveProduct" data-id="${product._id}">[Excluir]</a>
                            </li>
                        </ul>
                    </div>
                    `
                })
                divProductsList.innerHTML = html
                addEventClickRemoveProduct()
            })
        })
}

//Gerando lista de pedidos
function generateListRequests(){
    fetch(api + '/pedidos')
        .then(response => {
            return response.json().then(data => {
                let html = ''
                data.forEach(request => {
                    html += `
                    <div>
                        <ul class="list">
                            <li>Cliente (id): ${request.idClient}</li>
                            <li>Produto (id): ${request.idProduct}</li>
                            <li>Data: ${request.date}</li>
                            <li>Status: ${request.status}</li>
                            <li>Alterar status: 
                                <select class="select" data-id="${request._id}">
                                    <option value"pendente" selected>--Selecione--</option>
                                    <option value"pendente">Pendente</option>
                                    <option value"em preparo">Em preparo</option>
                                    <option value"em entrega">Em entrega</option>
                                    <option value"entregue">Entregue</option>
                                    <option value"cancelado">Cancelado</option>
                                </select>
                            </li>
                            <li>
                                <a href=# class="btnRemoveRequest" data-id="${request._id}">Excluir</a>
                            </li>
                        </ul>
                    </div>
                    `
                })
                divRequests.innerHTML = html
                addEventCLickRemoveRequest()

                const allSelect = document.querySelectorAll('.select')
                allSelect.forEach(select => {
                    select.onchange = (e) => {
                        const id = e.target.dataset.id
                        const valueSelected = select.options[select.selectedIndex].value

                        addOnSelect(valueSelected, id)  
                    }
                })       
            })
        })
}