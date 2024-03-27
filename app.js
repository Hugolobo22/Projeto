/* ************* VARIÁVEIS GLOBAIS ********* */

// Variável de controle do estoque a partir de vendas e compras
let estoque = []; // Este array deve possuir objetos
let usuarios = []; // Este array deve possuir objetos

// Varíavel opcional para fornecedores
let fornecedores = [];

/* ************* FUNÇÕES ********* */

function validarCPF(cpf) { // Utilizamos um validor de cpf utilizando o cálculo convencional para verificar a existência do cpf
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

    return parseInt(cpf.charAt(9)) === digitoVerificador1 && parseInt(cpf.charAt(10)) === digitoVerificador2;
}

function formatarCPF(cpf) { // Criamos uma função de formatar cpf, para que CPFs inseridos sem os pontos (.) e hifens (-), sejam alterados devidamente
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function validarEmail(email) { // Criamos uma função de validar email, para conferir se no email cadastrado possui um @ e ., para formar a sintaxe @email.com
    return /\S+@\S+\.\S+/.test(email);
}

function cadastrarUsuarios() { // No cadastro de usuários, inserimos pelo comando prompt, todas as informações necessárias, armazenando num object
    let nomeDoUsuario = prompt('Insira seu nome:');
    let cpf;
    let cpfValido = false;
    while (!cpfValido) { // chamamos a função de formatar cpf, validar email e cpf nessa parte do cadastro
        cpf = prompt('Insira seu CPF:');
        cpf = formatarCPF(cpf);
        cpfValido = validarCPF(cpf);
        if (!cpfValido) {
            console.log("CPF inválido. Por favor, insira um CPF válido.");
        }
    }
    let email;
    let emailValido = false;
    while (!emailValido) {
        email = prompt('Insira o seu e-mail:');
        emailValido = validarEmail(email);
        if (!emailValido) {
            console.log("E-mail inválido. Por favor, insira um e-mail válido.");
        }
    }
    let senha = prompt('Insira sua senha:');
    let cargo = prompt('Insira seu cargo:');

    let usuario = { nome: nomeDoUsuario, cpf: cpf, email: email, senha: senha, cargo: cargo };
    usuarios.push(usuario);
}

function listarUsuarios() { // Nessas partes de listar, usamos para que seja possível exibir os dados dos arrays globais declarados no início, na página principal
        console.log("Lista de Usuários:");
        for (let i = 0; i < usuarios.length; i++) {
            console.log(`Nome: ${usuarios[i].nome}, CPF: ${usuarios[i].cpf}, Email: ${usuarios[i].email}, Cargo: ${usuarios[i].cargo}`);
    }
}

function atualizarListaUsuarios() { // A função de atualizar é feita para atualizar a lista da função listar sempre que é recarregada
    let listaUsuariosDiv = document.getElementById('listaUsuarios');
    listaUsuariosDiv.innerHTML = '';

    for (let i = 0; i < usuarios.length; i++) {
        let usuario = usuarios[i];
        let usuarioTexto = `Nome: ${usuario.nome}, CPF: ${usuario.cpf}, Email: ${usuario.email}, Cargo: ${usuario.cargo}<br>`;
        listaUsuariosDiv.innerHTML += usuarioTexto;
    }
}

window.onload = function() {
    atualizarListaUsuarios();
}

function removerUsuario() { // A função remover é utilizada para remover um usuário específico por base do email
    let email, senha;
    let removido = false;

    while (!removido) {
        email = prompt("Digite o email do usuário que deseja remover:");
        senha = prompt("Digite a senha do usuário que deseja remover:");

        let index = usuarios.findIndex(usuario => usuario.email === email && usuario.senha === senha);
        if (index !== -1) {
            usuarios.splice(index, 1); // optamos pelo splice, devido à capacidade de retirar um index específico mais fácil, já que o pop, convencionalmente, retiraria o último
            console.log("Usuário removido com sucesso.");
            removido = true;
        } else {
            console.log("Usuário não encontrado ou senha incorreta, tente novamente.");
        }
    }
}

function alterarDadoUsuario() { // A função de alterar dados, serve para substituir dados já citados, por meio apenas de inserir um novo valor ao termo selecionado
    let email, senha;
    let alterado = false;

    while (!alterado){
        email = prompt("Digite o email do usuário para alterar os dados:");
        senha = prompt("Digite a senha do usuário para alterar os dados:");
        let usuario = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
        if (usuario) {
            let opcao = prompt("Qual dado você deseja alterar? (nome/cpf/email/senha/cargo)");
            switch (opcao.toLowerCase()) { // Utilizamos switch case para substituir apenas o termo específico, ao invés de ter que substituir todos os termos anteriores
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

function logarUsuario() { // A função logar serve para o usuário cadastrado entrar no sistema
    let email, senha;
    let logado = false;

    while (!logado) {
        email = prompt("Digite o email:");
        senha = prompt("Digite a senha:");
        let usuario = usuarios.find(usuario => usuario.email === email && usuario.senha === senha); // Utilizamos .find e if else para verificar se os dados estão corretos e no sistema
        if (usuario) {
            console.log("Login realizado com sucesso.");
            logado = true;
        } else {
            console.log("Email ou senha incorretos.");
        }
    }
}

function adicionarProduto() { // A função adicionar produto funciona similar ao cadastro de usuários, utilizando prompt para todos os dados da mesma
    let nomeDoProduto = prompt('Insira o nome do Carro:');
    let validade = prompt('Insira a data da revisão:');
    let cor = prompt('Insira a cor do carro:');
    let ano = parseInt(prompt('Insira o ano do carro:'));
    let marca = prompt('Insira a marca do carro:');

    let produto = { nome: nomeDoProduto, garantia: validade, cor: cor, ano: ano, marca: marca};
    estoque.push(produto);
}

function atualizarListaProduto() { // Mesmo conceito da listagem de usuários, para exibir no HTML
    let listaProdutosDiv = document.getElementById('listaProdutos');
    listaProdutosDiv.innerHTML = ''; // Limpar a lista antes de atualizar

    for (let i = 0; i < estoque.length; i++) {
        let produto = estoque[i];
        let produtoTexto = `Nome: ${produto.nome}, Garantia: ${produto.garantia}, Cor: ${produto.cor}, Ano: ${produto.ano}, Marca: ${produto.marca}<br>`;
        listaProdutosDiv.innerHTML += produtoTexto;
    }
}

window.onload = function() {
    atualizarListaUsuarios();
    atualizarListaProduto();
};

function validadeIndividual() { // Função utilizada para verificar a validade/data de revisão do produto selecionado por base do nome
    let nome = prompt("Digite o nome do produto para consultar a data da sua revisão:");
    let produto = estoque.find(item => item.nome === nome); // Utilizamos novamente o .find para encontrar e verificar o produto
    if (produto) {
        console.log(`A data da revisão do ${nome} é ${produto.garantia}.`);
    } else {
        console.log("Produto não encontrado.");
    }
}

function imprimirRelatorioValidades() { // A função serve para imprimir todos os produtos e suas respectivas datas de revisão
    console.log("Lista de Validades:");
    for (let i = 0; i < estoque.length; i++) {
        console.log(`Nome: ${estoque[i].nome}, Data da Revisão: ${estoque[i].garantia}`);
    }
}

function removerProduto() { // A função funciona com os mesmos fundamentos da função de remover usuários
    let remover = false;

    while (!remover) {
        let nome = prompt("Digite o nome do produto que deseja remover:");

        let produto = estoque.findIndex(item => item.nome === nome); // utilizamos findIndex para encontrar o index específico do produto selecionado, e usamos o Splice para removê-lo
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

function atualizarQuantidade() { // Utiliza o mesmo princípio da atualização de usuários, porém altera apenas a quantidade do produto selecionado
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

function cadastrarFornecedor() { // Função padrão de cadastro utilizando prompt
    let nomeDaEmpresa = prompt('Insira o nome da empresa:');
    let cnpj = prompt('Insira o CNPJ da empresa:');
    let email = prompt('Insira o email da empresa:');
    let telefone = prompt('Insira o telefone da empresa:');
    let produtos = [];

    let fornecedor = { nomeDaEmpresa, cnpj, email, telefone, produtos };
    fornecedores.push(fornecedor);

    console.log("Fornecedor cadastrado com sucesso.");
}

function listarFornecedores() { // Função padrão de listagem utilizando forEach
    console.log("Lista de Fornecedores:");
    fornecedores.forEach(fornecedor => {
        console.log(`Nome: ${fornecedor.nomeDaEmpresa}, CNPJ: ${fornecedor.cnpj}, Email: ${fornecedor.email}, Telefone: ${fornecedor.telefone}`);
    });
}

function removerFornecedor() { // Função padrão de remover utilizando findIndex e Splice
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

// Após todos os códigos acima, percebe-se que, após codificar todo o cadastro do usuário, o cadastro de produto e fornecedor
// é, basicamente, um código reciclado alterando os parâmetros para suas devidas circunstâncias


/*  --------- SEQUÊNCIA DE VALIDAÇÃO E TESTE DO CÓDIGO --------- */


console.log('******+++*******');
console.log('Sistema de controle de estoque');
console.log('******+++*******');

/* 01 - Processo de cadastro de 6 usuários */
for (let i = 0; i < 6; i++) {
    cadastrarUsuarios();
}

// /* 02 - Listar todos usuários cadastrados, com todas informações */
listarUsuarios();

/* 03 - Remover 1 dos usuários, qualquer um deles e depois listar novamente eles para ver se o usuário foi removido. */
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