class CreateListings < ActiveRecord::Migration[8.0]
  def change
    create_table :listings do |t|
      t.belongs_to :organization, null: false, foreign_key: true
      t.belongs_to :place, null: false, foreign_key: true

      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
