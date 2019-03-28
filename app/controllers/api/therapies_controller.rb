class Api::TherapiesController < ApiController
  def index
    @therapies = current_user.therapies
  end

  def show
    @therapy = current_therapy
  end

  def create
    @therapy = current_user.therapies.create(therapy_params)
    return render :show if @therapy.save

    render json: error(message: 'Invalid therapy data received', errors: @therapy.errors), status: :unprocessable_entity
  end

  def update
    @therapy = current_therapy
    return render :show if @therapy.update(therapy_params)

    render json: error(message: 'Error while updating therapy', errors: @therapy.errors), status: :unprocessable_entity
  end

  def destroy
    @therapy = current_therapy
    @therapy.destroy
    render :show
  end

  private

  def current_therapy
    current_user.therapies.find(params[:id])
  end

  def therapy_params
    params.permit(:title, :patient_id)
  end
end
