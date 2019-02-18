class ApiController < ApplicationController
  include AuthToken

  before_action :authenticate_user_with_token
  after_action :add_token_header

  attr_accessor :current_user

  protected

  def authenticate_user_with_token
    authenticate_or_request_with_http_token do |token, _|
      payload = decode(token)
      if payload
        valid_until = Time.parse(payload['expiration_date'])
        @current_user = User.find(payload['user_id']) if Time.now < valid_until
      end
    end
  end

  def request_http_token_authentication(_realm, message)
    message ||= 'Please provide a valid token'
    render json: { error: 'Unauthorized', message: message }, status: :unauthorized
  end

  def add_token_header
    return unless current_user.present?

    response.set_header('X-Access-Token', token_for(current_user))
  end

  def error(message:, errors: [])
    { message: message, errors: errors }.to_json
  end
end
