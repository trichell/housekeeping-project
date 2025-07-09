module Api
class EmployeesController < ApplicationController
  before_action :set_employee, only: [:show, :update, :destroy]

  # GET /employees
  # GET /employees.json
  def index
    if params[:group].present?
      @employees = Employee.where(group: params[:group])
    else
      @employees = Employee.all
    end
    render json: { message: 'Success', data: @employees.as_json(only: [:id, :custom_id, :name, :gender, :price, :group]) }, status: :ok
  end
    

  # GET /employees/1
  # GET /employees/1.json
  def show
    render json: { message: 'Success', data: @employee.as_json(only: [:id, :custom_id, :name, :gender, :price, :group]) }, status: :ok
  end

  # POST /employees
  # POST /employees.json
  def create
    @employee = Employee.new(employee_params)

    if @employee.save
     render json: { message: 'Created', data: @employee.as_json(only: [:id, :custom_id, :name, :gender, :price, :group]) }, status: :created
    else
      render json: { message: 'Error', errors: @employee.errors}, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /employees/1
  # PATCH/PUT /employees/1.json
  def update
    if @employee.update(employee_params)
      render json: { message: 'Updated', data: @employee.as_json(only: [:id, :custom_id, :name, :gender, :price, :group]) }, status: :ok
    
    else
      render json: { message: 'Error', errors: @employee.errors }, status: :unprocessable_entity
    end
  end

  # DELETE /employees/1
  # DELETE /employees/1.json
  def destroy
    @employee.destroy!
    render json: { message: 'Deleted' }, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_employee
      @employee = Employee.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def employee_params
      params.require(:employee).permit(:name, :gender, :price, :group) 
    end
  end
end