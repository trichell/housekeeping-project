class ChangeCustomIdNullableOnEmployees < ActiveRecord::Migration[7.1]
  def change
    change_column_null :employees, :custom_id, true
  end
end
