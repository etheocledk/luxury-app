class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [ :create ]
  respond_to :json

  private

  def respond_with(resource, _options = {})
    if resource.persisted?
      random_organization_id = Organization.order("RANDOM()").pluck(:id).first;
      OrganizationsUser.create(organization_id: random_organization_id, user_id: resource.id);
      render json: {
        status: {
          code: 200,
          message: "Signed up successfully. Confirm your mail.",
          data: {
            id: resource.id,
            email: resource.email,
            role: resource.role,
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

    protected
    def configure_sign_up_params
        devise_parameter_sanitizer.permit(:sign_up, keys: [ :email, :password, :password_confirmation, :role_id ])
    end
end
