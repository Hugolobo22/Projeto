/* ************* VARIÁVEIS GLOBAIS ********* */

// Variável de controle do estoque a partir de vendas e compras
let estoque = []; // Este array deve possuir objetos
let usuarios = []; // Este array deve possuir objetos

// Varíavel opcional para fornecedores
let fornecedores = [];

/* ************* FUNÇÕES ********* */

function cadastrarUsuarios() {
    let nomeDoUsuario = prompt('Insira seu nome:');
    let cpf = parseFloat(prompt('Insira seu CPF:'));
    let email = prompt('Insira o seu e-mail:');
    let senha = prompt('Insira sua senha:');
    let cargo = prompt('Insira seu cargo:');

    let usuario = { nome: nomeDoUsuario, cpf: cpf, email: email, senha: senha, cargo: cargo };
    usuarios.push(usuario);
}

function listarUsuarios() {
        console.log("Lista de Usuários:");
        for (let i = 0; i < usuarios.length; i++) {
            console.log(`Nome: ${usuarios[i].nome}, CPF: ${usuarios[i].cpf}, Email: ${usuarios[i].email}, Cargo: ${usuarios[i].cargo}`);
    }
}

function removerUsuario() {
    let email, senha;
    let removido = false;

    while (!removido) {
        email = prompt("Digite o email do usuário que deseja remover:");
        senha = prompt("Digite a senha do usuário que deseja remover:");

        let index = usuarios.findIndex(usuario => usuario.email === email && usuario.senha === senha);
        if (index !== -1) {
            usuarios.splice(index, 1);
            console.log("Usuário removido com sucesso.");
            removido = true;
        } else {
            console.log("Usuário não encontrado ou senha incorreta, tente novamente.");
        }
    }
}

function alterarDadoUsuario() {
    let email, senha;
    let alterado = false;

    while (!alterado){
        email = prompt("Digite o email do usuário para alterar os dados:");
        senha = prompt("Digite a senha do usuário para alterar os dados:");
        let usuario = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
        if (usuario) {
            let opcao = prompt("Qual dado você deseja alterar? (nome/cpf/email/senha/cargo)");
            switch (opcao.toLowerCase()) {
                case 'nome':
                    usuario.nome = prompt("Digite o novo nome:");
                    break;
                case 'cpf':
                    usuario.cpf = prompt("Digite o novo CPF:");
                    break;
                case 'email':
                    usuario.email = prompt("Digite o novo email:");
                    break;
                case 'senha':
                    usuario.senha = prompt("Digite a nova senha:");
                    break;
                case 'cargo':
                    usuario.cargo = prompt("Digite o novo cargo:");
                    break;
                default:
                    console.log("Opção inválida.");
            }
            console.log("Dados do usuário alterados com sucesso.");
            break
        } else {
            console.log("Usuário não encontrado ou senha incorreta, tente novamente.");
        }
    }
}

function logarUsuario() {
    let email, senha;
    let logado = false;

    while (!logado) {
        email = prompt("Digite o email:");
        senha = prompt("Digite a senha:");
        let usuario = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
        if (usuario) {
            console.log("Login realizado com sucesso.");
            logado = true;
        } else {
            console.log("Email ou senha incorretos.");
        }
    }
}

function adicionarProduto() {
    let nomeDoProduto = prompt('Insira o nome do Carro:');
    let validade = prompt('Insira a data da revisão:');
    let cor = prompt('Insira a cor do carro:');
    let ano = parseInt(prompt('Insira o ano do carro:'));
    let marca = prompt('Insira a marca do carro:');

    let produto = { nome: nomeDoProduto, garantia: validade, cor: cor, ano: ano, marca: marca};
    estoque.push(produto);
}

function validadeIndividual() {
    let nome = prompt("Digite o nome do produto para consultar a data da sua revisão:");
    let produto = estoque.find(item => item.nome === nome);
    if (produto) {
        console.log(`A data da revisão do ${nome} é ${produto.garantia}.`);
    } else {
        console.log("Produto não encontrado.");
    }
}

function imprimirRelatorioValidades() {
    console.log("Lista de Validades:");
    for (let i = 0; i < estoque.length; i++) {
        console.log(`Nome: ${estoque[i].nome}, Data da Revisão: ${estoque[i].garantia}`);
    }
}

