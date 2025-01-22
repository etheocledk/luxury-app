class CreatePlaces < ActiveRecord::Migration[8.0]
  def change
    create_table :places do |t|
      t.belongs_to :place_types, null: false, foreign_key: true
      t.belongs_to :geo_regions, null: false, foreign_key: true

      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
