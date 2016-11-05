
Module Pattern é muito utilizado por vários devs JS hoje em dia, e ele tem muitas variações. Em busca de um formato que facilitasse meu dia-a-dia, testei alguns, até que cheguei em um que me agradou.

###Premissas

O que me levou a seguir esse padrão foi, principalmente, poder separar minhas regras de negócio da manipulação do DOM em sim (isso falando de JS no client-side).

Claro que nada impede de usar algo assim também com NodeJS.

Você vai ver como fica fácil fazer testes unitários (TDD) e testes de comportamento (BDD) separadamente usando esse formato.

Vou mostrar passo-a-passo o que me levou a tomar todas as decisões para chegar nesse resultado final.

###Estrutura de arquivos e diretórios

Os arquivos e diretórios ficarão organizados dessa forma:

		├── /controllers
		|   ├── controllerExample.js
		├── /models
		|   ├── modelExample.js
		├── /modules
		|   ├── moduleExample.js
		├── /vendor
		|   ├── (libs usadas no projeto)
		└── app.js
		
No diretório models ficarão todos os arquivos com as regras de negócio do site/app/sistema (vou chamar só de aplicação para facilitar). Nos models, serão feitos os nossos testes unitários. Eles serão usados somente para consultar e devolver valores, sem tratamento.

Em controllers, serão tratados os dados recebidos de models e também as manipulações do DOM, eventos, etc., quando necessário.

Em modules, os módulos do projeto, criados para automatizar tarefas repetitivas (carousels, accordions, banners, chamadas Ajax, etc).

Em vendor, as libs usadas no projeto: jQuery, Underscore, etc., ou qualquer lib de terceiros, que você não vai alterar diretamente.

###Nomenclatura dos arquivos

Controllers começam com controller-alguma-coisa.js e models com model-alguma-coisa.js. Os arquivos serão criados conforme as necessidades do projeto: separados por funcionalidade ou por partes específicas do projeto.

####O código

Escopo Local

A primeira coisa é manter tudo em um escopo local, e adicionar ao escopo global somente o que for realmente necessário. Normalmente só irá para o escopo global os objetos principais de cada arquivo, que vou mostrar mais abaixo.
Para manter o escopo local, começamos a estrutura do nosso arquivo com uma função anônima autoexecutável (ou IIFE):

	;(function( window, document, undefined ) {
	  
	})( window, document );

Dessa forma, mantemos todos os nossos métodos, variáveis e funções dentro de um escopo local. Passamos como parâmetro os objetos globais window e document para serem usados dentro do nosso escopo e facilitar a minificação do código. Se usar jQuery ou Underscore, pode usar algo como:
	
	;(function( window, document, $, undefined ) {
	  
	})( window, document, jQuery );

O próximo passo é criar nosso objeto principal, dentro dessa função anônima:

	;(function( window, document, undefined ) {
	  'use strict';
	  
	  var app = (function() {
	  
	  })();
	})( window, document );

Atribuiremos a app uma função autoexecutável para não precisarmos adicionar os parênteses quando chamarmos algum método interno. O "use strict" habilita o Strict Mode para ECMAScript 5. 

###Separando métodos privados e públicos

Esse foi o ponto principal que mudou da minha antiga abordagem do Module Pattern. É sempre uma boa prática usar DRY para manter as coisas organizadas.

No Module Pattern, a maneira mais comum utilizada para retornar somente métodos públicos é essa:


	;(function( window, document, undefined ) {
	  'use strict';
	  
	  var app = (function() {
	    var obj = {};
	  
	    obj._privateMethod = function() {
	      return 'Private Method';
	    };
	  
	    obj.publicMethod = function() {
	      return 'Public Method';
	    };
	  
	    obj.otherPublicMethod = function() {
	      return 'Other Public Method';
	    };
	  
	    return {
	      publicMethod : obj.publicMethod,
	      otherPublicMethod : obj.otherPublicMethod
	    };
	  })();
	})( window, document );
	
Os métodos privados começam com _ por convenção e não são retornados. Mas sempre que escrever um método público, vai ter que incluí-lo no return, ou seja, dois trabalhos.

Uma forma que encontrei de contornar isso foi assim:


	;(function( window, document, undefined ) {
	  'use strict';
	  
	  var app = (function() {
	    var $private = {};
	    var $public = {};
	  
	    $private.privateMethod = function() {
	      return 'Private Method';
	    };
	  
	    $public.publicMethod = function() {
	      return 'Public Method';
	    };
	  
	    return $public;
	  })();
	})( window, document );
	

####Ordem das chamadas

Para manter um padrão de organização, iremos fazer dessa forma: primeiro as propriedades, e depois os métodos. E os privados sempre antes dos públicos, ordenando tudo alfabeticamente. Nossa abordagem ficará dessa forma:

	;(function( window, document, undefined ) {
	  'use strict';
	  
	  var app = (function() {
	    var $private = {};
	    var $public = {};
	    
	    /**
	     * Private Variables
	     */
	    $private.privateVar = 'private var';
	    
	    // -----------------------------------
	    
	    /**
	     * Public Variables
	     */
	    $public.publicVar = 'public var';
	    
	    // -----------------------------------
	    
	    /**
	     * Private Methods
	     */
	    $private.privateMethod = function() {
	      return 'Private method';
	    };
	    
	    // -----------------------------------
	    
	    /**
	     * Public Methods
	     */
	    $public.publicMethod = function() {
	      return 'Init';
	    };
	    
	    // -----------------------------------
	    
	    return $public;
	  })();
	  
	  // Global
	  window.app = app;
	  
	})( window, document );
	

Todos os nossos arquivos terão esse mesmo padrão, mudando somente o nome do objeto principal. Para manter um padrão bem definido e organizado, o objeto deve ter o mesmo nome do arquivo, trocando o formato de slug por camelCase.