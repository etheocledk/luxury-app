class Listing < ApplicationRecord
  include PgSearch::Model

  pg_search_scope :search_listings,
                  against: { title: "A", description: "B" },
                  using: { tsearch: { dictionary: "english" } }

  belongs_to :organization
  belongs_to :place

  has_many :images, as: :subject

  def default_image
    image = images.order(sort: :asc).first
    image ? image.image_url : nil
  end
end
