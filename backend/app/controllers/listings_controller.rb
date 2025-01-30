class ListingsController < ApplicationController
  before_action :authenticate_user
  def index
    @listings = policy_scope(Listing)
    authorize @listings
  end
end
