function Cesta() {

    this.items  = [];

	this.valorTotal = 0;
	
	this.totalItens = 0;

	this.adicionar = function(produto){
		if (this.items.length === 0) {
    		produto.preco.replace('$','');
        	this.items.push(produto);
    	} else {
	        var found = false;
	        for (i = 0; i < this.items.length; i++) {
	            if (produto.nome === this.items[i].nome) {
	                this.items[i].quantidade += 1;
	                found = true;
	                break;
	            }
	        }
	        if (!found) {
		    	produto.preco.replace('$','');
		        this.items.push(produto);
	        }
    	}
	}

	this.remover = function(posicao){
		this.items.shift(posicao,1);
	}

	this.recalcular = function(produto){
		this.valorTotal = 0;
		this.totalItens = 0;
		for (i = 0; i < this.items.length; i++) {
            this.totalItens += this.items[i].quantidade;
            this.valorTotal += (parseInt(this.items[i].quantidade) * parseFloat(this.items[i].preco)).toFixed(2);
        }
	}

	this.mudaQuantidadeItem = function(posicao,quantidade){
		this.items[posicao].quantidade = quantidade;
		this.recalcular();
	}

	this.esvaziar = function(){
		this.valorTotal = 0;
		this.totalItens = 0;
		this.items = [];
	}
}