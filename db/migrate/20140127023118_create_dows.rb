class CreateDows < ActiveRecord::Migration
  def change
    create_table :dows do |t|
      t.string :name
      t.string :symbol
      t.string :industry
      t.integer :number_of_employees
      t.float :revenue
      t.float :profit
      t.float :market_cap

      t.timestamps
    end
  end
end
