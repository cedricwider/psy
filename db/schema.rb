# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_11_090938) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "street"
    t.string "house_number"
    t.integer "zip"
    t.string "town"
    t.string "country"
    t.boolean "main_address", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "patient_id"
    t.index ["patient_id"], name: "index_addresses_on_patient_id"
  end

  create_table "billings", force: :cascade do |t|
    t.string "title"
    t.bigint "session_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_id"], name: "index_billings_on_session_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.string "title"
    t.datetime "bill_date"
    t.datetime "pay_date"
    t.string "status"
    t.bigint "billing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["billing_id"], name: "index_invoices_on_billing_id"
  end

  create_table "patients", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "salutation"
    t.string "sex"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "phone"
    t.boolean "active", default: true, null: false
    t.index ["user_id"], name: "index_patients_on_user_id"
  end

  create_table "patients_therapies", id: false, force: :cascade do |t|
    t.bigint "therapy_id", null: false
    t.bigint "patient_id", null: false
    t.index ["patient_id"], name: "index_patients_therapies_on_patient_id"
    t.index ["therapy_id"], name: "index_patients_therapies_on_therapy_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "title"
    t.integer "duration_minutes", default: 0
    t.integer "price_cents"
    t.bigint "therapy_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "start_time"
    t.index ["therapy_id"], name: "index_sessions_on_therapy_id"
  end

  create_table "therapies", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.boolean "active", default: true, null: false
    t.integer "price_cents", default: 18000, null: false
    t.index ["user_id"], name: "index_therapies_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "tenant"
  end

  add_foreign_key "addresses", "patients"
  add_foreign_key "billings", "sessions"
  add_foreign_key "invoices", "billings"
  add_foreign_key "patients", "users"
  add_foreign_key "sessions", "therapies"
  add_foreign_key "therapies", "users"
end
