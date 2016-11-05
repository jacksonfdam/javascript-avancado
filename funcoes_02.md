Funções são objetos de primeira classe em **Javascript**. É o que faz do **Javascript** a _coisa fofa_ que ele é hoje. Por isso, é muito importante saber todas as formas das quais podemos invocar funções, e como isso afeta nossos programas. Já sabe? Não sabe? Não sabe se sabe? Vem ver então!

## Funções como objetos de primeira classe

**Objetos de primeira classe** em Javascript, são os tipos de objetos que apresentam capacidades comuns dentro da linguagem, como:

*   podem ser criados a partir de literais;
*   podem ser atribuídos a variáveis, arrays e propriedades de outros objetos;
*   podem ser passados como argumentos para funções;
*   podem ser retornados como valores de funções;
*   podem ter propriedades, sendo criadas e atribuídas dinamicamente.

Por isso **funções** são **objetos de primeira classe**; pois, exatamente como qualquer outro tipo de objeto, elas têm as capacidades citadas acima.

## Estrutura de uma função

Uma função é formada por quatro partes:

*   A palavra-chave `function`;
*   um nome (opcional);
*   os parênteses `()`, que podem receber - opcionalmente - parâmetros;
*   as chaves `{}`, onde ficará o corpo da função. O corpo também é opcional.

Então, para que possa ser considerada uma função, ela precisa ao menos ter a seguinte estrutura:

  function() {}


## Invocando funções como função

Parece um termo meio estranho, mas é assim mesmo. Essa é a forma mais conhecida de invocar funções. Para invocar funções _como função_, nós utilizamos o operador `()`:
  
  function hello() {
    return 'Hi!';
  }
  
  console.log( hello() ); // Hi!


Criamos uma função chamada `hello` e a invocamos com o operador `()`. Se não tivéssemos adicionado o operador `()`, a função seria retornada em seu formato literal. Experimente fazer isso, removendo os parênteses da chamada no `console.log()` :)

_Mas você disse que o nome da função é opcional. Se eu não colocar o nome, como vou invocá-la?_

Boa pergunta, meu jovem! Quando uma função não tem nome, a chamamos de **função anônima**. Para invocar uma função anônima, só existe uma forma: utilizando um [_IIFE_](http://benalman.com/news/2010/11/immediately-invoked-function-expression/), ou mais conhecido como _invocação de função imediata_.

Para que uma função seja invocada, ela não pode estar no seu estado literal, ela precisa ser uma _expressão_. Para tornar uma função em uma expressão, podemos fazer das seguintes formas:

**Com o operador `()`**:

  (function() {})


Agora essa função é uma expressão, e pode ser invocada:

  (function() {}())


Ou ainda:
  
  (function() {})()


Não faz diferença alguma se os parênteses (operador) estão dentro ou fora dos primeiros parênteses (expressão). O resultado é o mesmo: a função será invocada. Faça o teste. Cole no console do seu navegador e veja o que retorna:

  (function() {
    return 'oi';
  }());
  // oi
  
  (function() {
    return 'oi';
  })();
  // oi


Temos a inda outros operadores que transformam um literal em uma expressão: O `+`, `-`, `!` e `~`. Como funções são tratadas como qualquer outro tipo de objeto, elas também podem ser convertidas em expressões usando esses operadores.

Por exemplo, se você tentar invocar uma função no seu formato literal:

  function() {}()


Você terá um erro de sintaxe, pois, para funções literais, o nome é obrigatório para que elas possam ser invocadas. Nesse caso, teríamos que fazer algo como:

  function hello() {}
  hello();


Pois se tentarmos invocar a função no formato literal, ela continuará dando erro de sintaxe.

Mas usando os operadores mostrados acima, a função se torna uma expressão, podendo então ser invocada. Todos os exemplos abaixo são válidos para uma _IIFE_:

  !function() {}()

  +function() {}()

  -function() {}()

  ~function() {}()


Provavelmente você já deve ter visto essa sintaxe, principalmente em arquivos minificados (talvez um plugin jQuery).

_E qual a vantagem de usar um desses operadores no lugar dos parênteses?_

Um caractere a menos! Para minificação de código, qualquer caractere a mais já faz diferença!

## Invocando funções como método de um objeto

Para invocar uma função _como método_, precisamos de um objeto. Depois, passamos uma função para ele. Quando temos uma função que é retornada por um objeto, nós a chamamos de `método`:

  var obj = {};
  obj.func = function() {};
  obj.func();

Dessa forma, nós estamos trabalhando com _orientação a objetos_ em Javascript!

_E qual a diferença de invocar uma função “como função” e invocar “como método” de um objeto?_

Em outras linguagens, o `this` dentro de uma classe representa o objeto que está envolvendo esse parâmetro. Esse `this`depende da forma como essa classe foi declarada.

Já em Javascript, o contexto do método (`this`) depende da forma de como a função é **invocada**.
Invocando a função `func` como método do objeto `obj`, o `this` usado dentro da função representa o `obj`.

Experimente colar no seu console dessa forma:

  var obj = {};
  obj.func = function() {
    return this;
  };
  console.log( obj.func() );


O retorno será um _Objeto_ (no caso, o `obj`), contendo o método `func`.

Agora, faça o teste sem o objeto:

  function func() {
    return this;
  }
  console.log( func() );


O que é retornado? O _Objeto_`window`!

_Porque_?

Por que estamos declarando a função no escopo global. Com isso, podemos dizer que toda função é um método. Nesse caso, `func` foi declarada como um método de `window`, que é nosso objeto global no browser.

Para ter uma visão melhor de orientação a objetos aqui, podemos declarar a função `func` como método do objeto `window`:
  
  window.func = function() {
    return this;
  }
  console.log( window.func() );


E o resultado é o mesmo que o anterior! O `this` é o objeto `window`. Assim fica mais fácil de entender o `this`, não? Mas falaremos mais sobre ele um pouco mais à frente :)

