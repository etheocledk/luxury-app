class Image < ApplicationRecord
  belongs_to :organization
  belongs_to :subject, polymorphic: true

  has_one_attached :file

  validates :file, presence: true

  def image_url
    Rails.application.routes.url_helpers.rails_blob_path(file, only_path: true) if file.attached?
  end
end
