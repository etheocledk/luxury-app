# Roles

puts "Started seeding roles"

roles = [
  { id:1, key: "admin", title: "Admin" },
  {  id:2, key: "organization_user", title: "Organization User" }
]

roles.each do |role|
  Role.find_or_create_by(key: role[:key]) do |r|
    r.title = role[:title],
    r.id = role[:id]
  end
end

puts "Finished seeding roles"
