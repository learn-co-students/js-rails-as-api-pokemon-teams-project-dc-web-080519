
//urls
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const container = document.querySelector('main')

//event listeners
document.addEventListener("DOMContentLoaded", function(){
  console.log("I choose you!")
  getTrainers(TRAINERS_URL)
})

function getTrainers(url) {
  fetch(url)
  .then(response => response.json())
  .then(trainers => renderTrainers(trainers))
}

function renderTrainers(trainers) {
  trainers.forEach(trainer => {
    let card = document.createElement('div')
    let trainerName = document.createElement('p')
    let btn = document.createElement('button')
    let ul = document.createElement('ul')

    card.className = "card"
    card.setAttribute("data-id", trainer.id)

    trainerName.innerText = trainer.name
    card.appendChild(trainerName)

    btn.setAttribute("data-trainer-id", trainer.id)
    btn.textContent = "Add Pokemon"
    btn.addEventListener('click', addPokemonBtnHandler)


    card.appendChild(btn)
    card.appendChild(ul)
    trainer.pokemons.forEach(pokemon => renderLI(ul, pokemon))
    container.appendChild(card)
  })
}

function renderLI(ul, p) {
  // let p = pokemon
  let li = document.createElement('li')
  let btn = document.createElement('button')

    // li.innerHTML = `${p.nickname} (${p.species})
    // <button class='release' data-pokemon-id= ${p.id}>Release</button>`

  li.innerText = `${p.nickname} (${p.species})`

    btn.className = "release"
    btn.setAttribute("data-pokemon-id", `${p.id}`)
    btn.innerText = "Release"
    btn.addEventListener('click', releasePokemonBtnHandler)

    li.appendChild(btn)


    ul.appendChild(li)
  }


function addPokemonBtnHandler(e) {
  let trainerId = e.currentTarget.dataset.trainerId
  let ul = e.currentTarget.nextSibling
  // below is incase code is rearranged and ul isn't 'next sibling' of btn
  // let ul = e.currentTarget.parentElement.querySelector('ul')

  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({trainer_id: trainerId})
  })
  .then(r => r.json())
  .then(data => {
    if (!!data.status) {
      swal(data.message, "Release some Pokemon to make space.", "warning")
    } else {
      renderLI(ul, data)
    }
  })
    // renderLI(ul, newPokemon))

}

function addBtnResponse(r) {
  if (!!r.status) {

  } else {

  }
}

function releasePokemonBtnHandler(e) {
  let pokemonId = e.currentTarget.dataset.pokemonId
  let li = e.currentTarget.parentElement
  let pURL = POKEMONS_URL + '/' + pokemonId
  // debugger
  fetch(pURL, {method: 'DELETE'})
  .then(r => r.json())
  .then(data =>
    console.log(data.nickname + ' has been deleted'))

  li.remove()
}
