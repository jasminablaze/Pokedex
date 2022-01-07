let pokemonRepository = (function() {
    
    let pokemonList = [
    {
        name:"Venusaur",
        height:2 , 
        type:["grass","poison"]
    },
    {
        name:"Wartortle", 
        height:"1",
        type:"water"
    }, 
    {
            name:"Cubchoo",
         height: 0.5,
          type:"ice"
        },
        {
            name:"Charmander",
            height:0.6 , 
            type:["fire"]
        },
    ];
    function add(pokemon) {
        
        if (
        typeof pokemon === 'object' &&
        'name' in pokemon &&
        'type' in pokemon &&
        'height' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is not correct');
        }
    }
    function getAll() {
        return pokemonList;
    }
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);

        //on-click event
        button.addEventListener('click', function() {
            showDetails(pokemon)
        });
      }

      function showDetails(pokemon) {
        console.log(pokemon);
    };
      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
      };
      
})();

pokemonRepository.add({ 
    name: "Pikachu",
    height: 0.3,
    type: ["electric"] 
});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
