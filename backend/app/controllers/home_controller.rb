class HomeController < ApplicationController
  def index
    listings = Listing.all

    listings = listings.order(updated_at: :desc)

    listings = listings.limit(6)

    listings_with_images = listings.map do |listing|
      listing.as_json.merge({
        organization: listing.organization.as_json(only: [ :id, :title ]),
        place: listing.place.as_json(only: [ :id, :title, :description ]),
        default_image_url: listing.default_image&.image_url
      })
    end

    render json: listings_with_images
  end

  def search
    query = params[:query]

    listings = Listing.search_listings(query)

    places = Place.search_places(query)

    results = listings + places

    results_with_images = results.map do |result|
      if result.is_a?(Listing)
        result.as_json.merge({
          organization: listing.organization.as_json(only: [ :id, :title ]),
          place: listing.place.as_json(only: [ :id, :title, :description ]),
          default_image_url: result.default_image&.image_url
        })
      elsif result.is_a?(Place)
        result.as_json.merge({
          geo_region: place.geo_region.as_json(only: [ :id, :title, :key ]),
          place_type: place.place_type.as_json(only: [ :id, :title, :key ]),
          default_image_url: result.default_image&.image_url
        })
      end
    end
    render json: results_with_images
  end

  def geo_regions
    geo_regions = GeoRegion.all
    render json: geo_regions
  end

  def place_types
    place_types = PlaceType.all
    render json: place_types
  end
end
