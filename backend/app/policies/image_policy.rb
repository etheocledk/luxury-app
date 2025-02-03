class ImagePolicy < ApplicationPolicy
  def manage?
    @user.admin? || @user.organizations.include?(@record.organization)
  end

  def create?
    manage?
  end
end
