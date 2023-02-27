const display = document.getElementById('display')
const complemento = document.getElementById('complemento')
const historic = document.getElementById('historico')

let primeiro = false
let prosseguir = true
let operacoes = [];
operacoes[0] = "0";

let todosOperadores = ["+" , "-", "*", "/"];

apagarC();

function addDisplay(text) {
    if (primeiro) {
        display.textContent = text
        primeiro = false
    } else {
        if (display.textContent.length == 1) {
            if (text == "," || display.textContent.charAt(0) != "0") {
                display.textContent += text
            } else if (text != "0") {
                display.textContent = text
            }
        } else {
            display.textContent += text
        }
    }
}

function addOperacao(operando) {
    if (display.textContent != "0") {
        operacoes[operacoes.length] = display.textContent.replace(",", ".");
        complemento.textContent = operacoes[operacoes.length - 1].replace(".", ",").replace("*", "x").replace("/", "÷")
    }
    if (todosOperadores.indexOf(operacoes[operacoes.length - 2]) >= 0) {
        if (operacoes[operacoes.length -2] == "+") {
            somar(operacoes[operacoes.length - 3], operacoes[operacoes.length - 1]);
        } else if (operacoes[operacoes.length -2] == "-") {
            subtrair(operacoes[operacoes.length - 3], operacoes[operacoes.length - 1])
        } else if (operacoes[operacoes.length -2] == "*") {
            multiplicar(operacoes[operacoes.length - 3], operacoes[operacoes.length - 1])
        } else if (operacoes[operacoes.length -2] == "/") {
            dividir(operacoes[operacoes.length - 3], operacoes[operacoes.length - 1])
        }
        operacoes[operacoes.length] = operando;
        complemento.textContent = operacoes[operacoes.length - 2].replace(".", ",") + " " + operacoes[operacoes.length - 1].replace("*", "x").replace("/", "÷");
        return;
    }
    if (todosOperadores.indexOf(operacoes[operacoes.length - 1]) < 0) {
        display.textContent = "0";
        operacoes[operacoes.length] = operando;
        complemento.textContent += " " + operacoes[operacoes.length - 1].replace("*", "x").replace("/", "÷");
    } else {
        operacoes[operacoes.length - 1] = operando;
        complemento.textContent = operacoes[operacoes.length - 2].replace(".", ",") + " " + operacoes[operacoes.length - 1].replace("*", "x").replace("/", "÷");;
    }
}

function numerosComplexos(nomeId) {
    if (prosseguir) {
        if (nomeId == "raiz") {
            operacoes[operacoes.length] = display.textContent
            operacoes[operacoes.length] = "√( " + display.textContent + " )";
            complemento.textContent = operacoes[operacoes.length - 1].replace(".", ",").replace("*", "x").replace("/", "÷");
            raizQuadrada(operacoes[operacoes.length - 2])
            return;
        }
        if (nomeId == "potencia") {
            operacoes[operacoes.length] = display.textContent
            operacoes[operacoes.length] = "sqr( " + display.textContent + " )";
            complemento.textContent = operacoes[operacoes.length - 1].replace(".", ",").replace("*", "x").replace("/", "÷");
            quadrado(operacoes[operacoes.length - 2])
            return;
        }
        if (nomeId == "divisaoUm") {
            operacoes[operacoes.length] = display.textContent
            operacoes[operacoes.length] = "divisaoUm";
            divisaoPorUm(operacoes[operacoes.length - 2])
            return;
        }
        if (nomeId == "porc") {
            if (todosOperadores.indexOf(operacoes[operacoes.length - 1]) >= 0) {
                operacoes[operacoes.length] = display.textContent;
                porcentagem(operacoes[operacoes.length - 3], display.textContent);
            }
        }
    }
}

function verificacaoNormal() {
    if (todosOperadores.indexOf(operacoes[operacoes.length - 1]) >= 0) {
        operacoes[operacoes.length] = display.textContent.replace(",", ".");
        if (operacoes[operacoes.length -2] == "+") {
            somar(operacoes[operacoes.length - 3], operacoes[operacoes.length - 1]);
        } else if (operacoes[operacoes.length -2] == "-") {
            subtrair(operacoes[operacoes.length - 3], operacoes[operacoes.length - 1])
        } else if (operacoes[operacoes.length -2] == "*") {
            multiplicar(operacoes[operacoes.length - 3], operacoes[operacoes.length - 1])
        } else if (operacoes[operacoes.length -2] == "/") {
            dividir(operacoes[operacoes.length - 3], operacoes[operacoes.length - 1])
        }
        complemento.textContent = operacoes[operacoes.length - 4].replace(".", ",") + " " 
        + operacoes[operacoes.length - 3].replace("*", "x").replace("/", "÷") + " " 
        + operacoes[operacoes.length - 2].replace(".", ",") + " =";
    }
}

