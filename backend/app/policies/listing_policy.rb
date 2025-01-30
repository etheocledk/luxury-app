class ListingPolicy < ApplicationPolicy
  def index?
    @user
  end

  def manage?
    admin? || @user.organizations.include?(@record.organization)
  end

  def new?
    @user
  end

  def create?
    manage?
  end

  def show?
    @user
  end

  def update?
    manage?
  end

  def destroy?
    manage?
  end

  def edit?
    manage?
  end

  def update?
    manage?
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      if @user.admin?
        scope.all
      elsif @user.organization_user?
        scope.where(organization: @user.organization)
      else
        scope.none
      end
    end
  end
end
