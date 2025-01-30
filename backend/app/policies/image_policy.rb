class ImagePolicy < ApplicationPolicy
  def manage?
    admin? || @user.organizations.include?(@record.organization)
  end

  def create?
    manage?
  end
end
