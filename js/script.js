
//Created an IIFE to wrap the previous 'global variables' and turn them into 'local variables'.*/
let pokemonRepository = (function() {
    
  let pokemonList = [
      {name:"Venusaur",height:2 , type:["grass","poison"]},
      {name:"Wartortle", height:"1", type:"water"}, 
      {name:"Cubchoo", height: 0.5, type:"ice"}
  ];
  function nameList (name){
      return (name === pokemonList.name);
  }
  pokemonList.filter(nameList);
  
  //Function to return all items within the pokemonList array.
    function getAll() {
      return pokemonList;
  }

  //Created function to, when required, add new pokemon to the pokemonList array.
  function add(newPokemon) {
      pokemonList.push(newPokemon);
      //Explanation: if-else statement to check whether new pokemon entered is an object.
      if (typeof newPokemon === 'object') {
          pokemonList.push(newPokemon);
      } else {
          console.log('Did not add - this must be an object');
      }
  }
     return {
      getAll: getAll,
      add: add
  };
})();

//Added an if-else statement to highlight the largest pokemon in the array.*/
function printArrayDetails(list) {
  list.forEach(function(pokemon) {
      if (pokemon.height >= 2.0) {
         document.write('<br>', '<br>'  + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big! ');
      } else {
         document.write('<br>', '<br>' + pokemon.name + ', (height:   ' + pokemon.height +')') ;
          

      }
  });
}

printArrayDetails(pokemonRepository.getAll());
    

