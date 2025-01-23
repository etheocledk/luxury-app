class CreateAddUserToOrganizationsUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :add_user_to_organizations_users do |t|
      add_reference :organizations_users, :user
      t.timestamps
    end
  end
end
