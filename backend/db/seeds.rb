Dir.glob(File.join(Rails.root, 'db', 'seeds', '*.rb')).each do |filename|
  load(filename)
end
