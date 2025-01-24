class CustomDeviseMailer < Devise::Mailer
  def confirmation_instructions(record, token, opts = {})
    opts[:subject] = "Confirmez votre email"
    opts[:redirect_url] = "http://localhost:3000/confirmation?confirmation_token=#{token}"
    super
  end

  def reset_password_instructions(record, token, opts = {})
    opts[:subject] = "Réinitialisation de votre mot de passe"
    opts[:redirect_url] = "http://localhost:3000/reset-password?token=#{token}"
    super
  end
end
