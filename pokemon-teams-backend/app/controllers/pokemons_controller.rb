class PokemonsController < ApplicationController

  # def index
  #   pokemons = Pokemon.all
  #   render json: pokemons.to_json(except: [:created_at, :updated_at])
  # end

  def create
    # byebug
    t_id = params[:trainer_id]
    trainer = Trainer.find(t_id)
    if trainer.pokemons.length < 6
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      render json: Pokemon.create(trainer_id: t_id, nickname: name, species: species)
    else
      render json: {status: 405, message: "This team is already full."}
    end
    # byebug
  end

  def destroy
    pokemon = Pokemon.find(params[:id])

    # byebug
    # pokemon = Pokemon.find(params[:pokemon_id])
    render json: pokemon.destroy
  end

end
