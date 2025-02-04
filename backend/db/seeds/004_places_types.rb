# Place types

puts "Started seeding place types..."


place_types = [
  { title: "Accommodation", key: "accommodation" },
  { title: "Beach", key: "beach" },
  { title: "Town", key: "town" }
]


place_types.each do |place_type|
  PlaceType.find_or_create_by(key: place_type[:key]) do |r|
    r.title = place_type[:title]
  end
end

puts "Finished seeding place types"
