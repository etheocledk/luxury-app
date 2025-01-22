class Listing < ApplicationRecord
  belongs_to :organization
  belongs_to :place

  has_many :images, as: :subject
end
