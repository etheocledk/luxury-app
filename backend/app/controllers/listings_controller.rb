class ListingsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_listing, only: [ :show, :update, :destroy ]

  # GET /listings
  def index
    listings = policy_scope(Listing)

    # Inclure la première image de chaque listing
    listings_with_images = listings.map do |listing|
      listing.as_json.merge({
        default_image_url: listing.default_image&.image_url # Retourner l'image par défaut (première image)
      })
    end

    render json: listings_with_images
  end

  # GET /listings/:id
  def show
    authorize @listing

    # Inclure toutes les images triées par 'sort' et la première image (par défaut)
    render json: @listing.as_json.merge({
      default_image_url: @listing.default_image&.image_url,
      images: @listing.images.order(sort: :asc).map { |image| image.image_url } # Retourner toutes les images associées
    })
  end

  # POST /listings
  def create
    @listing = Listing.new(listing_params)
    @listing.organization_id = current_user.organization.id if current_user.organization

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

  # Set the listing for show, update, and destroy actions
  def set_listing
    @listing = Listing.find(params[:id])
  end

  # Only allow a list of trusted parameters through
  def listing_params
    params.require(:listing).permit(:title, :description, :place_id, :organization_id)
  end
end
