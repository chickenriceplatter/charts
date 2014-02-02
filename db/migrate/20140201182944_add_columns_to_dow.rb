class AddColumnsToDow < ActiveRecord::Migration
  def up
    add_column :dows, :primary_color, :string
    add_column :dows, :secondary_color, :string
  end

  def down
    remove_column :dows, :primary_color
    remove_column :dows, :secondary_color
  end
end
