class AddSearchableToPlaces < ActiveRecord::Migration[8.0]
  def up
    execute <<-SQL
      ALTER TABLE places
      ADD COLUMN searchable tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(description,'')), 'B')
      ) STORED;
    SQL
  end

  def down
    remove_column :places, :searchable
  end
end
