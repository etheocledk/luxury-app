class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _options = {})
    if resource.persisted?
      render json: {
        status: {
          code: 200,
          message: "Signed up successfully.",
          data: {
            id: resource.id,
            email: resource.email,
            created_at: resource.created_at,
            updated_at: resource.updated_at
          }
        }
      }, status: :ok
    else
      render json: {
        status: {
          code: 422,
          message: "User could not be created successfully.",
          errors: resource.errors.full_messages
        }
      }, status: :unprocessable_entity
    end
  end
end
