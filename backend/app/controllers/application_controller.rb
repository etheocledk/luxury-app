class ApplicationController < ActionController::API
  include Pundit::Authorization

  before_action :authenticate_user, except: [ :create ]

  def pundit_user
    current_user
  end

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def authenticate_user
    render json: { error: "Unauthorized" }, status: :unauthorized unless current_user
  end

  def user_not_authorized
    render json: { error: "You are not authorized to perform this action" }, status: :forbidden
  end
end
