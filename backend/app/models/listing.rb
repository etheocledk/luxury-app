class Listing < ApplicationRecord
  include PgSearch::Model

  pg_search_scope :search_by_title_and_description,
                  against: [ :title, :description ],
                  using: {
                    tsearch: { prefix: true }
                  }
  belongs_to :organization
  belongs_to :place

  has_many :images, as: :subject

  def default_image
    image = images.order(sort: :asc).first
    image ? image.image_url : nil
  end
end
