##IIFE

Pra quem não conhece, a IIFE ou Imediately Invoked Function Expression (Expressão de Função Invocada Imediatamente), faz exatamente isso: no momento em que ela é interpretada, ela é imediatamente invocada, para que o seu conteúdo seja executado!

E porque é tão importante usar IIFE?

###Formato da IIFE
Antes de qualquer coisa, vou mostrar como se utiliza uma IIFE. Para uma função simples, você pode invocá-la da seguinte maneira:

    function sayHi() {
      return 'hi!';
    }

	sayHi();
	
Quando você cria uma função, ela não faz nada até que seja invocada. Quando criamos a função sayHi(), ela só vai responder com um "hi!" quando a invocarmos! Na linha 5 do código acima, nós estamos usando os parênteses () para invocar a função. Quando fazemos isso, nos é retornado a string hi!.
Ou seja, essa função precisa de um momento específico para ser invocada.

A IIFE é invocada imediatamente. Mas para que façamos a invocação de uma função imediata, precisamos transformá-la em uma expressão. Nesse caso, vamos utilizar os parênteses para transformar a função em uma expressão, e depois usar novamente os parênteses para invocá-la:

    ;(function( win, undefined ) {
      return 'hi!';
    })( window );

Essa é uma IIFE! É uma função anônima, logo, ela não poderia ser invocada, pois não tem um nome. Mas quando a transformamos em uma expressão, podemos invocá-la assim que ela é interpretada. Se executar esse código no seu console, você verá como resultado, a string "hi!"!

Mas porque eu usaria uma IIFE? E o ponto-e-vírgula no ínicio? E aqueles parâmetros? E porque o undefined como parâmetro?

###Porque usar IIFE

Escopo. O Javascript tem um problema bastante grave, que é a questão do escopo. Tudo o que você declara fora de uma função, faz parte do escopo global. Algumas linguagens colocam escopo a partir de blocos (if, while, for, etc). Mas em Javascript, se você declarar uma variável dentro de um if, você ainda será capaz de consultar o seu valor, pois o escopo é definido por um bloco de função.

Então, o motivo de usar uma IIFE é para que o seu código não fique sujando o escopo global, e evitar que suas variáveis possam colidir com outras de mesmo nome, que estão no mesmo escopo.
Criando uma função, a função ou variável criada ali dentro (utilizando o var), fará parte do escopo local, e não poderá ser acessada de fora, a não ser que, explicitamente, você a exporte.

###Ponto-e-vírgula no início da IIFE

O ponto-e-vírgula no início da IIFE é usado como segurança. Como você deve saber, você precisa colocar um ponto-e-vírgula sempre ao final de cada expressão. Mas ele não é obrigatório.
Então, imagine você concatenando todos os seus scripts, junto com as libs de terceiros que você usa. E imagine que uma lib qualquer tem, na última linha do seu código, a seguinte expressão:

	export = service

Sem colocar o ponto-e-vírgula no final. Quando você chamar a sua IIFE sem o ponto-e-vírgula no início, a sua expressão vai juntar com o service, fazendo-o se transformar em uma função, e causando um efeito colateral indesejado:
	
	export = service(function( win, undefined ) {
	  // ...
	})( window );

Entende a “gravidez”(:P) do problema? Agora, e se você colocar o ponto-e-virgula?

	export = service;(function( win, undefined ) {
	  // ...
	})( window );
	
Aí sim, tudo irá funcionar como o esperado! :D

###Parâmetros

Como qualquer função normal, você pode, ao invocar a IIFE, passar parâmetros para ela. O motivo de passar parâmetros é também escopo. Você pode passar um parâmetro que está no escopo global, para que ele seja usado como uma variável local. Um exemplo bastante comum é o jQuery:

	;(function( $ ) {
	  // ... Aqui, $ é local. :)
	})( jQuery );

Assim você injeta como parâmetro o objeto global jQuery, e recebe na IIFE como $, localmente, que agora pode ser usado sem medo de conflitar com qualquer outra lib que utilizar $. xD

###O undefined na IIFE

Muitas pessoas não sabem, mas o undefined não é um operador, como o new ou o void, mas sim uma variável global, que tem valor indefinido (undefined).
Por esse motivo, no EcmaScript 3, era permitido mudar o valor de undefined.

O código abaixo era perfeitamente válido:

	undefined = true;
	var a = undefined;
	console.log( a ); // true

Bizarro, não? Já na EcmaScript 5, com o strict mode ativado, ("use strict"), esse problema é resolvido, e undefined se torna imutável. Maaaas, como nem todo código usa o "use strict", e você nunca sabe se alguém pode ter mexido no valor de undefined, nós passamos na IIFE o parâmetro undefined sem referenciar objeto algum. Logo, o seu valor, localmente - dentro da IIFE - será undefined!

	undefined = true;
	;(function( win, undefined ) {
	  var a = undefined;
	  console.log( a ); // undefined
	})( window );
	
	var b = undefined;
	console.log( b ); // true

Compreendeu o problema? Usando a IIFE, você está sempre seguro desse valor :D