O que você precisa saber aqui é que, dependendo de como você invoca a função, assim o contexto dela será definido.

## Invocando funções como construtores

Outra forma de invocar funções é como _construtores_, usando a palavra-chave `new`. Fazendo isso, criamos um novo objeto vazio, que será o contexto da nossa função. Exemplo:

  function Func() {
    this.method = function() {
      return this;
    };
  }
  
  var newObj = new Func();
  console.log( newObj.method() );


Você pode ver que um construtor nada mais é que uma simples função. Novamente: o que vai mudar aqui é a forma como essa função é invocada. Ao invocar como construtor, um novo objeto é criado e passado como referência ao construtor como o parâmetro `this`.

Perceba que na função construtora `Func` não temos um `return` diretamente no corpo dela, pois como usamos o `new`para invocá-la, implicitamente o `this` já é o novo objeto criado, e este objeto é automaticamente retornado, se não tiver um `return` explícito na função.

Para saber se o código acima se refere mesmo ao objeto `newObj`, criado a partir da função construtora, podemos testar dessa forma:
  
  function Func() {
    this.method = function() {
      return this;
    };
  }
  
  var newObj = new Func();
  console.log( newObj.method() === newObj );


O método `method` retorna o `this`. Como invocamos com o `new`, o `this` deve referenciar o objeto que acabamos de criar `newObj`. A instrução acima deveria retornar `true`. :)

Vamos criar dois objetos diferentes para tirar a prova real:

  function Func() {
    this.method = function() {
      return this;
    };
  }
  
  var newObj = new Func();
  var newObj2 = new Func();
  
  console.log( newObj.method() === newObj );
  console.log( newObj2.method() === newObj2 );
  
  console.log( newObj.method() === newObj2 );
  console.log( newObj2.method() === newObj );


Dessa forma, podemos visualizar melhor a vantagem de utilizar construtores: você cria um único método, genérico e reutilizável, que pode ser referenciado por instâncias diferentes, não precisando repetir código :)

O resultado é que:

*   O método `method` de `newObj`, que retorna `this` é exatamente o objeto `newObj`;
*   O método `method` de `newObj2`, que retorna `this` é exatamente o objeto `newObj2`.

Mas fazendo a comparação com o outro objeto, podemos ver que isso é bastante consistente, e o valor retornado é `false`para os dois casos:

*   O método `method` de `newObj` não faz referência ao `newObj2`;
*   E nem o método `method` de `newObj2` faz referência ao `newObj`.

**Observação:** por definição, usamos nomes de construtores com a primeira letra maíuscula, para saber que essa função será usada como _construtor_.

## Invocando funções com `call()` e `apply()`

_Invocar funções com outras funções? Pra quê isso?_

Função não são objetos? Então! Se elas são objetos, então elas podem ter propriedades e métodos, certo? Vamos começar brincando um pouco:

  function func() {
    return 'oi';
  }
  
  func.bye = function() {
    return 'Good bye!';
  }
  
  console.log( func() ); // oi
  console.log( func.bye() ); // Good bye!


