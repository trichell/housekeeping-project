
module Api
class SessionsController < ApplicationController

  # POST /api/sessions
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      render json: { message: 'Logged in successfully', token: token }, status: :ok
    else
      render json: { message: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # DELETE /api/sessions
  def destroy
    # Invalidate the session or token here if needed
    head :no_content
  end
end
end 