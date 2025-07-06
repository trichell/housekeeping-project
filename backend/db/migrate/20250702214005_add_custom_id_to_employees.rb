class AddCustomIdToEmployees < ActiveRecord::Migration[7.1]
  def change
    add_column :employees, :custom_id, :string
  end
end