_Isso é sério? Tá de zua né?_

Não tô! Cole o código acima no seu console pra você ver :P

O primeiro `console.log()` vai retornar `oi`, pois é o retorno da função. Depois, usamos das habilidades da função ser um objeto, e criamos um método chamado `bye`, que recebe uma função, que retorna `Good bye!`. Essa é uma das maravilhas que a programação funcional te proporciona!

Agora, voltando ao assunto: sempre que uma função é criada, ela tem algumas propriedades específicas de funções:

*   A propriedade `name`, que retorna como `String` o nome da função;
*   Os métodos `call()` e `apply()`, que veremos a seguir.

**Sobre a propriedade `name`:** se você passa uma função anônima como valor de uma variável, o `name` vai retornar uma_String vazia_, pois a função não tem nome. Não confunda o nome da variável com o nome da função, ok?

Exemplo:

  function test() {}
  console.log( test.name ); // "test"
  
  var test2 = function() {};
  console.log( test2.name ); // ""


### Os métodos `call()` e `apply()`

Esses dois métodos fazem exatamente a mesma coisa: invocam uma função, onde você pode passar o contexto que você quiser. Eles só diferem na sintaxe.

O `call()`, recebe como primeiro parâmetro o contexto da função, e os outros parâmetros - pode passar quantos quiser - serão passados como argumentos para a função referenciada.

Exemplo:

  function func( arg1, arg2 ) {
    return this + ' - ' + arg1 + ' - ' + arg2;
  }
  console.log( func.call( 'contexto', 10, 'oie' ) ); // contexto - 10 - oie


Veja que o `this` da função é retornado como a string `contexto`, pois foi o que eu passei no primeiro parâmetro. Depois, no segundo e terceiro parâmetros de `call()`, ele transportou para a função como primeiro e segundo argumentos, respectivamente.

Lembrando que o contexto é você quem decide. Você poderia passar um objeto, por exemplo:

  function func() {
    return this.method();
  }
  
  var obj = {
    method: function() {
      return 'method de obj';
    }
  };
  
  console.log( func.call( obj ) ); // method de obj


Veja que agora não passamos nenhum parâmetro para função `func`, através do método `call()`. Só passamos como contexto da função, o objeto `obj`. Esse objeto tem um método chamado `method`.

Como agora `obj` é o contexto de `func`, o `this` dentro de `func` faz referência a `obj`. Por isso podemos retornar `this.method();` dentro de `func`. Ficou claro?

O método `apply()` faz exatamente a mesma coisa que `call()`. A diferença está nos parâmetros passados: `apply()`recebe apenas dois parâmetros: o primeiro é o contexto, igual `call()`, e o segundo é um `Array` de argumentos que serão passados para a função. Usando o mesmo exemplo de `call()`, mas com `apply()`, ficaria assim:

  function func( arg1, arg2 ) {
    return this + ' - ' + arg1 + ' - ' + arg2;
  }
  console.log( func.apply( 'contexto', [ 10, 'oie' ]) ); // contexto - 10 - oie


E o resultado é exatamente o mesmo! Agora você me pergunta:

_E precisa de duas abordagens diferentes pra fazer a mesma coisa?_

Sim! Imagine se você precisa passar como argumentos de uma função vários parâmetros que você precisa iterar em um `for`. Como você faria? Não tem como passar os parâmetros, separados por vírgula. O que você faz então é: cria um array, coloca todos os parâmetros dentro desse array, e invoca a função com `apply()`. Simples, não?

## O método bind()

Apesar de não servir para invocação de funções, acho que é bastante importante falar sobre o método `bind()`. Esse método faz a mesma coisa que os dois citados acima (`call()` e `apply()`), tem a mesma sintaxe de `call()`, com a diferença que ele não invoca a função, mas somente _injeta_ o contexto e os argumentos para que a função possa ser chamada no futuro já com essas configurações pré-definidas.

Exemplo:

  function func( arg1, arg2 ) {
    return this + ' - ' + arg1 + ' - ' + arg2;
  }
  
  var funcConfig = func.bind( 'contexto', 10, 'oie');
  console.log( funcConfig() ); // contexto - 10 - oie


