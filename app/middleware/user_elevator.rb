require 'apartment/elevators/generic'

class UserElevator < Apartment::Elevators::Generic
  DEFAULT_TENANT = 'public'.freeze

  def parse_tenant_name(request)
    token = JwtToken.from_request(request)
    return DEFAULT_TENANT if token.blank?

    tenant_id = User.find(token.user_id)&.tenant
    Rails.logger.debug("Identified tenant id #{tenant_id}")
    tenant_id
  rescue JWT::DecodeError
    Rails.logger.warn("Unable to parse jwt token from request #{request}")
    DEFAULT_TENANT
  end
end
