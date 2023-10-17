// Declaring an object 
let pokemonRepository = (function () {
    let pokemonList = [
        { name: 'Bulbasaur', type: ['GRASS', 'POISON'], height: 0.7 },
        { name: 'Caterpie', type: 'BUG', height: 0.3 },
        { name: 'Nidoqueen', type: ['GROUND', 'POISON'], height: 1.3 }
    ];

    function add (pokemon) {
      pokemonList.push(pokemon);
    }

    function getAll () {
      return pokemonList;
    }

    return {
      add: add,
      getAll: getAll
    };
})();

// Adding a pokemon 
pokemonRepository.add({ name: 'Hypno', type: 'PSYCHIC', height: 1.6});

// Setting up a table
document.write("<table><caption>My Pokémons</caption><thead><tr><th>Name</th><th>Type</th><th>Height(m)</th></tr></thead><tbody>");

// Adding rows to the table 
pokemonRepository.getAll().forEach(function (pokemon) {
  if (Array.isArray(pokemon.type)) {
    document.write("<tr><td>" + pokemon.name + "</td><td>" + pokemon.type.join(" ") + "</td><td>" + pokemon.height + "</td></tr>");
  } else {
    document.write("<tr><td>" + pokemon.name + "</td><td>" + pokemon.type + "</td><td>" + pokemon.height + "</td></tr>");
  }
});

//Closing table tags
document.write("</tbody>></table>");

// A do while loop checking checking which pokemon is higher than 1m and printing it
let i = 0;
do {
    i++;
    if(pokemonRepository.getAll()[i]?.height > 1) {
        document.write("<p>Wow " + pokemonRepository.getAll()[i].name + " is big!</p>");
    }
}
while(i < pokemonRepository.getAll().length);