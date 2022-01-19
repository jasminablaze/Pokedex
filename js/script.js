let pokemonRepository = (function() {
    let modalContainer = document.querySelector('#modal-container');
    //Created an empty array of pokemon objects to use with the 'PokéAPI'.
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';

    //Created function to return all items within the pokemonList array, on demand.
    function getAll() {
        return pokemonList;
    }

    //Created function to add new pokemon to the pokemonList array.
    function add(newPokemon) {
        //Explanation: if-else statement to check whether new pokemon entered is an object.
        if (typeof newPokemon === 'object') {
            pokemonList.push(newPokemon);
        } else {
            console.log('Did not add - this must be an object');
        }
    }

    function addListItem(pokemon) {
        let expandablePokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        //Explanation: the code below also serves to capitalize the pokemon's name
        button.innerText = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        expandablePokemonList.appendChild(listItem);
        //Explanation: added event listener to all pokemon buttons, to show pokemon details on 'click' event.
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    //Function to show details of the pokemon on the button 'click' event, called above within addListItem function.
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    //Function to fetch name & detailsUrl from PokéAPI.
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            //Added for loops for types to iterate over multiple items
            item.types = [];
            for (let i = 0; i < details.types.length; i++) {
                let typesDetails = details.types[i].type.name;
                item.types.push(typesDetails[0].toUpperCase() + typesDetails.substring(1));
            }
            item.abilities = [];
            for (let i = 0; i < details.abilities.length; i++) {
                let abilitiesDetails = details.abilities[i].ability.name;
                item.abilities.push(abilitiesDetails[0].toUpperCase() + abilitiesDetails.substring(1));
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Function to show a Modal with details about a pokemon.
    function showModal(pokemon) {
        //To clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        //Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'x';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = "Height: " + pokemon.height;

        let pokemonWeight = document.createElement('p');
        pokemonWeight.innerText = "Weight: " + pokemon.weight;

        let typesElement = document.createElement('p');
        let pokeTypes = pokemon.types;
        typesElement.innerText = "Type(s): " + pokeTypes.join(', ');

        let pokemonImage = document.createElement('img');
        pokemonImage.setAttribute("src", pokemon.imageUrl);

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonWeight );
        modal.appendChild(typesElement);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    //Hide the modal when a user presses the 'Escape' key.
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
    });

    //Hide the modal when a user presses outside the modal, on the modal container.
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
    });

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});