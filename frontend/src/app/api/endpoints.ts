const endpoints = {
    login: () => "/users/sign_in",
    logout: () => "/users/sign_out",
    register: () => "/users",
    confirmation: (token:any) => `/users/confirmation?confirmation_token=${token}`,
    requestPasswordReset: () => "/users/password",
    resetPassword: () => "/users/password",
    listings: () => "/listings",
    listing: (id:any) => `/listings/${id}`,
    places: () => "/places",
    place: (id:any) => `/places/${id}`,
    geo_regions: () => "/geo_regions",
    place_types: () => "/place_types",
    images: () => "/images",
    search_listings: (query:any) => `/search?query=${query}`,
}

export default endpoints;