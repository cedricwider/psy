module AuthToken
  include ActiveSupport::Concern

  def token_for(user)
    ensure_system_setup
    payload = {
      user_id: user.id,
      expiration_date: Time.now + 3.days
    }
    JWT.encode payload, hmac_key, 'HS256'
  end

  def decode(token)
    return if token.blank?

    payload = JWT.decode(token, hmac_key, true, algorithm: 'HS256')
    payload.reduce(&:merge)
  rescue JWT::VerificationError
    nil
  end

  def hmac_key
    Rails.configuration.x.hmac_key
  end

  def ensure_system_setup
    raise "HMAC_KEY not set.\nPlease provide the key as env variable" if hmac_key.blank?
  end
end
