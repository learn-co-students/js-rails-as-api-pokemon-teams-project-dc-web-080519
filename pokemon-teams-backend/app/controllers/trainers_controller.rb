class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers.to_json(:include => {
            pokemons: {only: [:species, :nickname, :trainer_id, :id]}
        }, only: [:name, :id])
    end


end
