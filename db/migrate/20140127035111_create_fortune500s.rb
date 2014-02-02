class CreateFortune500s < ActiveRecord::Migration
  def change
    create_table :fortune500s do |t|
      t.string :name
      t.string :symbol
      t.float :revenue_in_billions
      t.float :profit_in_millions
      t.integer :number_of_employees

      t.timestamps
    end
  end
end
