class AddFieldsToEmployees < ActiveRecord::Migration[7.1]
  def change
    add_column :employees, :name, :string
    add_column :employees, :gender, :string
    add_column :employees, :price, :string
    add_column :employees, :group, :string
  end
end
