class UserElevator < Apartment::Elevators::Generic
  def parse_tenant_name(request)
    token = JwtToken.from_request(request)
    return if token.blank?

    User.find(token.user_id)&.tenant
  end
end
