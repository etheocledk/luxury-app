class CreateGeoRegions < ActiveRecord::Migration[8.0]
  def change
    create_table :geo_regions do |t|
      t.belongs_to :geo_state, null: false, foreign_key: true
      t.string :title
      t.string :key

      t.timestamps
    end
  end
end
