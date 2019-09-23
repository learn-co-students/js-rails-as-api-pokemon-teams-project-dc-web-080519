const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", showAllCards)

function showAllCards(e){
    let main = document.querySelector("main")
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => {
        trainers.forEach(trainer => {
            let card = document.createElement("div")
            card.className = "card"
            card.innerHTML = `<h3> ${trainer.name} </h3>`
            let pokemonList = document.createElement("ul")
            pokemonList.className = "pokemonList"
            let pokemonObject = trainer.pokemons
            pokemonObject.forEach(pokemon => {
                let entry = document.createElement("li")
                entry.id = pokemon.id
                entry.innerText = `${pokemon.nickname} the ${pokemon.species}`
                let deleteButton = document.createElement("button")
                deleteButton.innerText = "x"
                deleteButton.className = "release"
                deleteButton.addEventListener("click", deletePokemon)
                entry.appendChild(deleteButton)
                pokemonList.appendChild(entry)
                entry.appendChild(document.createElement("hr"))
            })
            let newPokeForm = document.createElement("form")
            newPokeForm.innerHTML = `
                <h6> Add a new Pokémon </h6>
                <label for="nickname"> Name:  </label>
                <input type="text" name="nickname" class="nickname"></input>
                <br>
                <label for="species"> Species:  </label>
                <input type="text" name="species" class="species"></input>
                <br>
                <button type="submit"> Submit </button>
            `
            card.appendChild(pokemonList)
            card.appendChild(newPokeForm)
            main.appendChild(card)
        })
    })
            
            
            
            
}


function deletePokemon(e){
    let pokemon = e.target.parentElement
    console.log(pokemon.id)
    // pokemon.remove()
    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        // body: `${pokemon}`
    }
    fetch(`${POKEMONS_URL}/${pokemon.id}`, configObj)
    .then(response => pokemon.remove())
}