json.href api_therapy_url(therapy, format: :json)
json.extract! therapy, :id, :title, :created_at, :updated_at, :active
json.patients therapy.patients do |patient|
  json.id patient.id
  json.href api_patient_url(patient, format: :json)
end
