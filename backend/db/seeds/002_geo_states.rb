# Geo States

puts "Started seeding geo states..."

geo_states = [
  { title: "New South Wales", key: "au_nsw", code: "NSW" }
]

geo_states.each do |geo_state|
  GeoState.find_or_create_by(key: geo_state[:key]) do |r|
    r.code = geo_state[:code]
    r.title = geo_state[:title]
  end
end

puts "Finished seeding geo states"
