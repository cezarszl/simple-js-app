// Declaring an object 

let pokemonList = [
    { name: 'Bulbasaur', type: ['GRASS', 'POISON'], height: 0.7 },
    { name: 'Caterpie', type: 'Bug', height: 0.3 },
    { name: 'Nidoqueen', type: ['GROUND', 'POISON'], height: 1.3 }
]
// Setting up a table
document.write("<table><caption>My Pokémons</caption><thead><tr><th>Name</th><th>Type</th><th>Height(m)</th></tr></thead><tbody>");
// Adding rows to the table 
pokemonList.forEach(function (pokemon) {
  if (Array.isArray(pokemon.type)) {
    document.write("<tr><td>" + pokemon.name + "</td><td>" + pokemon.type.join(" ") + "</td><td>" + pokemon.height + "</td></tr>");
  } else {
    document.write("<tr><td>" + pokemon.name + "</td><td>" + pokemon.type + "</td><td>" + pokemon.height + "</td></tr>");
  }
});

//Closing table tags
document.write("</tbody>></table>");

//A do while loop checking checking which pokemon is higher than 1m and printing it
let i = 0;
do {
    i++;
    if(pokemonList[i]?.height > 1) {
        document.write("<p>Wow " + pokemonList[i].name + " is big!</p>");
    }
}
while(i < pokemonList.length);