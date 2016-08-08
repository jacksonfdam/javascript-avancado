##Escalando Javascript no browser

Aí você está lá, todo pomposo, trabalhando no seu projeto, escrevendo seu JS tudo em um arquivo só, achando que vai ficar com pouco código, usando uma global aqui, outra global ali, e quando vê… já está com 4.000 linhas de código, todo perdido sem saber o que fazer! E você pensa: “Porque eu não modularizei isso???”

> Já dizia Renato Aragão: “Se não fosse comigo, eu ria…“

###Modularizar é preciso

Quando você começa a desenvolver um projeto que vai usar muito JS, mas você não sabe o quanto, você precisa estar preparado para escalar. Seu código precisa ser o menor possível, o mais modularizado e desacoplado possível, para que você possa crescer sem problemas.
Mas como pensar nisso já no início do projeto, muitas vezes sem ter noção da quantidade de código que vou precisar escrever?

É uma pergunta que eu fiz a mim mesmo por várias vezes, quando estava desenvolvendo um projeto onde escrevi - sem minificar - mais de 7.000 linhas de JS. Juntando com as libs, o arquivo final ficou com mais de 18.700 linhas (quase 1mb sem minificar; 500kb minificado, entregue em um único arquivo). E o maior arquivo ficou com mais de 4.700 linhas, sem utilizar nenhum framework :(

E apesar de eu ter tentado desde o começo modularizar, separando um arquivo por página, ainda assim não havia conseguido chegar no modelo ideal. Nesse projeto, tive a necessidade de utilizar algumas variáveis globais para compartilhar informações entre arquivos, tentei não repetir código, mas algumas coisas ainda ficaram duplicadas, entre outros pontos críticos.
E não, eu não me orgulho disso. Mas posso dizer que aprendi uma lição: eu sabia menos do que pensava sobre modularização.

Isso me fez pensar, e buscar outras soluções que pudessem me ajudar a desenvolver um código modular e escalável. Estudei como alguns frameworks trabalhavam, aprendi outros patterns além do Module Pattern, li o livro **Clean Code**, conheci pessoas que me deram ótimas dicas de como pensar simples. E isso me abriu a mente para coisas novas!

E, por mais estranho que possa soar, pensar simples é bastante complicado! É muito difícil você reestruturar sua mente para pensar de uma forma “**simples**”, “**modular**”, “**em partes**”.

Normalmente nós já queremos pensar no todo, no projeto inteiro, como iremos chegar ao final. Mas nunca chegaremos ao final, se não dermos o primeiro passo! Temos que subir um degrau de cada vez. Pensando de forma componentizada, você quebra tudo em pequenos pedaços separados, independentes, que vão se juntando aos poucos, até formar o projeto concretizado :D

###Separação de responsabilidades

Se, desde o início do projeto, você já tiver na sua cabeça a definição das responsabilidades de cada parte do seu código, vai facilitar bastante para modularizá-lo.

Você precisa pensar de “dentro para fora”; da menor parte até o projeto final, concretizado.

Com certeza no meio do caminho você vai precisar fazer refactory em algumas partes do seu código, para remover duplicações, e deixar ele mais legível, mas saiba que isso faz parte do processo. Você só precisa identificar quando é o momento de fazer isso.

> Eu tinha um cachorro que se chamava “Pradentro”. Ele estava dentro de casa quando eu disse: “Pra fora, 
Pradentro!”. Ele ficou confuso, e morreu.

Como disse acima: precisamos pensar de dentro pra fora: quais seriam as menores partes do nosso código?

###Estrutura de diretórios


Acho bastante interessante o formato como o AngularJS separa os conceitos, por isso acabei adotando algumas ideias. Basicamente, a estrutura de diretórios que utilizo é mais ou menos assim:

	├── /vendor
	├── /modules
	├── /resources
	├── /services
	├── /controllers
	└── app.js

***/vendor***
Aqui em /vendor fica tudo o que for de terceiros: libs, frameworks, plugins. Se necessário, podemos criar mais diretórios aqui dentro para melhorar a organização.

***/modules***
No diretório /modules, podemos criar módulos que serão comuns, e poderão ser compartilhados por toda a aplicação: infinite scroll, paginação, etc.

***/resources***
Em /resources, ficam as chamadas à recursos externos: basicamente os resources servirão para obter com Ajax dados de uma API de terceiros, ou mesmo uma API interna, por exemplo.

***/services***
Os services serão auxiliadores dos controllers. É neles que iremos consumir as respostas dos resources, utilizar os modules, fazer tratamento de DOM, utilizar plugins de terceiros, e toda a parte bruta da nossa aplicação. 

Os services basicamente irão consumir tudo o que estiver em resources, modules e vendor.
Cada service deve tratar de apenas uma pequena parte da aplicação.

***/controllers***
Os controllers continuam fazendo o papel de intermediários entre a view e as outras partes da aplicação, mas com o auxílio dos services. Eles irão chamar services específicos sempre que necessário, e devolver as respostas à respectiva view. Nenhuma lógica ou regra de negócio deveria ficar nos controllers, mas sim nos services.

***app.js***
E, por fim, o app.js, que é o cara que vai chamar os controllers na hora em que eles tiverem que aparecer. Em alguns casos, podemos usar também um diretório routes, e fazer as rotas conversarem diretamente com os controllers.

Mas isso depende de cada projeto. Essa estrutura é uma base para facilitar a modularização. Ainda dentro de cada diretório desses, podemos criar outros para organizar melhor, conforme à necessidade.

E, se você quiser fazer um bundle, juntando tudo em um arquivo só, você pode concatenar todos os arquivos, exatamente nessa ordem :)

