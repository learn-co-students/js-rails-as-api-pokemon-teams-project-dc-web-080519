class TrainerSerializer < ApplicationController
  def initialize(trainer_object)
    @trainer = trainer_object
  end

  def to_serialized_json
    self.to_json(:include => :name)
  end


  def to_serialized_json

    @trainer.to_json({
      :only =>  [:name, :id],
      :include => {
        :pokemons => {
          :only => [:nickname, :species, :id]}
      }
    })

  end

end
