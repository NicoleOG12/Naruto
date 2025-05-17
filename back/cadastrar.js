function cadastrar() {
    let nome = document.querySelector('#Nome').value.trim();
    let email = document.querySelector('#Email').value.trim();
    let dataNascimento = document.querySelector('#Data').value;
    let senha = document.querySelector('#Senha').value;

    if (!nome || !email || !dataNascimento || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('banco')) || [];

    let existe = usuarios.some(user => user.email === email);
    if (existe) {
        alert("Este e-mail já está cadastrado.");
        return;
    }

    let novoId = usuarios.length > 0 ? Math.max(...usuarios.map(user => user.id)) + 1 : 1;

    let novoUsuario = {
        id: novoId,
        nome,
        email,
        senha,
        dataNascimento
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('banco', JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = 'login.html';
}
