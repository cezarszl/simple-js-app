let pokemonList = [
    { name: "Bulbasaur", type: ["Grass", "Poison"], height: 0.7 },
    { name: "Caterpie", type: "Bug", height: 0.3 },
    { name: "Rattata", type: "Normal", height: 0.3 }
];

for (let i=0; i <= pokemonList.length; i++) {
    document.write("<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ") </p>" );
}