Mas esse método acaba sendo um pouco lento, pois ele é novo, e ainda não foi muito bem implementado pelos navegadores. Uma alternativa, é, novamente, se aproveitar da programação funcional, e criar um _polyfill_ para usar como `bind()`. Podemos fazer algo assim:

  function bind() {
    var func = arguments[0];
    var that = arguments[1];
    var args = Array.prototype.slice.call( arguments, 2 );
    return func.apply( that, args );
  }
  
  function func( arg1, arg2 ) {
    return this + ' - ' + arg1 + ' - ' + arg2;
  }
  
  console.log( bind( func, 'contexto', 10, 'oie' ) );


Criamos a função que faz o papel do método `bind()`. Essa função vai receber 3 ou mais parâmetros, um pouco diferente do `bind()` nativo, que recebe 2 ou mais: o primeiro parâmetro é a função, onde serão injetados o contexto e os argumentos. O segundo segue o padrão normal: o contexto e depois os argumentos, no mesmo formato de `call()`.

_Mas na função `bind()` você não passou nenhum parâmetro! Como pode isso funcionar? E o que é aquele `arguments`?_

Vamos ver agora! :D

## `arguments` e `this`

Toda função recebe - implicitamente - dois parâmetros: `this` e `arguments`.

O `this`, como já vimos, se refere ao contexto da função. Já o `arguments` recebe uma coleção de argumentos que foram passados para a função.

_Porque você disse “coleção”? Ele não é um `Array`?_

Não! Apesar de você poder utilizar a mesma notação do `Array`, pegando o primeiro argumento passado para a função com `arguments[0]`, e também podendo ver a quantidade de argumentos passados com a propriedade `length`, podendo ser usado como `arguments.length`, as semelhanças com array acabam aqui.

Com isso nós temos um problema: nós não podemos usar os métodos de um `Array` comum na coleção `arguments`!

Mas, de novo, a lindeza da linguagem funcional aparece, e mostra quão poderoso é o Javascript. Baseado em **Herança Prototipal (_Prototypal Inheritance_)**, nós podemos invocar os métodos do `Array`, utilizando `call()` ou `apply()` para passar o nosso _pseudo-array_ como contexto da função!

_Hã?_

Vou exemplificar:
  
  var arr = [1, 2, 3];
  console.log( arr.slice( 1 ) ); // [ 2, 3 ]


O método `slice()` remove a quantidade de itens, passada como parâmetro, a partir do início do array.

Invocando esse método com `call()`, ele ficaria assim:

  var arr = [1, 2, 3];
  console.log( arr.slice.call( arr, 1 ) ); // [ 2, 3 ]


Ou seja, o contexto é o próprio array, que usei como objeto, e repeti, passando-o no primeiro parâmetro, então não há necessidade de eu chamar assim. Mas no caso da nossa função `bind()` acima, o `arguments` não é um `Array`, logo, não podemos usar o método `slice()`.

_Duvido!_

Tente! A função ficaria assim:
  
  function bind() {
    var func = arguments[0];
    var that = arguments[1];
    var args = arguments.slice( 2 );
    return func.apply( that, args );
  }
  
  function func( arg1, arg2 ) {
    return this + ' - ' + arg1 + ' - ' + arg2;
  }
  
  console.log( bind( func, 'contexto', 10, 'oie' ) );


E você vai tomar um erro na cara! Porque eu te disse que o `arguments` não é um `Array` :P

Então o que fazemos é (explicando a função `bind()` toda):

*   Declaramos algumas variáveis no início, pra facilitar a visualização. `func` recebe o primeiro parâmetro (`arguments[0]`);
*   `that` recebe o `this`, que é o contexto, passado no segundo parâmetro (`arguments[1]`);
*   `args` recebe todos os outros parâmetros, menos os dois primeiros, por isso precisamos usar o `slice`.
*   e finalmente, retornamos a função passada no primeiro parâmetro, invocando ela com `apply()` para que possamos passar o contexto que está em `that` e o `Array` de argumentos em `args`. Aqui só precisamos da notação de `Array`, então não precisamos converter novamente :)

Entendeu a ideia do nosso bind? É uma função que retorna uma outra função. Para que a segunda função seja invocada junto da primeira chamada, você teria que fazer algo como:

  bind( func, 'contexto', 10, 'oie' )();

A primeira chamada do operador `()` passa os parâmetros para dentro da função. Mas o retorno dela é uma função literal, por isso precisamos usar novamente o operador `()`, para que, dessa vez, a função que é o retorno seja executada!

Espero que tenha ficado claro como funciona a invocação de funções em Javascript, o método `bind()` e os parâmetros implícitos `this` e `arguments`.