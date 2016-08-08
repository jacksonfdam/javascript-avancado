##Documentação
http://docs.themoviedb.apiary.io/#reference/movies/movieid/get

##API
http://api.themoviedb.org/3/

##Token
246bf886104d519a1d2bf62aef1054ff

##Imagens
https://image.tmdb.org/t/p/w370/

##Populares
http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=246bf886104d519a1d2bf62aef1054ff&page=1

##Ultimos
http://api.themoviedb.org/3/movie/latest?sort_by=popularity.desc&api_key=246bf886104d519a1d2bf62aef1054ff&page=1

##Em Cartaz
http://api.themoviedb.org/3/movie/now_playing?api_key=246bf886104d519a1d2bf62aef1054ff&page=1

##Aguardados
http://api.themoviedb.org/3/movie/upcoming?api_key=246bf886104d519a1d2bf62aef1054ff&page=1

##TOP
http://api.themoviedb.org/3/movie/top_rated?api_key=246bf886104d519a1d2bf62aef1054ff&page=1

###Exemplo de Requisição

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            console.log(request.responseText);
        }
    }
    request.open('GET', 'http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=246bf886104d519a1d2bf62aef1054ff&page=1', true);
    request.send(null);

