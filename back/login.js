console.log('Olá JS')

function get_name() {
    let n = document.querySelector("#nome").value
    console.log('Seu nome é: '+n)
}

function login() {
    let lg = document.querySelector('#email').value
    let sn = parseInt (document.querySelector('#senha').value)

    let dados = [
                    {id:1, nome:"Nicole", login:"nicole", senha:"1234", email:"nicole@gmail.com" },
                    {id:2, nome:"Júlia", login:"julia", senha:"5678", email:"julia@gmail.com" },
                    {id:3, nome:"Isabella", login:"isabella", senha:"2468", email:"isabella@gmail.com" },
                    {id:4, nome:"Ana", login:"ana", senha:"1357", email:"ana@gmail.com" }
                ]

    for(let i=0; i < dados.length; i++){
        if(lg == dados[i].email && sn == dados[i].senha) {
            alert("Logou!" + dados.length)
            alert("Seu nome é:" + dados[i].nome + "\n Email:" + dados[i].email)
        }
    }
}


