class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  
  mount_uploader :image, ImageUploader

  validates :text, presence: true, unless: :image?
  validates :image, file_size: { maximum: 1.megabytes.to_i }
end