function removerProduto() {
    let remover = false;

    while (!remover) {
        let nome = prompt("Digite o nome do produto que deseja remover:");

        let produto = estoque.findIndex(item => item.nome === nome);
        if (produto !== -1) {
            estoque.splice(produto, 1);
            console.log("Produto removido com sucesso.");
            removido = true;
            break
        } else {
            console.log("Produto não encontrado, tente novamente.");
        }
    }
}

function atualizarQuantidade() {
    let remo = false

    while (!remo){
        let nome = prompt("Digite o nome do produto para atualizar sua quantidade:");
        let quantidade = parseInt(prompt("Digite a nova quantidade do produto:"));

        let produtoIndex = estoque.findIndex(item => item.nome === nome);
        if (produtoIndex !== -1) {
            estoque[produtoIndex].quantidade = quantidade;
            console.log(`Quantidade do produto ${nome} atualizada para ${quantidade}.`);
            remo = true
            break
        } else {
            console.log("Produto não encontrado.");
        }
    }
}

function cadastrarFornecedor() {
    let nomeDaEmpresa = prompt('Insira o nome da empresa:');
    let cnpj = prompt('Insira o CNPJ da empresa:');
    let email = prompt('Insira o email da empresa:');
    let telefone = prompt('Insira o telefone da empresa:');
    let produtos = [];

    let fornecedor = { nomeDaEmpresa, cnpj, email, telefone, produtos };
    fornecedores.push(fornecedor);

    console.log("Fornecedor cadastrado com sucesso.");
}

function listarFornecedores() {
    console.log("Lista de Fornecedores:");
    fornecedores.forEach(fornecedor => {
        console.log(`Nome: ${fornecedor.nomeDaEmpresa}, CNPJ: ${fornecedor.cnpj}, Email: ${fornecedor.email}, Telefone: ${fornecedor.telefone}`);
    });
}

function removerFornecedor() {
    let remove = false

    while (!remove){
        let email = prompt("Digite o email do fornecedor que deseja remover:");

        let index = fornecedores.findIndex(fornecedor => fornecedor.email === email);
        if (index !== -1) {
            fornecedores.splice(index, 1);
            console.log("Fornecedor removido com sucesso.");
            remove = true
            break
        } else {
            console.log("Fornecedor não encontrado.");
        }
    }
}


/*  --------- SEQUÊNCIA DE VALIDAÇÃO E TESTE DO CÓDIGO --------- */


console.log('******+++*******');
console.log('Sistema de controle de estoque');
console.log('******+++*******');

/* 01 - Processo de cadastro de 6 usuários */
for (let i = 0; i < 6; i++) {
    cadastrarUsuarios();
}

/* 02 - Listar todos usuários cadastrados, com todas informações */
listarUsuarios();

/* 03 - Remover 1 dos usuários, qualquer um deles e depois listar novamente eles
        para ver se o usuário foi removido. */
removerUsuario();
listarUsuarios();

/* 04 - Alterar algum dado do usuário */
alterarDadoUsuario();
listarUsuarios();

/* 05 - Fazer login com um dos usuários cadastrados */
logarUsuario();

/* 06 - Cadastrar pelo menos 15 produtos */
for (let i = 0; i < 15; i++) {
    adicionarProduto();
}

/* 07 - Consultar validade individualmente de um produto */
validadeIndividual();

/* 08 - Consultar validade de todos os produtos em formato relatório */
imprimirRelatorioValidades();

/* 09 - Remover pelo menos 5 produtos */
for (let i = 0; i < 5; i++) {
removerProduto();
}

/* 10 - Atualizar a quantidade de pelo menos 5 produtos */
for (let i = 0; i < 5; i++) {
atualizarQuantidade();
}

/* 11 - Cadastrar fornecedor, no minimo 3 */
for (let i = 0; i < 3; i++) {
cadastrarFornecedor();
}

/* 12 - Listar fornecedores */
listarFornecedores();

/* 13 - Remover 1 fornecedor e depois imprimir a lista completa */
removerFornecedor();
listarFornecedores();