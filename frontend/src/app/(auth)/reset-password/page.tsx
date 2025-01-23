export default function ResetPassword() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <p className="text-gray-600 text-md">
          Set your new password below
        </p>
      </div>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter your new password"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Confirm your new password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Reset Password
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-gray-700">
          Remember your password?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
