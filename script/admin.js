const user = document.querySelector('#iuser')
const password = document.querySelector('#ipassword')
const result = document.querySelector('.result')
const form = document.querySelector('#form')
const sectionForms = document.querySelector('.forms')

form.onsubmit = (e) => {
    e.preventDefault()
    if(validation(user, password)){
        sectionForms.style.display = 'none'
    }

}

function validation(user, password){
    if (user.value != 'admin' || password.value != '12345678'){
        result.innerHTML = `
            <span>Usuário e/ou senha incorreto. Tente novamente!</span>
        `
        setTimeout(() => {
                result.style.left = '-100%'
        }, 3000);
        result.style.left = '5%'

        return false
    }     
    return true
}