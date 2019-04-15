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
    patients = therapy_params[:patients]
               .map { |patient_params| patient_params[:id] }
               .map { |id| Patient.find(id) }
    return render :show if @therapy.update(title: therapy_params[:title], patients: patients)

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
    params.permit(:title, patients: [:id])
  end
end
