export default function Login() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <p className="text-gray-600 text-lg">Sign in to your account</p>
      </div>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
        <div className="flex justify-between items-center">
          <label className="block text-gray-700">Password</label>
          <a href="/request-password-reset" className="text-blue-600 text-sm hover:underline">
            Forgot Password?
          </a>
        </div>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-700">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};