###Conteúdo dos arquivos

O conteúdo dos arquivos também deve manter uma convenção, para que fique fácil adicionar novos arquivos e dar manutenção nos já existentes. A estrutura base dos arquivos provavelmente vai ser a mesma, mudando apenas alguns detalhes.

Por exemplo: um controller teria uma estrutura parecida com essa:


	;(function( win, doc, undefined ) {
	  'use strict';
	  
	  function ControllerHome() {
	    var $public = {};
	    var $private = {};
	    
	    $public.init = function init() {
	      $private.initEvents();
	    };
	    
	    $private.initEvents = function initEvents() {
	      doc.querySelector( '[data-js="send-form"]' )
	        .addEventListener( 'click', Module.ServiceSendForm.submit, false );
	    };
	    
	    return $public;
	  }
	  
	  win.Module = win.Module || {};
	  win.Module.ControllerHome = ControllerHome();
	})( window, document );
	
Começa com uma IIFE, gera uma função ControllerHome, para gerenciar tudo o que for feito na home. Como algumas áreas do site são comuns, - normalmente cabeçalho, rodapé e sidebar - você pode ainda criar um ControllerCommon para gerenciar envio de newsletter, busca, etc. Coisas que são comuns em todas as áreas da aplicação.

Dentro da função principal, temos dois objetos: $private e $public, retornando sempre o $public, para deixar público somente o que for necessário chamar de fora, ou de outro arquivo. Para controllers, o que ficará público basicamente será só o método init mesmo.

No controller, ainda podemos ter um método initEvents, que vai adicionar ouvintes de evento nos elementos dessa página. E os métodos que irão efetuar as ações dos eventos estarão em services. 

Na IIFE, eu adicionei como parâmetro o window.Module, que é um objeto que será criado para exportar nele tudo o que for referente à nossa aplicação. Esse nome fica por sua conta.

No final, exportamos em Module.ControllerHome a função ControllerHome, já invocando-a com (), para que possamos chamar o método init sempre precisar invocá-la novamente:

No app.js teria uma chamada assim:

	if( doc.querySelector( '[data-js="page-home"]' ) ) {
	  Module.ControllerHome.init();
	}
	
Que deixaria nosso controller pronto para uso somente se estivermos na home. Olhando dessa forma, dá pra ver que faz bastante sentido trocar esse if por uma rota, quando necessário :)
Outra coisa bastante importante é a ordem das propriedades e métodos. Sempre que tiver uma propriedade que precise ser compartilhada por todo o controller, ou service, etc., você declara ela no início do arquivo, logo abaixo das declarações de $public e $private, e sempre como propriedade de $private:

	var $public = {};
	var $private = {};
	  
	$private.buttonSend = doc.querySelector( '[data-js="button-send"]' );
	
Se precisar que elas sejam inicializadas em algum momento específico, você pode criar um método initVars ou iniProps, chamando esse método no init, e fazer a declaração delas ali dentro.

Métodos públicos devem vir sempre antes dos métodos privados, logo após as declarações de propriedades. Isso porque vai facilitar para você visualizar o que é público logo no início do arquivo.

Mais um detalhe: o método init, no controller, não pode ter nada além do que invocações de funções e / ou métodos. Não coloque ifs, configurações de plugins, etc., no init. Se precisar fazer isso, crie um método privado e invoque esse método. Ou melhor ainda, crie um service e coloque essa lógica dentro dele.

Uma outra informação importante: NUNCA deixe propriedades como públicas. Todas as propriedades devem ser privadas.
E como eu faço para obter a informação de uma propriedade?
Você cria um método que retorna a propriedade privada!

Exemplo:

	$private.years = 30;
	$public.getYears = function getYears() {
	  return $private.years;
	};
	
Por que fazer dessa forma?

Porque assim você garante que não haverá efeitos colaterais, se alguém trocar o valor de alguma propriedade que estiver sendo usada internamente no seu código.
Para obter e setar valores, use métodos get e set. No get você retorna a propriedade privada definida. No set, você seta o valor passado, e retorna o próprio objeto, que é retornado na função principal, para que você possa encadear métodos:

	$public.set = function set( key, value ) {
	  $private[ key ] = value;
	  return $public;
	};

Fazendo isso, você pode setar várias coisas de uma vez só:

	Module.pagination
	  .set( 'initialPage', 1 )
	  .set( 'buttonNextSelector', '[data-js="button-next"]' );

Outra boa prática é sempre nomear as funções, ainda que sejam funções anônimas que você esteja atribuindo à variáveis, pois, na hora de debugar, o debugger vai tentar pegar a propriedade name da função. Se ela for uma função anônima, vai ficar mais difícil de debugar, pois o atributo name vai estar setado como undefined.

Com essa estrutura, conseguimos trabalhar em qualquer tipo de projeto: com framework ou sem; com a estrutura Flux; usando AMD, CommonJS ou UMD; ou sem nenhum desses métodos de componentização, talvez só exportando um único objeto global e populando-o para conversar entre os módulos do nosso projeto.