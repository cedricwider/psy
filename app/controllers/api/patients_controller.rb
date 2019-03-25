class Api::PatientsController < ApiController
  def index
    @patients = current_user.patients
  end

  def show
    @patient = current_patient
  end

  def create
    @patient = current_user.patients.create(patient_params)
    return render :show if @patient.save

    render json: error(message: 'Invalid patient data received', errors: @patient.errors), status: :unprocessable_entity
  end

  def update
    @patient = current_patient
    return render :show if @patient.update(patient_params)

    render json: error(message: 'Error while updating patient', errors: @patient.errors), status: :unprocessable_entity
  end

  def destroy
    @patient = current_patient
    @patient.destroy
    render :show
  end

  private

  ADDRESS_PARAMS = [:id, :street, :house_number, :zip, :town, :country, :main_address].freeze

  def current_patient
    current_user.patients.find(params[:id])
  end

  def patient_params
    params
      .tap { |p| p[:addresses_attributes] = p[:addresses] }
      .permit(
        :first_name,
        :last_name,
        :salutation,
        :sex,
        addresses_attributes: ADDRESS_PARAMS
      )
  end
end
