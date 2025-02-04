# Organization seeds

puts "Started seeding organization..."

organizations = [
  { title: "Education" },
  { title: "Healthcare" },
  { title: "Technology" },
  { title: "Finance" },
  { title: "Transportation" }
]

organizations.each do |organization|
  Organization.create(title: organization[:title])
end

puts "Finished seeding organizations"
