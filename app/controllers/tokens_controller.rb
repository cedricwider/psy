class TokensController < ApiController
  include AuthToken

  skip_before_action :authenticate_user_with_token
  before_action :set_current_user

  def create
    return render status: :unauthorized, json: auth_error unless current_user&.authenticate(auth_params[:password])

    render json: {
      token: token_for(current_user)
    }
  end

  private

  def set_current_user
    @current_user = User.find_by(email: auth_params[:username])
  end

  def auth_params
    params.permit([:username, :password])
  end

  def auth_error
    { error: 'Unauthorized', message: 'Wrong username/password combination!' }
  end
end
