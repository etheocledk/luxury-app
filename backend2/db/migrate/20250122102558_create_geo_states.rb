class CreateGeoStates < ActiveRecord::Migration[8.0]
  def change
    create_table :geo_states do |t|
      t.string :title
      t.string :code
      t.string :key

      t.timestamps
    end
  end
end
