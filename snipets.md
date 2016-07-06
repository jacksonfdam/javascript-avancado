function A(x) {
   function B(y) {
      function C(z) {
         alert(x + y + z);
      }
      C(3);
   }
   B(2);
}
A(1); // Exibe um alerta com o valor 6 (1 + 2 + 3)


function fora() {
   var x = 10;
   function dentro(x) {
      return x;
   }
   return dentro;
}
result = fora()(20); // retorna 20 em vez de 10


var criarPet = function(nome) {
  var sex;
  
  return {
    setNome: function(newNome) {
      nome = newNome;
    },
    
    getNome: function() {
      return nome;
    },
    
    getSex: function() {
      return sex;
    },
    
    setSex: function(newSex) {
      if(typeof newSex == "string" && (newSex.toLowerCase() == "macho" || newSex.toLowerCase() == "fêmea")) {
        sex = newSex;
      }
    }
  }
}

var pet = criarPet("Vivie");
pet.getNome();                  // Vivie

pet.setNome("Oliver");
pet.setSex("macho");
pet.getSex();                   // macho
pet.getNome();                  // Oliver


function Pessoa() {
  var self = this; // Alguns preferem 'that' em vez de 'self'. 
                   // Escolha um e seja consistente.
  self.
idade 
= 0;

  setInterval(function crescer() {
    // A chamada de retorno refere-se à variável 'self' na qual
    // o valor é o objeto esperado.
    self.
idade
++;
  }, 1000);
}


function Pessoa(){
  this.idade = 0;

  setInterval(() => {
    this.idade++; // propriedade |this|refere ao objeto pessoa
  }, 1000);
}

var p = new Pessoa();


function JSClock() {
  var time = new Date();
  var hora = time.getHours();
  var minuto = time.getMinutes();
  var segundo = time.getSeconds();
  var temp = "" + ((hora > 12) ? hora - 12 : hora);
  if (hora == 0)
    temp = "12";
  temp += ((minuto < 10) ? ":0" : ":") + minuto;
  temp += ((segundo < 10) ? ":0" : ":") + segundo;
  temp += (hora >= 12) ? " P.M." : " A.M.";
  return temp;
}

var obj = new Object();

function Eletrodomestico() {
	this.ligado = false;
	this.ligar = function() {
		this.ligado = true;
	}
	this.desligar = function() {
		this.ligado = false;
	}
}


function Ventilador(velMax) {
	var maximaPermitida = 5; /* Uso de encapsulamento */
	var velocidadePadrao = 3; /* Variáveis privadas */
	if (velMax > 0 && velMax <= maximaPermitida) {
		this.velocidadeMaxima = velMax;
	} else {
		this.velocidadeMaxima = velocidadePadrao;
	}
}

Ventilador.prototype = new Eletrodomestico(); /* Define o objeto protótipo */
ventilador = new Ventilador(4);
alert(ventilador.ligado); /* Retorna false */
ventilador.ligar();
alert(ventilador.ligado); /* Retorna true  */





