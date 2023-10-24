// Declaring an object 
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    // Checking if modification is an object and if the key is the same
   if (typeof pokemon === "object" && "name" in pokemon) {  
        pokemonList.push(pokemon);
       }
   else {
       alert("Added pokemon must be a correct object");
    }
  }
  // Function to find Pokemons info only by name
  function getByName(pokemonName) {
    let pokemon = pokemonList.filter(pokemon => pokemon.name === pokemonName);
    return pokemon;
  }
  // Function getting all Pokemons
  function getAll() {
    return pokemonList;
  }
  // Function adding Pokemons to the list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    addButtonListener(button, pokemon); //Calling function to add click event to button
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
  }
  // Function showing loading message
  function showLoadingMessage () {
    let msg = document.querySelector("#loading-msg");
    msg.innerText = "The items are being loaded";
  }
  // Function hiding loading message
  function hideLoadingMessage () {
    let msg = document.querySelector("#loading-msg");
    msg.innerText = "";
  }
  // Function show the name of clicked Pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
  // Function adding click event to a button
  function addButtonListener(button, pokemon) {
    button.addEventListener('click', function () { showDetails(pokemon) });
  }
  // Function fetching all Pokemons
  function loadList() {
    showLoadingMessage(); // Executing function showing loading msg 
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage(); // Executing function hiding loading msg because the response has been received
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage(); // Executing function hiding loading msg because the response has been received
      console.error(e);
    })
  }
  // Function fetching specific Pokemon's details
  function loadDetails(item) {
    showLoadingMessage(); // Executing function showing loading msg 
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage(); // Executing function hiding loading msg because the response has been received
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage(); // Executing function hiding loading msg because the response has been received
      console.error(e);
    });
  }
  return {
    add: add,
    getByName: getByName,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    addButtonListener: addButtonListener,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  };
})();

// // Loading list of pokemons 
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
