json.href api_address_url(address, format: :json)
json.extract! address, :id, :street, :house_number, :zip, :town, :country, :main_address, :created_at, :updated_at
