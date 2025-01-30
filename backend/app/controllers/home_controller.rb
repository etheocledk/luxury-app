class HomeController < ApplicationController
  def index
    # Appliquer des filtres de recherche basés sur les paramètres
    listings = Listing.all

    # Filtrage par mot-clé de recherche, si le paramètre 'query' est présent
    if params[:query].present?
      listings = listings.search_by_title_and_description(params[:query])
    end

    # Ajouter d'autres filtres ici si nécessaire, par exemple :
    # Filtrage par catégorie
    # if params[:category].present?
    #   listings = listings.where(category: params[:category])
    # end

    # Trier les listings par date de mise à jour
    listings = listings.order(updated_at: :desc)

    # Limiter les résultats à 6, avec un paramètre de pagination
    listings = listings.limit(6)

    # Inclure l'image par défaut pour chaque listing
    listings_with_images = listings.map do |listing|
      listing.as_json.merge({
        default_image_url: listing.default_image&.image_url # Retourne l'image par défaut
      })
    end

    # Retourner la réponse JSON
    render json: listings_with_images
  end
end
