import { useEffect, useState } from "react"

const Profile = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Profile
        </h1>

        <p className="text-gray-500 mt-1">
          View your account information.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
        {user ? (
          <>
            <div className="mb-5">
              <p className="text-gray-500 text-sm">
                Name
              </p>

              <p className="text-xl font-semibold text-gray-800">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Email
              </p>

              <p className="text-xl font-semibold text-gray-800">
                {user.email}
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-500">
            User information not found.
          </p>
        )}
      </div>
    </div>
  )
}

export default Profile