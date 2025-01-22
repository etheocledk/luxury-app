class Organization < ApplicationRecord
  has_many :listings
  has_manay :organization_users
end
