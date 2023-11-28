// Declaring a IIFE
const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=3000';

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
    const listcontainer = document.querySelector('.row');

    const listpokemon = document.createElement('li');
    listpokemon.classList.add(
      'list-group-item',
      // 'list-group-item-action',
      'list-unstyled',
      'col-md-3',
      'col-sm-4',
      'pokemon-item'
    );

    const button = document.createElement('button');
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
    const loadingScreen = document.querySelector('.loading-screen');
    const loader = document.querySelector('#loader');
    loadingScreen.classList.add('display');
    loader.classList.add('display');
    setTimeout(() => {
      loader.classList.remove('display');
    }, 5000000);
  }

  // Function hiding loading message
  function hideLoadingMessage() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loader = document.querySelector('#loader');
    loadingScreen.classList.remove('display');
    loader.classList.remove('display');
  }

  //  Function creating a modal
  function showModal(name, height, weight, imageUrl, types) {
    const modalBody = document.querySelector('.modal-body');
    const modalTitle = document.querySelector('.modal-title');
    const modalHeader = document.querySelector('.modal-header');
    modalHeader.innerHTML = '';
    modalBody.innerHTML = '';
    modalHeader.appendChild(modalTitle);

    modalTitle.innerText = name;

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close');
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('data-dismiss', 'modal');
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.innerHTML = '<span aria-hidden="true">&times;</span>';

    const imgElement = document.createElement('img');
    imgElement.setAttribute('src', imageUrl);

    modalHeader.appendChild(closeBtn);

    const heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + height / 10 + ' m';

    const weightElement = document.createElement('p');
    weightElement.innerHTML = 'Weight: ' + weight / 10 + ' kg';
    const typesElement = document.createElement('p');
    typesElement.innerText = 'Types: ' + types.join(', ');

    modalBody.classList.add('text-center');
    modalBody.appendChild(imgElement);
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
          const pokemon = {
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
    const url = item.detailsUrl;
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

  return {
    add,
    getAll,
    addListItem,
    showDetails,
    showModal,
    addButtonListener,
    loadList,
    loadDetails,
    showLoadingMessage,
    hideLoadingMessage
  };
})();

// import { pagination } from './pagination.js';
import { pagination } from './pagination.min.js';

// // Loading list of pokemons
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
}).then(() => {
  pagination();
}).catch((err) => {
  console.error(err);
});


//Debounce function
const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
// Function searching through list items

const search = function search() {
  let filter, li, i, txtValue, buttonPokemon;
  filter = input.value.toUpperCase();
  li = document.getElementsByClassName('list-group-item');
  for (i = 0; i < li.length; i++) {
    buttonPokemon = li[i].getElementsByClassName('btn')[0];
    txtValue = buttonPokemon.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
      // li[i].classList.remove('hidden');
    } else {
      li[i].style.display = 'none';
    }
  }
};
// Method adding an event when typing in search field
const input = document.querySelector('#search');
input.addEventListener('keyup', debounce(search, 250));