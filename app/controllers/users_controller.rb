class UsersController < ApiController
  skip_before_action :authenticate_user_with_token, only_for: :create

  def show; end

  def create
    @user = User.new(user_params)
    return render status: :bad_request, json: error_message(@user) unless @user.valid?

    @user.save
  end

  def update; end

  def delete; end

  private

  def user_params
    params
      .permit([:first_name, :last_name, :email, :password, :password_confirmation])
  end

  def error_message(user)
    {
      message: 'Invalid Request',
      errors: user.errors
    }
  end
end
