function dados() {
    if (!localStorage.getItem('banco')) {
        const ds = [
            {id: 1, nome: "Nicole", email: "nicole@gmail.com", senha: "1234"},
            {id: 2, nome: "Julia", email: "julia@gmail.com", senha: "5678"},
            {id: 3, nome: "Isabella", email: "isabella@gmail.com", senha: "1357"},
            {id: 4, nome: "Ana", email: "ana@gmail.com", senha: "2468"}
        ];
        let json = JSON.stringify(ds);
        localStorage.setItem('banco', json);
    }
}


function logar() {
    const ds = JSON.parse(localStorage.getItem('banco'))

    let lg = document.querySelector('#email').value
    let sn = document.querySelector('#senha').value

    for (let i=0; i<ds.length; i++) {
        if(lg == ds[i].email && sn == ds[i].senha) {
            alert('Bem-vindo: '+ ds[i].nome)

            sessionStorage.setItem("user", ds[i].nome)

           localStorage.setItem('usuarioLogado', JSON.stringify(ds[i]));
            window.location.href = 'home.html'; 
            return;
           
        }
    }
    alert('Usuário ou senha inválidos.');
}

function logado() {
    let usuario = sessionStorage.getItem('user')
    document.querySelector('#usuario').value = usuario
}