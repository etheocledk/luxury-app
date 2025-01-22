class CreatePlaces < ActiveRecord::Migration[8.0]
  def change
    create_table :places do |t|
      t.belong_to :place_types, null: false, foreign_key: true
      t.belong_to :geo_regions, null: false, foreign_key: true

      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
