##JavaScript Strict Mode

O strict mode é uma nova feature do ECMAScript 5 que permite fazer que o código JavaScript rode em um modo mais rigoroso. Neste modo, a engine de JavaScript tem seu comportamento modificado, gerando erros que antes eram silenciados e, até mesmo, proibindo o uso de certas partes da linguagem que são tidas como problemáticas, nos forçando assim a escrever um código de melhor qualidade e ajudando a capturar bugs mais precocemente.

###Habilitando

A primeira forma de habilitar o modo strict é a nível de arquivo. Para isso, basta por a string "use strict"; ou 'use strict'; no começo de um arquivo JS para que todo o código deste arquivo seja executado no modo strict.

Nenhum código pode vir antes da declaração "use strict"; (apenas whitespace e comentários são permitidos). Caso um trecho de código apareça antes, o modo strict não é disparado.

    // código "strict"
    "use strict";
    var foo = "bar";
    
    // código "não strict"
    var whatsUp = "suuup";
    "use strict";

A outra forma de uso é a nível de função. Quando usado dentro de uma função, apenas o código dentro dela é executado no modo strict. Todo o código externo continua a ser executado normalmente.

	function foo() {
	  "use strict";
	  // código da função em modo "strict"
	}
	
	function bar() {
	  // código da função em modo "não strict"
	}

Hoje é muito comum concatenarmos arquivos para diminuir a quantidade de dados trafegados e o número de requisições. Para não disparar o modo strict em código que não foi testado neste modo, é interessante deixarmos o código que roda e foi testado para rodar no modo strict isolado. As funções de invocação imediata são perfeitas para isso.

	// código no modo "não strict"
	(function() {
	  "use strict";
	  // código no modo "strict"
	}());
	// código no modo "não strict"

A Amazon teve um problema ao concatenar um arquivo JS que tinha "use strict"; declarado de forma global no arquivo com outros arquivos JS que não eram strict compliant. Como o arquivo que continha a declaração de modo strict global era o primeiro da fila de concatenação, ele fez com que o código dos outros arquivos também rodassem no modo strict, disparando vários erros que normalmente seriam silenciados. Esse episódio gerou, inclusive, uma abertura de ticket no Bugzilla do Firefox — e com certeza alguns milhões foram pelo ralo.

###O que muda?

O strict mode trouxe várias mudanças na forma de como o JavaScript é executado. Mas vamos focar nas principais partes. 

####Declaração implícita de variáveis globais

Um dos erros mais comuns em JavaScript. Sem o strict mode, uma nova variável global é criada sempre que atribuimos um valor a uma variável não declarada. No modo strict, isto gera um erro.

	// gera um erro no "strict mode"
	(function() {
	  "use strict";
	  variavelNaoDeclarada = 'foo';
	}());

####Restrição de nomes

O modo strict impõe uma série de restrições aos nomes de variáveis, funções e parâmetros. eval e arguments não mais podem ser usados como identificadores, muito menos tentar atribuir um valor a eles. O que é muito bom, uma vez que o JavaScript possui nativamente uma função eval e um objeto arguments.

	// gera um erro de sintaxe no "strict mode"
	function() {
	  "use strict";
	  arguments = 'foo';
	}

Algumas palavras também são proibidas de serem usadas como identificadores pois são candidatas a serem usadas como nomes de futuras features da linguagem. Entre elas estão:

- implements
- interface
- let
- package
- private
- protected
- public
- static
- yield

###Uso do this

O uso do this foi levemente modificado. Quando usado dentro de uma função, o this aponta para o objeto que contem a função. Porém quando a função não pertence a um objeto específico, ele aponta para o objeto global window.

No modo strict, caso o this seja usado em uma função que é definida no escopo global, ele retorna o valor undefined. Caso uma função pertença a um objeto, ele continua a apontar para o objeto, como acontecia anteriormente.

	// retorna "undefined"
	function() {
	  "use strict";
	  return this;
	}

Isso evita erros comuns com funções usadas como construtores. No código abaixo chamamos uma função construtora sem o uso do new. No modo não strict, o this apontaria para window e uma variável global nome seria criada.

Como no strict mode o this retorna undefined, e não podemos adicionar propriedades a undefined, um erro é gerado. Quando usado da forma apropriada, com o new, nenhum erro é disparado.

	"use strict";
	
	function Blog(nome) {
	  this.nome = nome;
	}

	// gera um erro no "strict mode"
	var blog = Blog('Targettrust');
	Parâmetros e propriedades duplicadas

O JavaScript não reclama caso você declare duas propriedades de um objeto com o mesmo nome. A última declaração vai simplesmente sobreescrever a anterior. O modo strict força o uso de nomes únicos de propriedades.

	"use strict";
	
	// gera um erro de sintaxe no modo strict
	obj = {
	  foo: 1,
	  bar: 2,
	  foo: 3
	}

Com o nome de parâmetros temos um cenário parecido. Normalmente o JavaScript aceita como sintaxe válida a declaração de parâmetros com o mesmo nome. No modo strict isso gera um erro de sintaxe.

	// gera um erro de sintaxe
	function foo(param1, param1) {
	  "use strict";
	  return param1 + 1;
	}

####Variáveis do contexto eval()

O eval, em código não strict, pode adicionar variáveis ao contexto em que ele está inserido. E antes do JSON ser nativamente implementado nos browsers, o eval era muito usado para construir objetos a partir de strings e os inserir no contexto externo ao eval.

Com o strict mode, o eval não pode mais adicionar variáveis fora de seu contexto. Variáveis adicionadas no eval ficam contidas no contexto do eval. No código abaixo, sem o strict mode, seria inserido uma variável foo e o valor do alert seria “bar”. No strict mode acontece um erro de sintaxe pois a variável não foi definida.

	"use strict";
	
	eval('var foo="bar";');
	alert(foo); // gera um erro de sintaxe no "strict mode"

####Números no sistema octal

Números no sistema octal são números representados na base 8. Ou seja, 10 em octal equivale a 8 em decimal. Em JavaScript, e em várias outras linguagens, os números no sistema octal são representados com um 0 na frente do número. 023 em JavaScript equivale a 19 em decimal. Isso gerava muita confusão, já que muitos achavam que um zero a esquerda não iria fazer nenhuma diferença na representação do número.

"use strict";

	// gera um erro de sintaxe no modo strict
	var foo = 023;
	
No modo strict o uso de números no sistema octal não é permitido. Caso um 0 seja posto na frente de um número octal válido, será gerado um erro de sintaxe. Caso contrário ele será simplesmente tratado como decimal.

	"use strict";
	
	// octal válido. gera erro de sintaxe no "strict mode"
	var foo = 023;
	
	// ocatal não válido. é tratado como decimal
	var bar = 08;

Como o número 08 não é um número octal válido, já que números no sistema octal vão de 0 a 7, ele é tratado como um número decimal. No caso do número 023, por ser um octal válido, um erro de sintaxe é gerado. Caso você não saiba o que um octal é, ande pela sombra evitando o uso de 0‘s na frente de números.

###Suporte

O strict mode pode ser usado sem medo em todos os navegadores. Caso um navegador que não o implemente passe pela declaração "use strict";, ele irá tratá-la como uma string e não irá afetar o comportamento do código seguinte.

O cenário contrário também é compatível. Caso você desenvolva JavaScript em modo strict em um navegador que o implementa, o código válido no modo strict deste navegador é retrocompatível com qualquer outro que implemente o ECMAScript

Ou seja, irá rodar até no IE.

> Written with [StackEdit](https://stackedit.io/).