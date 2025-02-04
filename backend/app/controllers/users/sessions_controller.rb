# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, options = {})
    if resource.persisted?
      render json: {
        status: {
          code: 200,
          message: "Signed up successfully.",
          data: current_user.as_json.merge(token: current_token, organizations: current_user.organizations)
        }
      }, status: :ok
    end
  end

  def respond_to_on_destroy
    jwt_payload = JWT.decode(request.headers["Authorization"].split(" ")[1], Rails.application.credentials.fetch(:secret_key_base)).first
    current_user = User.find(jwt_payload["sub"])
    if current_user
      render json: {
        status: 200,
        message: "Signed out successfully."
      }, status: :ok
    else
        render json: {
          status: 401,
          message: "User has no active session."
        }, status: :unauthorized
    end
  end

  def current_token
    request.env["warden-jwt_auth.token"]
  end
end
