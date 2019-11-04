json.href api_billing_url(billing, format: :json)
json.extract! billing, :id, :title, :status
json.session do
  json.id billing.session.id
  json.href api_session_url(billing.session, format: :json)
end
