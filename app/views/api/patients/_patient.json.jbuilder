json.href api_patient_url(patient, format: :json)
json.extract! patient, :id, :salutation, :first_name, :last_name, :sex, :phone, :created_at, :updated_at
json.addresses patient.addresses do |address|
  json.partial! 'api/addresses/address', address: address
end
