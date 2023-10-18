// Declaring an object 
let pokemonRepository = (function () {
  let pokemonList = [
    { name: 'Bulbasaur', type: ['GRASS', 'POISON'], height: 0.7 },
    { name: 'Caterpie', type: 'BUG', height: 0.3 },
    { name: 'Nidoqueen', type: ['GROUND', 'POISON'], height: 1.3 }
  ];

  function add(pokemon) {
    // Checking if modification is an object
    if (typeof pokemon === "object") {
      // Checking if the keys are the same 
      if (Object.keys(pokemon).toString() === Object.keys(pokemonList[0]).toString()) {
        pokemonList.push(pokemon);
      }
      else {
        alert("Object must have following keys: name, type, height");
      }
    }
    else {
      alert("Added pokemon must be an object");
    }
  }
  // Function to find Pokemons info only by name
  function getByName(pokemonName) {
    let pokemon = pokemonList.filter(pokemon => pokemon.name === pokemonName);
    return pokemon;
  }
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
  // Function show the name of clicked Pokemon
  function showDetails(pokemon) {
    console.log('Clicked Pokemon\'s name: ' + pokemon.name);
  }
  // Function adding click event to a button
  function addButtonListener(button, pokemon) {
    button.addEventListener('click', function () { showDetails(pokemon) });
  }

  return {
    add: add,
    getByName: getByName,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    addButtonListener: addButtonListener
  };
})();

// Adding a pokemon 
pokemonRepository.add({ name: 'Hypno', type: 'PSYCHIC', height: 1.6 });

// Adding rows to the table 
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
