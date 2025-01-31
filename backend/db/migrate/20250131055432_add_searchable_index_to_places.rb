class AddSearchableIndexToPlaces < ActiveRecord::Migration[8.0]
  disable_ddl_transaction!

  def change
    add_index :places, :searchable, using: :gin, algorithm: :concurrently
  end
end
