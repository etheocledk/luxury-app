class ListingsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_listing, only: [ :show, :update, :destroy ]

  # GET /listings
  def index
    listings = policy_scope(Listing)

    listings_with_images = listings.map do |listing|
      listing.as_json.merge({
        default_image_url: listing.default_image,
        organization: listing.organization.as_json(only: [ :id, :title ]),
        place: listing.place.as_json(only: [ :id, :title, :description ])
      })
    end

    render json: listings_with_images
  end


  # GET /listings/:id
  def show
    authorize @listing
  
    render json: @listing.as_json.merge({
      default_image_url: @listing.default_image, 
      organization: @listing.organization.as_json(only: [:id, :title]),
      place: @listing.place.as_json(only: [:id, :title]),
      images: @listing.images.order(sort: :asc).map { |image| image.file.attached? ? image.image_url : nil }
    })
  end
  


  # POST /listings
  def create
    @listing = Listing.new(listing_params)

    if current_user.organizations.any? && params[:organization_id].present?
      @listing.organization_id = params[:organization_id]
    elsif current_user.organizations.any?
      @listing.organization_id = current_user.organizations.first.id
    else
      @listing.organization_id = nil
    end

    authorize @listing
    if @listing.save
      render json: @listing, status: :created
    else
      render json: @listing.errors, status: :unprocessable_entity
    end
  end




  # PATCH/PUT /listings/:id
  def update
    authorize @listing

    if @listing.update(listing_params)
      render json: @listing
    else
      render json: @listing.errors, status: :unprocessable_entity
    end
  end

  # DELETE /listings/:id
  def destroy
    authorize @listing
    @listing.destroy
    head :no_content
  end

  private

  def set_listing
    @listing = Listing.find(params[:id])
  end

  def listing_params
    params.require(:listing).permit(:title, :description, :place_id, :organization_id)
  end
end
