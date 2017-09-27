$(document).ready(function(){
    $('form').on('submit', function(e) {
        e.preventDefault();

        function createCORSRequest(method, url) {
          var xhr = new XMLHttpRequest();
          if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);
          } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
          } else {
            // CORS not supported.
            xhr = null;
          }
          return xhr;
        }
        // Helper method to parse the title tag from the response.
        function getTitle(text) {
          return text.match('<title>(.*)?</title>')[1];
        }
        // Make the actual CORS request.
        function makeCorsRequest() {
          // This is a sample server that supports CORS.
          var url = 'http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html';
          var xhr = createCORSRequest('GET', url);
          if (!xhr) {
            alert('CORS not supported');
            return;
          }
          // Response handlers.
          xhr.onload = function() {
            var text = xhr.responseText;
            var title = getTitle(text);
            alert('Response from CORS request to ' + url + ': ' + title);
          };
          xhr.onerror = function() {
            alert('Woops, there was an error making the request.');
          };
          xhr.send();
        }

        var userInput = $('#search').val();
        var url = 'https://pokeapi.co/api/v2/pokemon/' + userInput;
        console.log(url);
        $.ajax({
            url : url,
             dataType : 'json',
             method: 'GET',
             success : function(data) {
                var name = data.forms[0].name;
                var pokeImgFront = data.sprites.front_default;
                var pokeImgBack = data.sprites.back_default;
                var pokeImgShinyFront = data.sprites.front_shiny;
                var pokeImgShinyBack = data.sprites.back_shiny;
                var shiny = false;
                var frontImg = true;
                var speed = data.stats[0].base_stat;
                var spDef = data.stats[1].base_stat;
                var spAtk = data.stats[2].base_stat;
                var def = data.stats[3].base_stat;
                var atk = data.stats[4].base_stat;
                var hp = data.stats[5].base_stat;
                var id = '#' + data.id;
                var weight = data.weight;
                var height = data.height;
                var types = [];
                for(var i = 0; i < data.types.length; i++){
                    var type = data.types[i].type.name;
                    types.push(type);
                }

                console.log(types);

                function pokemonType (types) {
                    $('#types').html("");
                    for(var i = 0; i < types.length; i++){
                        $('#types').append("<span class='pokeType " + types[i]+"'>" + types[i] + " </span>");
                    }
                }

                pokemonType(types);
                $("#defaultBtn").click(function(){
                    $('#pokeImage').attr('src', pokeImgFront);
                    shiny =false;
                    frontImg = true;
                });
                $("#shinyBtn").click(function(){
                    $('#pokeImage').attr('src', pokeImgShinyFront);
                    shiny =true;
                    frontImg = true;
                });

                $(".changeBtn").click(function(){
                    if(shiny == false && frontImg == true){
                        shiny =false;
                        frontImg = false;
                        $('#pokeImage').attr('src', pokeImgBack);
                    }else if(shiny == false && frontImg == false){
                        shiny =false;
                        frontImg = true;
                        $('#pokeImage').attr('src', pokeImgFront);
                    }else if(shiny == true && frontImg == true){
                        shiny =true;
                        frontImg = false;
                        $('#pokeImage').attr('src', pokeImgShinyBack);
                    }else if(shiny == true && frontImg == false){
                        shiny =true;
                        frontImg = true;
                        $('#pokeImage').attr('src', pokeImgShinyFront);
                    }
                });

                $('.name').html(name);
                $('.idNum').html(id);
                 $('#pokeImage').attr('src', pokeImgFront);
                 $('.hp').html(hp);
                 $('.attack').html(atk);
                 $('.defense').html(def);
                 $('.special-attack').html(spAtk);
                 $('.special-defense').html(spDef);
                 $('.speed').html(speed);
                 $('.weight').html(weight);
                 $('.height').html(height);
                //console.log(data);
             }//SUCCESS
        });//AJAX
    });//FORM

});
