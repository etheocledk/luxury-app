# Geo Regions

puts "Started seeding geo regions..."

nsw_state = GeoState.find_by(key: "au_nsw")

geo_regions = [
  { title: "Byron Bay", key: "byron_bay_au_nsw", geo_state: nsw_state },
  { title: "South Coast", key: "south_coast_au_nsw", geo_state: nsw_state }
]

geo_regions.each do |geo_region|
  GeoRegion.find_or_create_by(key: geo_region[:key]) do |r|
    r.geo_state = geo_region[:geo_state]
    r.title = geo_region[:title]
  end
end

puts "Finished seeding geo regions"
