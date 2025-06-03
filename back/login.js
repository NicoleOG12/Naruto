// função que inicializa os dados de usuários no localStorage
function dados() {
    // verifica se já existe um banco de dados no localStorage
    if (!localStorage.getItem('usuarios')) {
        // se não houver, cria um banco de dados
        const usuarios = [
            {id: 1, nome: "Nicole", email: "nicole@gmail.com", senha: "1234"},
            {id: 2, nome: "Julia", email: "julia@gmail.com", senha: "5678"},
            {id: 3, nome: "Isabella", email: "isabella@gmail.com", senha: "1357"},
            {id: 4, nome: "Ana", email: "ana@gmail.com", senha: "2468"}
        ];
        // converte o banco de dados para formato JSON
        let jsonUsuarios = JSON.stringify(usuarios);
        // armazena o banco de dados no localStorage
        localStorage.setItem('usuarios', jsonUsuarios);
    }

    // verifica se já existe um banco de dados para admin no localStorage
    if (!localStorage.getItem('admin')) {
        // se não houver, cria um banco de dados 
        const admin = [
            {id: 1, nome: "Admin", email: "admin@gmail.com", senha: "admin1234"}
        ];
        // converte o banco de dados de admin para formato JSON
        let jsonadmin = JSON.stringify(admin);
        // armazena o banco de dados no localStorage
        localStorage.setItem('admin', jsonadmin);
    }
}

// função que realiza o login do usuário
function logar() {
    // carrega o banco de usuários e administradores do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const admin = JSON.parse(localStorage.getItem('admin'));

    // pega os valores digitados pelo usuário no formulário de login
    let lg = document.querySelector('#email').value;
    let sn = document.querySelector('#senha').value;

    let usuarioEncontrado = null;

    // verifica no banco de admin
    for (let i = 0; i < admin.length; i++) {
        if (lg == admin[i].email && sn == admin[i].senha) {
            // se os dados estiverem corretos, armazena o admin logado
            alert('Bem-vindo, Admin: ' + admin[i].nome);
            localStorage.setItem('usuarioLogado', JSON.stringify(admin[i]));
            usuarioEncontrado = admin[i];  // marca como encontrado e sai do loop
       
            window.location.href = 'admin.html';
            break;
        }
    }

    // caso não tenha encontrado no banco de admin, verifica no banco de usuários
    if (!usuarioEncontrado) {
        for (let i = 0; i < usuarios.length; i++) {
            if (lg == usuarios[i].email && sn == usuarios[i].senha) {
                // se os dados estiverem corretos, exibe a mensagem de boas-vindas
                alert('Bem-vindo: ' + usuarios[i].nome);

                // armazena o nome do usuário na sessionStorage para mantê-lo logado
                sessionStorage.setItem("user", usuarios[i].nome);

                // armazena as informações do usuário logado no localStorage
                localStorage.setItem('usuarioLogado', JSON.stringify(usuarios[i]));

                usuarioEncontrado = usuarios[i];  // marca como encontrado e sai do loop
             
                window.location.href = 'home.html';
                break;
            }
        }
    }

    // Se nenhum usuário ou admin for encontrado, alerta que as credenciais são inválidas
    if (!usuarioEncontrado) {
        alert('Usuário ou senha inválidos.');
    }
}

// função que exibe o nome do usuário logado no campo do formulário
function logado() {
    // pega o nome do usuário logado da sessionStorage
    let usuario = sessionStorage.getItem('user');
    // preenche o campo de entrada com o nome do usuário
    document.querySelector('#usuario').value = usuario;
}

// função para redefinir a senha
function redefinirSenha(event) {
    event.preventDefault();  // evita o envio do formulário ao recarregar a página

    // pega os dados inseridos pelo usuário
    let email = document.querySelector('#emailRedefinir').value;
    let novaSenha = document.querySelector('#RedefinirSenha').value;
    let confirmarSenha = document.querySelector('#ConfirmarSenha').value;

    // verifica se as senhas são iguais
    if (novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    // carrega o banco de usuários e administradores
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const admin = JSON.parse(localStorage.getItem('admin'));

    // busca o usuário pelo email no usuários
    let usuarioEncontrado = usuarios.find(user => user.email === email);
    if (!usuarioEncontrado) {
        // busca o usuário pelo email nos administradores
        usuarioEncontrado = admin.find(user => user.email === email);
    }

    if (usuarioEncontrado) {
        // atualiza a senha do usuário 
        usuarioEncontrado.senha = novaSenha;

        // salva as alterações no localStorage
        if (usuarios.find(user => user.email === email)) {
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        } else {
            localStorage.setItem('admin', JSON.stringify(admin));
        }

        alert('Senha redefinida com sucesso!');
        window.location.href = 'login.html';
    } else {
        alert('Email não encontrado.');
    }
}

// chama a função que inicializa o banco de usuários
dados();
