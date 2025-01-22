class CreatePlaceTypes < ActiveRecord::Migration[8.0]
  def change
    create_table :place_types do |t|
      t.string :title
      t.string :key
      
      t.timestamps
    end
  end
end
