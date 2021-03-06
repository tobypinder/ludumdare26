# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20130428235342) do

  create_table "enemies", force: true do |t|
    t.string   "name",          default: "Missingno", null: false
    t.integer  "HP",            default: 1000,        null: false
    t.integer  "attack",        default: 100,         null: false
    t.integer  "defence",       default: 100,         null: false
    t.integer  "position_id",   default: 1000,        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "loot_level",    default: 1,           null: false
    t.integer  "game_rules_id", default: 1,           null: false
  end

  create_table "game_rules", force: true do |t|
    t.integer "lastTick",   default: 0,  null: false
    t.integer "totalTicks", default: 0,  null: false
    t.integer "tickRate",   default: 60, null: false
    t.integer "now",        default: 0,  null: false
  end

  create_table "positions", force: true do |t|
    t.integer "x", null: false
    t.integer "y", null: false
  end

  create_table "queued_items", force: true do |t|
    t.integer  "user_id",                     null: false
    t.string   "action",     default: "wait", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "position_id"
    t.string   "username",               default: "",    null: false
    t.integer  "HP",                     default: 1000,  null: false
    t.integer  "maxHP",                  default: 1500,  null: false
    t.integer  "maxQP",                  default: 10,    null: false
    t.integer  "regenHP",                default: 15,    null: false
    t.integer  "attack",                 default: 500,   null: false
    t.integer  "defence",                default: 200,   null: false
    t.integer  "exp",                    default: 0,     null: false
    t.boolean  "dying",                  default: false, null: false
    t.integer  "game_rules_id",          default: 1,     null: false
  end

  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["username"], name: "index_users_on_username", unique: true

end
