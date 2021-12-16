let pokemonsList=[
    {name:"Venusaur",height:2 , type:["grass","poison"]},
    {name:"Wartortle", height:"1", type:"water"}, 
    {name:"Cubchoo", height: 0.5, type:"ice"}];
    
 // adding the loop to create list of pokemons and highlighting the largest one
for (let i = 0; i < pokemonsList.length; i++) {
     document.write('<br>', '<br>' + pokemonsList[i].name + (',  height:   ') + pokemonsList[i].height) ;
    if (pokemonsList[i].height >= 2) {
      document.write( ' - Wow, that\'s big!' ) ;
    }
  } 
 
