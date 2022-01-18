var path = window.location.pathname;
var page = path.split("/").pop();

if(page == "compras.html")
    Compras();
if(page == "mascaras.html")
    Mascaras();


/******************************************************************************************************/
                  

function Camisas(tipo) {
    var camisas= new Array(10);

    camisas[0] = ["<p>Camisa <br> Lisa</p>",        "<img src='imagens/ModeloLisa.png'>"];
    camisas[1] = ["<p>Camisa <br> de Mercúrio</p>", "<img src='imagens/ModeloMercurio.png'>"];
    camisas[2] = ["<p>Camisa <br> de Vênus</p>",    "<img src='imagens/ModeloVenus.png'>"];
    camisas[3] = ["<p>Camisa <br> da Terra</p>",    "<img src='imagens/ModeloTerra.png'>"];
    camisas[4] = ["<p>Camisa <br> de Marte</p>",    "<img src='imagens/ModeloMarte.png'>"];
    camisas[5] = ["<p>Camisa <br> de Jupiter</p>",  "<img src='imagens/ModeloJupiter.png'>"];
    camisas[6] = ["<p>Camisa <br> de Saturno</p>",  "<img src='imagens/ModeloSaturno.png'>"];
    camisas[7] = ["<p>Camisa <br> de Urano</p>",    "<img src='imagens/ModeloUrano.png'>"];
    camisas[8] = ["<p>Camisa <br> de Netuno</p>",   "<img src='imagens/ModeloNetuno.png'>"];
    camisas[9] = ["<p>Camisa <br> de Plutão</p>",   "<img src='imagens/ModeloPlutao.png'>"];

    document.getElementById("imgCel").innerHTML = camisas[tipo][0] + camisas[tipo][1];
}
/*****************************************************************************************************/


function Mascaras(){

    for (let elemento of document.getElementsByClassName("imgCorMasc")){

        var myWindow;
        var tipo;

        var mascara = new Array(2);
        mascara[0] = ['Preta', 'Modelo Preta', '<img class="imgMasc" src="imagens/MascaraPretaLado150.png" alt="Mascara Preta">'];
        mascara[1] = ['Branca', 'Modelo Branca', '<img class="imgMasc" src="imagens/MascaraBrancaLado150.png" alt="Mascara Branca">'];
        
        elemento.onclick = function(){

            elemento.alt.toString() == "Mascara Preta" ? tipo = 0 : tipo = 1;

            myWindow = window.open("", mascara[tipo][0], "location=no,status=no," + "width=320,height=320, left=" + (window.innerWidth-320)/2 + ", top =" +(window.innerHeight-320)/2);


            myWindow.document.write('<html><head><title>');
            myWindow.document.write( mascara[tipo][0] );
            myWindow.document.write('</title>');
            myWindow.document.write('<link rel="stylesheet" type="text/css" href="styles.css"></head>');

            myWindow.document.write('<body>');

            myWindow.document.write('<section class="janInfo">');
            myWindow.document.write('<h3>', mascara[tipo][1], '</h3>');

            myWindow.document.write( mascara[tipo][2] );
            myWindow.document.write('<button class="impMedio" onclick="window.close()">Fechar</button>');
            myWindow.document.write('</section>');

            myWindow.document.write('</body>');
            myWindow.document.write('</html>');
        }
    }
}


/*****************************************************************************************************/


