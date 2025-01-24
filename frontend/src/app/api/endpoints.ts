const endpoints = {
    login: () => "/users/sign_in",
    logout: () => "/users/sign_out",
    register: () => "/users",
    confirmation: (token:any) => `/users/confirmation?confirmation_token=${token}`,
    requestPasswordReset: () => "/users/password",
    resetPassword: () => "/users/password",

}

export default endpoints;