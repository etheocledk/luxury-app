class ListingPolicy < ApplicationPolicy
  def index?
    @user.present?
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      if @user.admin?
        scope.all
      elsif @user.organization_user?
        scope.joins(:organization).where(organizations: { id: @user.organizations.pluck(:id) })
      else
        scope.none
      end
    end
  end
end
