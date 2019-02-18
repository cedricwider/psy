class Api::AddressesController < ApiController
  def show
    @address = current_address
  end

  def create
    @address = Address.new(address_params)
    return render :show if @address.save

    render json: error(message: 'Invalid address data received', errors: @address.errors), status: :unprocessable_entity
  end

  def update
    @address = current_address
    return render :show if @address.update(address_params)

    render json: error(message: 'Error while updating address', errors: @address.errors), status: :unprocessable_entity
  end

  def destroy
    @address = current_address
    @address.destroy
    render :show
  end

  private

  def address_params
    params.require(:address).permit(:id, :street, :house_number, :zip, :town, :country, :main_address, :patient_id)
  end

  def current_address
    Address.find(params[:id])
  end
end
