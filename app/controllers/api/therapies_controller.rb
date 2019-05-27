class Api::TherapiesController < ApiController
  def index
    @therapies = current_user.therapies
  end

  def show
    @therapy = current_therapy
  end

  def create
    @therapy = current_user.therapies.create(therapy_params.merge(patients: therapy_patients))
    return render :show if @therapy.save

    render json: error(message: 'Invalid therapy data received', errors: @therapy.errors), status: :unprocessable_entity
  end

  def update
    @therapy = current_therapy
    return render :show if @therapy.update(therapy_params.merge(patients: therapy_patients))

    render json: error(message: 'Error while updating therapy', errors: @therapy.errors), status: :unprocessable_entity
  end

  def destroy
    @therapy = current_therapy
    @therapy.update(active: false)
    render :show
  end

  private

  def current_therapy
    current_user.therapies.find(therapy_params[:id])
  end

  def therapy_params
    params.permit(:id, :title, :active, :price_cents, patients: [:id])
  end

  def therapy_patients
    return [] unless therapy_params[:patients]

    therapy_params[:patients]
      .map { |patient| patient[:id] }
      .map { |id| current_user.patients.find(id) }
  end
end
