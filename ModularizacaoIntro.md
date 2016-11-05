#Modularização em JavaScript

Modularização implica na divisão das funcionalidades de um código em partes distintas. Os módulos compõe peças que podem ser adicionadas e removidas quando necessário, vejam:&nbsp;**reuso de código**.

Os frutos do&nbsp;**encapsulamento**&nbsp;alcançado com a modularização são a&nbsp;**redução da complexidade**,&nbsp;**separação de interesses**&nbsp;e&nbsp;**manutenção descomplicada**. Ainda,&nbsp;a definição de cada módulo força o programador a determinar quais os limites e responsabilidades de cada porção do código.

Acredito que estes argumentos já justificam a adoção de um sistema de módulos para seu código. Assumindo que estamos escrevendo código segundo a [especificação ECMAScript 5](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf), tudo começa por uma das palavras grifadas no início do texto: encapsulamento.

## Encapsulamento em JavaScript

Todo programador que se depara com um código, por menos complexo que seja, precisará entender o conceito de escopo. O [escopo de uma variável](http://msdn.microsoft.com/pt-br/library/ie/bzt2dkta(v=vs.94).aspx) ou função no JavaScript são as linhas de código em que estas são acessíveis.

Encapsulamento é um dos fundamentos da programação orientada a objetos tradicional. Considerando que não temos classes no JavaScript e se entendermos encapsulamento como uma forma de restringir acesso à informação, concluímos que a definição de escopo é o caminho para alcança-lo.

O JavaScript possui um escopo global, que quando em navegadores é `window`, e aqueles criados a partir da [execução de uma função](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FFunctions_and_function_scope). A maneira mais fácil de alcançar encapsulamento é utilizando uma função anônima invocada imediatamente após sua definição:

	(function () {
	var hideFromOutside = true;
	})();

Por favor, saiba que este _pattern_ chama-se [Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression) e que os parênteses iniciais servem para que a instrução seja reconhecida como uma expressão.

## Módulos

Mencionado já há mais de 10 anos, o mais simples dos padrões de escrita de módulos em JavaScript é o _module pattern_. O padrão consiste de uma IIFE que retorna um objeto com valores e funções, veja:

	var counter = (function () {
	var current = 0;
	return {
	name: "counter",
	 next: function () {
	return current + 1;
	},
	isFirst: function () {
	return current == 0;
	 }
	};
	})();

### Revealing Module Pattern

O [module pattern possui muitas variações](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript), uma delas é o _revealing module pattern_. Neste padrão, todas as funções e valores do módulo são **acessíveis no escopo local** e apenas referências são retornadas na forma de objeto.

	var counter = (function () {
	var current = 0;
	function next() {
	return current + 1;
	 }
	function isFirst() {
	return current == 0;
	}
	 return {
	next: next,
	isFirst: isFirst
	};
	})();

Apesar de mencionado no [artigo que define o padrão](http://christianheilmann.com/2007/08/22/again-with-the-module-pattern-reveal-something-to-the-world), o ideal é retornar apenas referências a funções, [retornar outros valores pode dar dor de cabeça](http://jsfiddle.net/J4Rkd/1). _Revealing module pattern_ é bastante interessante pela garantia de acesso descomplicado sem a necessidade de uso do `this`, por exemplo. A propósito, este conceito será útil para a construção de módulos melhores em outros padrões.

### Namespace

Os padrões que vimos até então poluem o escopo global da aplicação com a definição de uma série de variáveis. Uma solução é a criação de um _namespace_ de uso específico para os módulos.

	window.App = {
		modules: {}
	};
	App.modules.counter = (function () {
		/* ... */
	})();
	App.modules.slider = (function () {
		 /* ... */
	})();

## Módulos robustos

É natural que módulos dependam uns dos outros. Uma característica importante de um sistema de módulos robusto é a possibilidade de **indicar quais são as dependências** de um determinado módulo e traçar uma estratégia de carregamento caso esta não esteja disponível.

### Asyncronous Module Definition (AMD)

Módulos AMD podem ser requisitados, definidos e utilizados a medida que necessários. Nosso contador, se reescrito em AMD, ficaria da seguinte maneira:

	define('counter', function () {
		var current = 0;
		function next() {
			return current + 1;
		}
		function isFirst() {
			return current == 0;
		}
		return {
			next: next,
			isFirst: isFirst
		};
	});

Diferente de outros sistemas de módulos, as dependências de cada módulo AMD são indicadas na sua própria definição. Isto significa que as dependências não precisam estar prontas para o uso assim que o módulo seja definido, estas podem ser carregadas assincronamente condicionando a execução do módulo.

O trecho de código a seguir define um módulo com duas dependências:

	define(
		[
		'dep1',
		'dep2'
		 ],
		function (dep1, dep2) {
			/* ... */
		}
	);

Caso tenha achado estranho, saiba que a definição do módulo geralmente utiliza uma formatação de espaços bastante específica para facilitar a leitura e entendimento das dependências.

Em meio ao trecho de código, caso não tenha notado, não definimos o identificador deste módulo. Os módulos podem (e devem) ser definidos um em cada arquivo e, nestes casos, o nome do arquivo torna-se o identificador.

#### Requisitando módulos

Toda aplicação terá um trecho principal de código que irá requisitar os módulos e fazer o _bootstrap_da aplicação. O `require` (sim, a semântica é lógica) não exige identificação e atende ao requisito, veja a seguir:

require(
	[
		'slider',
		'counter',
		 'inputMask'
	],
	function (slider, counter, inputMask) {
		/* ... */
	 }
);

Uma boa prática é criar uma interface comum para iniciar o comportamento de cada um dos módulos. Existem diferentes preferências, particularmente utilizo uma função `init`. Desta forma, o corpo de código do `require` conteria algo como `slider.init()` e `counter.init()`.

#### Carregando os módulos

Módulos AMD podem ser utilizados em qualquer navegador, porém sua definição não é suportada nativamente. O que significa que precisamos de uma biblioteca que provenha as tais funções`define` e `require`. O mais popular `loader` de AMD é o [require.js](http://requirejs.org/). Desculpe decepcionar, mas [sua configuração](http://requirejs.org/docs/start.html#get) não está no escopo deste texto.

#### Empacotando os módulos

Um dos principais argumentos contra o uso de AMD é a demora para o carregamento de todos os módulos e suas dependências. **Apesar de possível, o carregamento assíncrono de cada um dos módulos é sumariamente não recomendado** levando em conta os [protocolos de rede](https://speakerdeck.com/jcemer/protocolos-de-comunicacao) que utilizamos atualmente.

Existem ferramentas como o [r.js](https://github.com/jrburke/r.js) que tem a função de empacotar os módulos e entregar um único arquivo para donwload no client-side. O r.js depende de Node.js e introduz uma etapa de análise e concatenação dos arquivos.

Caso já possua um [workflow para cuidar do seus assets](http://tableless.com.br/workflow-para-cuidar-dos-seus-assets), concatenar os arquivos e utilizar o [almond](https://github.com/jrburke/almond)pode ser uma solução bem mais simples. O único detalhe é que você precisará atribuir um identificador para cada módulo. Mesmo que os módulos estejam definidos cada um em um arquivo, lembre-se que a biblioteca entrará em ação apenas após a concatenação.

#### Motivação para o uso

Os módulos AMD já são utilizados nos mais famosos projetos escritos em JavaScript, basta acessar os repositórios: [jQuery](https://github.com/jquery/jquery/blob/master/src/core.js), [Flight](https://github.com/flightjs/flight/blob/master/lib/index.js), [Lo-Dash](https://github.com/lodash/lodash-amd/blob/master/compat/main.js), [Mout](https://github.com/mout/mout/blob/master/src/index.js); e muitos outros.

A definição permite ainda definir plugins para estender o comportamento de carregamento dos módulos e carregar outros conteúdos que não sejam unicamente JavaScript.