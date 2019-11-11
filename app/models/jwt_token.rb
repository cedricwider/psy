class JwtToken
  include AuthToken

  def initialize(token)
    @token = token
  end

  def self.from_request(request)
    auth_header = request.env['HTTP_AUTHORIZATION']
    return if auth_header.blank?

    jwt_token = auth_header.split.last.split('=').last # Token token=asdfasudfasdfjasfasfd
    new(jwt_token)
  end

  def user_id
    payload['user_id']
  end

  private

  attr_reader :token

  def payload
    @payload ||= decode(token)
  end
end
