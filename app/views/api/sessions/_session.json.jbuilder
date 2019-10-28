json.href api_sessions_url(session, format: :json)
json.extract! session, :id, :title, :start_time, :duration_minutes, :price_cents, :created_at, :updated_at
json.therapy do
  json.id session.therapy.id
  json.href api_therapy_url(session.therapy, format: :json)
end
