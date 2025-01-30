class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  def jwt_payload
    super
  end

  before_create :assign_default_role

  belongs_to :role

  def admin?
    role_key == "admin"
  end

  def organization_user?
    role_key == "organization_user"
  end

  def role_key
    @role_key ||= self.role.key
  end

  has_many :organizations_users
  has_many :organizations, through: :organizations_users

  belongs_to :role

  private

  def assign_default_role
    self.role ||= Role.find_by(key: "organization_user")
  end
end
