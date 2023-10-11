// Declaring an object 

let pokemonList = [
    { name: 'Bulbasaur', type: ['GRASS', 'POISON'], height: 0.7 },
    { name: 'Caterpie', type: 'Bug', height: 0.3 },
    { name: 'Nidoqueen', type: ['GROUND', 'POISON'], height: 1.3 }
]
// Setting up a table
document.write("<table><caption>My Pokémons</caption><thead><tr><th>Name</th><th>Type</th><th>Height(m)</th></tr></thead><tbody>");
// Adding rows to the table 
for (let i = 0; i < pokemonList.length; i++) {
  // Checking if and item of the object is an array, if yes printing items with " " instead of a comma
  if (Array.isArray(pokemonList[i].type)) {
    document.write("<tr><td>" + pokemonList[i].name + "</td><td>" + pokemonList[i].type.join(" ") + "</td><td>" + pokemonList[i].height + "</td></tr>");
  } else {
    document.write("<tr><td>" + pokemonList[i].name + "</td><td>" + pokemonList[i].type + "</td><td>" + pokemonList[i].height + "</td></tr>");
  }
}
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