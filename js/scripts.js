// Declaring a IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    // Checking if modification is an object and if the key is the same
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    }
    else {
      alert("Added pokemon must be a correct object");
    }
  }

  // Function getting all Pokemons
  function getAll() {
    return pokemonList;
  }

  // Function adding Pokemons to the list
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".row");

    let listpokemon = document.createElement("li");
    listpokemon.classList.add("list-group-item", "list-group-item-action", "col-md-4", "col-sm-4", "pokemon-item");

    let button = document.createElement('button');
    button.classList.add("btn", "btn-success", "btn-block");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#modal");
    button.innerText = pokemon.name;
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    addButtonListener(button, pokemon); //Calling function to add click event to button
  }

  // Function showing loading message
  function showLoadingMessage() {
    let msg = document.querySelector("#loading-msg");
    msg.innerText = "The items are being loaded";
  }

  // Function hiding loading message
  function hideLoadingMessage() {
    let msg = document.querySelector("#loading-msg");
    msg.innerText = "";
  }

  //  Function creating a modal
  function showModal(name, height, imageUrl) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');
    modalBody.innerHTML = '';

    modalTitle.innerText = "Name: " + name;

    let heightElement = document.createElement('p');
    heightElement.innerText = "Height: " + height + " m";

    let imgElement = document.createElement('img');
    imgElement.setAttribute("src", imageUrl);

    modalBody.classList.add("text-center");
    modalBody.appendChild(heightElement);
    modalBody.appendChild(imgElement);
  }

  // Function show the name of clicked Pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
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
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    showModal: showModal,
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
