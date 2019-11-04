module Api
  class BillingsController < ApiController
    def index
      @billings = current_session.billings.includes(:invoices).all
    end

    def show
      @billing = Billing.includes(:invoices).find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: {}, status: :not_found
    end

    def query
      @billings = Billing.includes(:invoices).find_by_status(query_params[:state])
      render :index
    end

    def create
      @billing = current_session.billings.new(JSON.parse(request.body.read))
      @billing.save!
      redirect_to api_billing_path(@billing.id)
    end

    private

    def query_params
      params.permit(:state)
    end

    def current_session
      @current_session ||= Session.find(params[:session_id])
    end
  end
end
