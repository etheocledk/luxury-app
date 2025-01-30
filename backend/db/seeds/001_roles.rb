# Roles

puts "Started seeding roles"

roles = [
  { key: "admin", title: "Admin" },
  { key: "organization_user", title: "Organization User" }
]

roles.each do |role|
  Role.find_or_create_by(key: role[:key]) do |r|
    r.title = role[:title]
  end
end

puts "Finished seeding roles"
