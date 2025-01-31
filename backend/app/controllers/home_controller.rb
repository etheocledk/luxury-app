class HomeController < ApplicationController
  def index
    listings = Listing.all

    listings = listings.order(updated_at: :desc)

    listings = listings.limit(6)

    listings_with_images = listings.map do |listing|
      listing.as_json.merge({
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
          default_image_url: result.default_image&.image_url
        })
      elsif result.is_a?(Place)
        result.as_json.merge({
          default_image_url: result.default_image&.image_url
        })
      end
    end
    render json: results_with_images
  end
end
