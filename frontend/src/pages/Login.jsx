
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../services/api"

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)

    try {
      const data = await api.login({ email, password })

      if (data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        navigate("/dashboard")
      } else {
        setMessage(data.message || "Login failed. Please check your details.")
      }
    } catch (error) {
      setMessage(
        error.message || "Unable to login. Please check your connection and try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      {/* Left: Welcome section */}
      <section className="relative hidden overflow-hidden bg-linear-to-br from-[#102d5c] via-blue-700 to-blue-500 px-12 py-12 text-white lg:flex lg:flex-col lg:justify-between xl:px-20">
        <div className="absolute -right-24 top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

        <Link to="/" className="relative flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl font-bold text-blue-700">
            ₹
          </span>
          <span className="text-xl font-extrabold">
            ExpenseTracker
          </span>
        </Link>

        <div className="relative max-w-lg py-12">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
            Your money. Your control.
          </p>
          <h1 className="text-5xl font-extrabold leading-tight xl:text-6xl">
            Make every
            <span className="block text-blue-200">rupee count.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
            Keep track of your income, manage your expenses and build
            better money habits — all in one place.
          </p>

          <div className="mt-10 space-y-4 text-sm text-blue-50">
            <p>✓ Organise your daily transactions</p>
            <p>✓ Keep your monthly budget in check</p>
            <p>✓ Understand your spending patterns</p>
          </div>
        </div>

        <p className="relative text-sm text-blue-100">
          Simple tools for smarter financial habits.
        </p>
      </section>

      {/* Right: Login form */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-10 inline-flex items-center gap-2 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              ₹
            </span>
            <span className="text-lg font-extrabold text-slate-800">
              Expense<span className="text-blue-600">Tracker</span>
            </span>
          </Link>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-10">
            <div className="mb-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-700">
                ↗
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Welcome back
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to continue to your Expense Tracker account.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>

              {message && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In →"}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">NEW HERE?</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            © 2026 Expense Tracker
          </p>
        </div>
      </section>
    </div>
  )
}

export default Login
