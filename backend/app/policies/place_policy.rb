class PlacePolicy < ApplicationPolicy
  def index?
    @user
  end

  def create?
    @user
  end

  def update?
    @user
  end

  class Scope < ApplicationPolicy::Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.none
      end
    end
  end
end