function verificacaoPorcentagem() {
    if (todosOperadores.indexOf(operacoes[operacoes.length - 2]) >= 0) {
        if (operacoes[operacoes.length - 2] == "+") {
            somar(operacoes[operacoes.length - 3], operacoes[operacoes.length - 1]);
        } else if (operacoes[operacoes.length -2] == "-") {
            subtrair(operacoes[operacoes.length - 3], operacoes[operacoes.length - 1])
        } else if (operacoes[operacoes.length -2] == "*") {
            multiplicar(operacoes[operacoes.length - 3], operacoes[operacoes.length - 1])
        } else if (operacoes[operacoes.length -2] == "/") {
            dividir(operacoes[operacoes.length - 3], operacoes[operacoes.length - 1])
        }
        complemento.textContent = operacoes[operacoes.length - 4].replace(".", ",") + " " 
        + operacoes[operacoes.length - 3].replace("*", "x").replace("/", "÷") + " " 
        + operacoes[operacoes.length - 2].replace(".", ",") + " =";
    }
}

function btnIgual() {
    if (prosseguir) {
        verificacaoNormal();
        verificacaoPorcentagem();
    }
}

function lerNumero(nomeId) {
    if (prosseguir) {
        addDisplay(document.getElementById(nomeId).textContent)
    }
}

function lerSinal(nomeId) {
    if (prosseguir) {
        addOperacao(document.getElementById(nomeId).value);
        primeiro = true;
    }
}

function showDisplay() {
    btnIgual();
    if (todosOperadores.indexOf(operacoes[operacoes.length - 2]) < 0 &&
    todosOperadores.indexOf(operacoes[operacoes.length - 1]) < 0) {
        display.textContent = operacoes[operacoes.length - 1].replace(".", ",")
    } 
}


/* Funções matemáticas */
function somar(primeiroNumero, segundoNumero) {
    let resultado = Number(primeiroNumero.replace(",", ".")) + Number(segundoNumero.replace(",", "."));

    operacoes[operacoes.length] = resultado.toString(10);
    display.textContent = resultado.toString(10).replace(".", ",");
}

function subtrair(primeiroNumero, segundoNumero) {
    let resultado = Number(primeiroNumero.replace(",", ".")) - Number(segundoNumero.replace(",", "."));

    operacoes[operacoes.length] = resultado.toString(10);
    display.textContent = resultado.toString(10).replace(".", ",");
}

function dividir(primeiroNumero, segundoNumero) {
    if (Number(segundoNumero) != 0) {
        let resultado = Number(primeiroNumero.replace(",", ".")) / Number(segundoNumero.replace(",", "."));

        operacoes[operacoes.length] = resultado.toString(10);
        display.textContent = resultado.toString(10).replace(".", ",");
        return;
    }
    operacoes[operacoes.length] = "Não é possível dividir por 0";
    display.textContent = "Não é possível dividir por 0";
    complemento.textContent = "" + primeiroNumero + " / " + segundoNumero;
    operacoes = []
    operacoes[0] = 0
    prosseguir = false
}

function multiplicar(primeiroNumero, segundoNumero) {
    let resultado = Number(primeiroNumero.replace(",", ".")) * Number(segundoNumero.replace(",", "."));

    operacoes[operacoes.length] = resultado.toString(10);
    display.textContent = resultado.toString(10).replace(".", ",");
}

function raizQuadrada(numero) {
    numero = Number(numero.replace(",", "."));

    if (numero >= 0) {
        let resultado = Math.sqrt(numero, 2);

        operacoes[operacoes.length] = resultado.toString(10);
        display.textContent = resultado.toString(10).replace(".", ",");
        return;
    }
    operacoes[operacoes.length] = "Entrada inválida";
    display.textContent = "Entrada inválida";
    operacoes = []
    operacoes[0] = 0
    prosseguir = false
}

function quadrado(numero) {
    multiplicar(numero, numero);
}

function divisaoPorUm(numero) {
    dividir(1, numero);
}

function porcentagem(primeiroNumero, porcentagem) {
    let resultado = Number(primeiroNumero.replace(",", ".")) * (Number(porcentagem.replace(",", ".")) / 100);

    operacoes[operacoes.length - 1] = resultado.toString(10);
    display.textContent = resultado.toString(10).replace(".", ",");
}



/* Outros botões */
function apagarCE(){
    if (prosseguir) {
        display.textContent = "0";
    }
}

function apagarC() {
    prosseguir = true;
    apagarCE();
    complemento.textContent = "";
    operacoes = [];
    operacoes[0] = "0";
}

function apagarUm(){
    if (prosseguir) {
        let resultado = display.textContent;

        if(resultado != 0){
            display.textContent = resultado.substring(0, resultado.length - 1);
            if (display.textContent == "") {
                display.textContent = "0";
            }
        }
    }
}

function maisMenos(){
    if (prosseguir) {
        let invertido = (Number(display.textContent.replace(",", ".")) * -1) + "";
        display.textContent = invertido.replace(".", ",");
    }
}

function virgula() {
    if (prosseguir) {
        if (!display.textContent.includes(",")) {
            display.textContent += ",";
        }
    }
}

function ativarMenu(botao){
    console.log(botao);
    botao.classList.toggle("activid");
}