module Api
  class BillingsController < ApiController
    def index
      @billings = Billing.includes(:invoices).all
    end

    def show
      @billing = Billing.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: {}, status: :not_found
    end
  end
end
