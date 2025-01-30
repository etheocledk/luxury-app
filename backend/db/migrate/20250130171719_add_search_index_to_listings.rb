class AddSearchIndexToListings < ActiveRecord::Migration[8.0]
  def change
    add_index :listings, [:title, :description], using: :gin
  end
end
