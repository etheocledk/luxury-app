class CreateRoles < ActiveRecord::Migration[8.0]
  def change
    create_table :roles do |t|
      t.string :key
      t.string :title

      t.timestamps
    end
  end
end
