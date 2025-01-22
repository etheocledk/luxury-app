class Organization < ApplicationRecord
  has_many :listings
  has_many :organization_users
end
