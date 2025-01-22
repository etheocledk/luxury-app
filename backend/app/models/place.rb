class Place < ApplicationRecord
  belong_to :place_type
  belong_to :geo_region

  has_many :listings
  has_many :images, as: :subject
end
