const UserInfo = ({ user }) => {
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-base-100 shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          User Information
        </h2>

        <div className="space-y-4">
          <div>
            <label className="label font-semibold">Username:</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={user.username}
              disabled
            />
          </div>

          <div>
            <label className="label font-semibold">Email:</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={user.email}
              disabled
            />
          </div>

          {/* <div>
            <label className="label font-semibold">Password:</label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={user.password}
              disabled
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
