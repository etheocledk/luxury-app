class CreateImages < ActiveRecord::Migration[8.0]
  def change
    create_table :images do |t|
      t.belongs_to :organization, null: false, foreign_key: true
      t.belongs_to :subject, polymorphic: true, null: false

      t.integer :sort

      t.timestamps
    end
  end
end
