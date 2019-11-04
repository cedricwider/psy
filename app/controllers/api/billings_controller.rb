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

    def query
      @billings = Billing.find_by_status(query_params[:state])
      render :index
    end

    private

    def query_params
      params.permit(:state)
    end
  end
end
