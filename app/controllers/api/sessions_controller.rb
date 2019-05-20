class Api::SessionsController < ApiController
  before_action :require_therapy_id, only: [:create, :update]

  def index
    @sessions = current_user.sessions
  end

  def show
    @session = current_session
  end

  def create
    @session = therapy.sessions.new(session_params)
    return render :show if @session.save

    render json: error(message: 'Invalid session data received', errors: @session.errors), status: :unprocessable_entity
  end

  def update
    @session = current_session
    return render :show if @session.update(session_params)

    render json: error(message: 'Error while updating session', errors: @session.errors), status: :unprocessable_entity
  end

  def destroy
    @session = current_session
    @session.destroy
    render :show
  end

  private

  def require_therapy_id
    params.require(:therapy_id)
  end

  def current_session
    current_user.sessions.find(session_params[:id])
  end

  def therapy
    current_user.therapies.find(session_params[:therapy_id])
  end

  def session_params
    params.permit(:id, :title, :duration_minutes, :price_cents, :therapy_id)
  end
end
