class Place < ApplicationRecord
  belongs_to :place_type
  belongs_to :geo_region

  has_many :listings
  has_many :images, as: :subject
end
