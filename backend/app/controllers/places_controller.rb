class PlacesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_place, only: [ :show, :update, :destroy ]

  # GET /places
  def index
    places = policy_scope(Place)

    # Inclure les images, geo_region et place_type associés pour chaque place
    places_with_images = places.map do |place|
      place.as_json.merge({
        images: place.images.map { |image| image.image_url },
        geo_region: place.geo_region.as_json(only: [ :id, :title, :key ]),  # Remplace les attributs par ce que tu veux inclure
        place_type: place.place_type.as_json(only: [ :id, :title, :key ])  # Idem ici, ajuste selon tes besoins
      })
    end

    render json: places_with_images
  end

  # GET /places/:id
  def show
    authorize @place

    # Inclure les images, geo_region et place_type pour une place spécifique
    render json: @place.as_json.merge({
      images: @place.images.map { |image| image.image_url },
      geo_region: @place.geo_region.as_json(only: [ :id, :name ]),
      place_type: @place.place_type.as_json(only: [ :id, :title ])
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
