var pokemonRepository = (function() {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function addListItem(pokemon) {
    var $pokeList = $('.pokemonNameList');
    var listItem = $('<li class="listOfNames"></li>')
    listItem.text(pokemon.name);
      $pokeList.append(listItem);
    listItem.click(function() {
      showDetails(pokemon)
    });
  }
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        var pokemon = {
          name: item.name,
          height: item.height,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(pokemon) {
    var url = pokemon.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
      pokemon.types = Object.keys(details.types);
    }).catch(function(e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  }; // *** Closes Return
})();

pokemonRepository.loadList().then(function() {
  //Now the data is loaded!
  pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
});

function showModal(pokemon) {
  var $contentImage = $('<img>');
  $contentImage.attr('src', pokemon.imageUrl);

  $('#pokemonTitle').html(pokemon.name);
  $('.modal-body').html('The height of ' + pokemon.name + ' is ' + pokemon.height).append($contentImage);
} // *** Closes showModal *** //
