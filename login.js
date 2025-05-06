// dicionario de dados
function dados() {
    const ds = [
        {id: 1, login: "nicole", senha: "1234", nome: "Nicole", email: "nicole@gmail.com"},
        {id: 2, login: "julia", senha: "12345", nome: "Julia", email: "julia@gmail.com"},
        {id: 3, login: "isabela", senha: "123456", nome: "Isabela", email: "isabela@gmail.com"},
        {id: 3, login: "ana", senha: "1234567", nome: "Ana", email: "ana@gmail.com"}
    ]
    let json = JSON.stringify(ds)
    localStorage.setItem('banco', json)
    // return ds
}

function logar() {
    // retorna os dados da função
    // const ds = dados()

    const ds = JSON.parse(localStorage.getItem('banco'))

    let lg = document.querySelector('#email').value
    let sn = document.querySelector('#senha').value

    for (let i=0; i<ds.length; i++) {
        if(lg == ds[i].login && sn == ds[i].senha) {
            // console.log('Seu login é: ' + ds[i].login + "\n Seu nome é: " + ds[i].nome)
            alert('Bem-vindo: '+ ds[i].nome)

            sessionStorage.setItem('user', ds[i].nome)
            sessionStorage.setItem('email', ds[i].email)

            // alert(ds)

            // redirecionar página
            window.location.href = 'sobre.html'

            break;
           
        }
    }
}

function logado() {
    let usuario = sessionStorage.getItem('user')
    document.querySelector('#usuario').value = usuario
}