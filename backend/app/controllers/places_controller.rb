class PlacesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_place, only: [ :show, :update, :destroy ]

  # GET /places
  def index
    places = policy_scope(Place)

    places_with_images = places.map do |place|
      place.as_json.merge({
        default_image_url: place.default_image,
        geo_region: place.geo_region.as_json(only: [ :id, :title, :key ]), 
        place_type: place.place_type.as_json(only: [ :id, :title, :key ])  
      })
    end

    render json: places_with_images
  end

  # GET /places/:id
  def show
    authorize @place

    render json: @place.as_json.merge({
      default_image_url: @place.default_image,
      geo_region: @place.geo_region.as_json(only: [ :id, :name ]),
      place_type: @place.place_type.as_json(only: [ :id, :title ]),
      images: @place.images.order(sort: :asc).map { |image| image.file.attached? ? image.image_url : nil }
    })
  end

  # POST /places
  def create
    @place = Place.new(place_params)
    authorize @place

    if @place.save
      render json: @place, status: :created
    else
      render json: @place.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /places/:id
  def update
    authorize @place

    if @place.update(place_params)
      render json: @place
    else
      render json: @place.errors, status: :unprocessable_entity
    end
  end

  # DELETE /places/:id
  def destroy
    authorize @place
    @place.destroy
    head :no_content
  end

  private

  # Get the place by id
  def set_place
    @place = Place.find(params[:id])
  end

  # Strong params for place
  def place_params
    params.fetch(:place, {}).permit(:description, :geo_region_id, :title, :place_type_id)
  end
end
