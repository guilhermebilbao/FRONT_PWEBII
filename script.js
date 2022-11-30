
window.addEventListener('load', start);

// Declarando Variáveis Globais
var GlobalNames = ['Um', 'Dois', 'Três', 'Quatro', 'Cinco'];
var nomes = document.querySelector('#nomes');
var ul = document.createElement('ul');
var Input = document.getElementById('nome');
var form = document.getElementById('Formulario');
var IsEditing = false;
var Posicao;

function start() {
  PrevenirComportamentoDefault(form);
  AplicarFoco(Input);
  CapturarValoresDigitados(Input);
  ExibirVetor();
}

function PrevenirComportamentoDefault(Objeto) {
  Objeto.addEventListener('submit', function (event) {
    event.preventDefault();
  });
}

function AplicarFoco(Objeto) {
  Objeto.focus();
}

function CapturarValoresDigitados(Objeto) {
  Objeto.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      var ValorDigitado = event.target.value; // Obtendo conteudo digitado

      // Se algum valor tiver sido digitado, então editar ou inserir
      if (ValorDigitado) {
        if (IsEditing) {
          // Editando valores
          GlobalNames.splice(Posicao, 1, ValorDigitado);
          IsEditing = false; // Desativando modo de edição
        } else {
          // Inserindo valores
          GlobalNames.push(ValorDigitado); // Inserindo no array GlobalNames
        }
      }

      ExibirVetor(); // Atualizar site e Exibir vetor com novo valor
    }
  });
}

function ExibirVetor() {
  // Limpando conteudo da ul e input para receber novos valores
  ul.innerHTML = '';
  Input.value = '';

  // Para cada posição do vetor, executar a função PercorrerVetor
  GlobalNames.forEach(PercorrerVetor);
  nomes.appendChild(ul); // Adicionar ul na div nomes para ser exibida no site
}

function PercorrerVetor(item) {
  var li = document.createElement('li');

  li.appendChild(CriarBotao()); // Cria e adiciona o botão x na li
  li.appendChild(CriarSpan(item)); // Cria e adiciona o span na li
  ul.appendChild(li); // Adicionando li na ul
}

function CriarBotao() {
  var botao = document.createElement('button');
  // Adicionando classe DeleteButton
  botao.classList.add('DeleteButton');
  botao.textContent = 'x'; // Adicionando conteúdo x

  // Retornando botão criado ao ponto de chamada desta função
  return botao;
}

function CriarSpan(valor) {
  var span = document.createElement('span');
  span.textContent = valor; // Adicionando o valor dentro do span
  span.classList.add('clicavel');
  span.addEventListener('click', EditarItem);
  // Retornando valor dentro do span
  return span;
}

function EditarItem(event) {
  // Capturando valor do elemento clicado
  var valor = event.target.innerHTML;

  var index = GlobalNames.indexOf(valor); // Identificando índice
  Input.value = GlobalNames[index];
  AplicarFoco(Input); // Aplicando Foco no Input
  IsEditing = true;
  Posicao = index;
}

// Deletando elementos da lista que forem clicados
ul.addEventListener('click', function (event) {
  // Realizar evento apenas quando o usário clicar no botão
  if (event.target.localName === 'button') {
    // Capturando valor do elemento clicado
    var valor = event.srcElement.nextElementSibling.innerHTML;

    // Deletando elemento de Global Names
    var index = GlobalNames.indexOf(valor); // Identificando índice
    GlobalNames.splice(index, 1);

    var ancestral = event.target.parentElement;
    ancestral.remove(); // Removendo elemento do site
    ExibirVetor(); // Atualizar site e Exibir vetor com novo valor
  }
});

function enviarDados(){
    
    var nome = document.getElementById("nome").value;
    var cpf = document.getElementById("cpf").value;
    var idade = document.getElementById("idade").value;
    var funcao = document.getElementById("funcao").value;
    var inicio_funcao = document.getElementById("inicio_funcao").value;
    var sexo = document.getElementById("sexo").value;

    if(nome.length < 6 || nome.length > 30)
        alert('Tamanho do nome invalido');
    else{
        if(idade <= 0 || idade >=100)
            alert('Idade invalida');
        else{
            if(funcao.length < 3 || funcao.length > 30)
                alert('Função invalida');
            else{
                if(inicio_funcao <= 0)
                    alert('Selecione uma data');
                else{
                    if(sexo != 'F' && sexo != 'M')
                        alert('Sexo invalido');
                    else
                        alert('Cadastro realizado com sucesso\nNome: '+nome + '\Cpf: '+cpf+ '\nIdade: '+idade+ '\nFuncao: '+funcao + '\nInicio: '+inicio_funcao + '\nSexo: '+sexo);
                        const dataObj = JSON.stringify({ nome, cpf, idade, funcao, inicio_funcao, sexo });
                        localStorage.setItem(cpf, dataObj);
                }
            }
        }
    }
}
