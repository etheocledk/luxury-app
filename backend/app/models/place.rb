class Place < ApplicationRecord
  belongs_to :place_type
  belongs_to :geo_region

  has_many :listings
  has_many :images, as: :subject

  def default_image
    image = images.order(sort: :asc).first
    image ? image.image_url : nil
  end
end