function Compras(){
    
    var produto = document.getElementById("produto");
    produto.addEventListener('change', ProdSelecionado); /* Pega os eventos de mudança de produto */


    var cores    = document.getElementById("cor");
    var tamanhos = document.getElementById("tamanho");
    var modelos  = document.getElementById("modelo");

    var lista = "";
    var produtos = "";
    var total = 0;


    cores.addEventListener('change', mostraDescValor);      // Pega os eventos de mudança no select cor         
    tamanhos.addEventListener('change', mostraDescValor);   // Pega os eventos de mudança no select tamanho
    modelos.addEventListener('change', mostraDescValor);    // pega os eventos de mudança no select modelo

    valorItem   = document.getElementById("valorItem");
    descItem    = document.getElementById("descricao");

    limparCampos(true); // ao abrir a página limpa todos os campos e bloqueia os campos cor tamanho e modelo
                        // o parametro "true" informa que é para limpar todos os campos



    function ehMascara(){
        // retorna verdadeiro se o valor do label no optgroup dentro do select produto for igual a "Mascara"
        return produto.options[produto.selectedIndex].parentNode.label == "Mascara" ? true : false                                                    
    }

    function ProdSelecionado() {

        if( ehMascara() ){
            limparCampos(false);
            cores.disabled = false; // desbloqueia o select cor
            cores.options[3].disabled = true; // bloqueia a option com a cor Azul
            cores.options[4].disabled = true; // bloqueia a option com a cor Lilás
            tamanhos.disabled = true;   // bloqueia o select "tamanho"
            modelos.disabled = true;    // bloqueia o selet "modelo"
        }
        else{
            limparCampos(false);
            cores.disabled = false; // desbloqueia o select cor
            cores.options[3].disabled = false;  // desbloqueia a option com a cor Azul
            cores.options[4].disabled = false;  // desbloqueia a option com a cor Lilás
            tamanhos.disabled = false;  // desbloqueia o select "tamanho"
            modelos.disabled = false;   // desbloqueia o selet "modelo"
        }
    };


    function estaPronto(){
        if( ehMascara() ) //verifica se uma máscara foi selecionada
            // retorna verdadeiro se for selecionadao alguma cor para a "máscara"
            return (cores.value != "") ? true : false 
        else
            // retorna verdadeiro se for selecionado todas as caracteristicas, cor, tamanho, modelo para a camisa
            return (produto.value != "" && cores.value != "" && tamanhos.value != "" && modelos.value != "") ? true : false 
    }

    function mostraDescValor(){
        if(estaPronto()) // verifica se todos os campos de seleção de produto foram preenchidos
            if(ehMascara()){
                /* Se uma Mascara foi selecionada pega os dados referentes a ela 
                e coloca no input readonly voltado para descrição e
                no campo de valor do produto ao lado da descrição */
                lista =  document.getElementById("descricao").value = produto.options[produto.selectedIndex].parentNode.label.substring(0, 3) + ". " + produto.value + " - " + cores.value;
                valorItem.value = 35;
            }
            else{
                /* Se uma Camisa foi selecionada pega os dados referentes a ela 
                e coloca no input readonly voltado para descrição e
                no campo de valor do produto ao lado da descrição */
                lista =  document.getElementById("descricao").value = produto.options[produto.selectedIndex].parentNode.label.substring(0, 3) + ". " + produto.value + " - " + cores.value + " - " + tamanhos.value + " - " + modelos.value;
                valorItem.value= 70;
            }
        else{
            /* Se os campos necessaŕios não foram preenchidos
            o campo de valor do e descrição ficam vazios */
            valorItem.value = ""; 
            descItem.value  = "";
        }
    }

    function limparCampos(eraseAll){
        if(eraseAll){
            /* se o parametro recebido pela função for verdadeiro limpa todos os campos */
            produto.value   = "";
            cores.value     = "";
            modelos.value   = "";
            tamanhos.value  = "";
            valorItem.value = "";
            descItem.value  = "";
        }
        else{
            /* se o parametro recebido pela função for falso limpa todos os campos exceto o de produto */
            cores.value     = "";
            modelos.value   = "";
            tamanhos.value  = "";
            valorItem.value = "";
            descItem.value  = "";
        }
        /* bloqueia os scampos cor, tamanho e modelo */
        cores.disabled      = true;
        tamanhos.disabled   = true;
        modelos.disabled    = true;
    }

    /* pega um evento de click no botão comprar e executa a função abaixo que
    escreve na textArea Lista de compras o produto selecionado desde que 
    todos os campos tenam sido preenchidos, limpa e bloqueia os campos em seguida 
    se não exibe um alerta informando que a "definição do produto não está completa" */
    document.getElementById("comprar").onclick = function (){
        if(estaPronto()){
            produtos += lista +  "\n";
            total += parseFloat(valorItem.value);
            document.getElementById("listaCompras").value = produtos;
            document.getElementById("total").value = total;
            
            limparCampos(true);
        }
        else{
            alert("Definição de produto não está completa");
        }
    }
    /* pega um evento de click no input reset bloqueia e limpa os campos*/
    document.getElementById("reset").onclick = function (){
        limparCampos(true);
    }
}