class AddSearchableToListings < ActiveRecord::Migration[8.0]
  def up
    execute <<-SQL
      ALTER TABLE listings
      ADD COLUMN searchable tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description,'')), 'B')
      ) STORED;
    SQL
  end

  def down
    remove_column :listings, :searchable
  end
end
