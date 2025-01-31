class Place < ApplicationRecord
  include PgSearch::Model

  pg_search_scope :search_places,
                  against: { title: "A", description: "B" },
                  using: { tsearch: { dictionary: "english" } }

  belongs_to :place_type
  belongs_to :geo_region

  has_many :listings
  has_many :images, as: :subject

  def default_image
    image = images.order(sort: :asc).first
    image ? image.image_url : nil
  end
end
