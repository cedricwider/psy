json.href api_therapy_url(therapy, format: :json)
json.extract! therapy, :id, :title, :active, :price_cents, :created_at, :updated_at
json.patients therapy.patients do |patient|
  json.id patient.id
  json.href api_patient_url(patient, format: :json)
end
