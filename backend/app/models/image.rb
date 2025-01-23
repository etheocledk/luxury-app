class Image < ApplicationRecord
  belongs_to :organization
  belongs_to :subject, polymorphic: true
end
