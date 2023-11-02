// Declaring a IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';
  let input = document.querySelector('#search');

  function add(pokemon) {
    // Checking if modification is an object and if the key is the same
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      alert('Added pokemon must be a correct object');
    }
  }

  // Function getting all Pokemons
  function getAll() {
    return pokemonList;
  }

  // Function adding Pokemons to the list
  function addListItem(pokemon) {
    let listcontainer = document.querySelector('.row');

    let listpokemon = document.createElement('li');
    listpokemon.classList.add(
      'list-group-item',
      // 'list-group-item-action',
      'list-unstyled',
      'col-md-3',
      'col-sm-4',
      'pokemon-item'
    );

    let button = document.createElement('button');
    button.classList.add('btn', 'button-89');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal');
    button.innerText = pokemon.name;
    listpokemon.appendChild(button);
    listcontainer.appendChild(listpokemon);
    addButtonListener(button, pokemon); //Calling function to add click event to button
  }

  // Function showing loading message
  function showLoadingMessage() {
    let loadingScreen = document.querySelector('.loading-screen');
    let loader = document.querySelector('#loader');
    loadingScreen.classList.add('display');
    loader.classList.add('display');
    setTimeout(() => {
      loader.classList.remove('display');
    }, 5000000);
  }

  // Function hiding loading message
  function hideLoadingMessage() {
    let loadingScreen = document.querySelector('.loading-screen');
    let loader = document.querySelector('#loader');
    loadingScreen.classList.remove('display');
    loader.classList.remove('display');
  }

  //  Function creating a modal
  function showModal(name, height, weight, imageUrl, types) {
    let modalBody = document.querySelector('.modal-body');
    let modalTitle = document.querySelector('.modal-title');
    let modalHeader = document.querySelector('.modal-header');
    modalHeader.innerHTML = '';
    modalBody.innerHTML = '';
    modalHeader.appendChild(modalTitle);

    modalTitle.innerText = name;

    let closeBtn = document.createElement('button');
    closeBtn.classList.add('close');
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('data-dismiss', 'modal');
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = '<span aria-hidden="true">&times;</span>';

    let imgElement = document.createElement('img');
    imgElement.setAttribute('src', imageUrl);
    // imgElement.setAttribute('width', 200);
    // imgElement.setAttribute('height', 200);

    modalHeader.appendChild(imgElement);
    modalHeader.appendChild(closeBtn);

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + height / 10 + ' m';

    let weightElement = document.createElement('p');
    weightElement.innerHTML = 'Weight: ' + weight / 10 + ' kg';
    // console.log(types);
    let typesElement = document.createElement('p');
    typesElement.innerText = 'Types: ' + types.join(', ');

    modalBody.classList.add('text-center');
    modalBody.appendChild(heightElement);
    modalBody.appendChild(weightElement);
    modalBody.appendChild(typesElement);
  }

  // Function show the name of clicked Pokemon
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(
        pokemon.name,
        pokemon.height,
        pokemon.weight,
        pokemon.imageUrl,
        pokemon.types
      );
    });
  }

  // Function adding click event to a button
  function addButtonListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  function wait(ms, value) {
    return new Promise((resolve) => setTimeout(resolve, ms, value));
  }

  // Function fetching all Pokemons
  function loadList() {
    showLoadingMessage(); // Executing function showing loading msg
    return fetch(apiUrl)
      .then((value) => wait(2000, value))
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        hideLoadingMessage(); // Executing function hiding loading msg because the response has been received
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage(); // Executing function hiding loading msg because the response has been received
        console.error(e);
      });
  }

  // Function fetching specific Pokemon's details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;

        for (let i = 0; i < item.types.length; i++) {
          item.types[i] = details.types[i].type.name;
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Function searching through list items
  function search() {
    let filter, li, i, txtValue, buttonPokemon;
    filter = input.value.toUpperCase();
    li = document.getElementsByClassName('list-group-item');
    for (i = 0; i < li.length; i++) {
      buttonPokemon = li[i].getElementsByClassName('btn')[0];
      txtValue = buttonPokemon.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  }

  // Method adding an event when typing in search field
  input.addEventListener('keyup', search);

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
    hideLoadingMessage: hideLoadingMessage,
    search: search
  };
})();

// // Loading list of pokemons
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
