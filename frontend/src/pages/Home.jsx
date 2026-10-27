
import { Link } from "react-router-dom"

function Home() {
  const features = [
    {
      icon: "↗",
      title: "Track Income & Expenses",
      description:
        "Record your daily transactions and understand where your money goes.",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: "▥",
      title: "Reports & Charts",
      description:
        "Get a clear picture of your spending with visual reports.",
      color: "bg-violet-100 text-violet-700",
    },
    {
      icon: "◎",
      title: "Monthly Budget",
      description:
        "Set your monthly budget and keep your spending on track.",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      icon: "⌕",
      title: "Search Transactions",
      description:
        "Quickly find the transactions you need with search and filters.",
      color: "bg-amber-100 text-amber-700",
    },
  ]

  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-800">
      {/* Navbar */}
      <nav className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-200">
              ₹
            </span>
            <span className="text-lg font-extrabold tracking-tight sm:text-xl">
              Expense<span className="text-blue-600">Tracker</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:text-blue-600 sm:px-5"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 sm:px-5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-linear-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Personal finance made simple
            </div>

            <h1 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Make your money
              <span className="block text-blue-600">work smarter.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
              Take control of your finances in one place. Track income,
              manage expenses, set monthly budgets and understand your
              spending with ease.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Create Free Account →
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
              >
                Sign In
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span>✓ Easy transaction tracking</span>
              <span>✓ Monthly budget management</span>
            </div>
          </div>

          {/* Finance preview illustration */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-blue-200/40 blur-3xl" />

            <div className="relative rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xl shadow-blue-900/10 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Financial overview
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                    Your money at a glance
                  </h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
                  ₹
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-linear-to-r from-blue-700 to-blue-500 p-5 text-white">
                <p className="text-sm text-blue-100">Available balance</p>
                <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
                  Manage with clarity
                </p>
                <p className="mt-3 text-sm text-blue-100">
                  Keep your income and expenses organised.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-700">
                      ↑
                    </span>
                    Income
                  </div>
                  <p className="mt-3 font-bold text-slate-800">
                    Track income
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Monitor money received
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 font-bold text-rose-700">
                      ↓
                    </span>
                    Expenses
                  </div>
                  <p className="mt-3 font-bold text-slate-800">
                    Track spending
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Know where money goes
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-800">Monthly overview</p>
                  <span className="text-xs text-slate-400">Illustration</span>
                </div>
                <div className="mt-5 flex h-24 items-end gap-3">
                  {[40, 65, 48, 85, 58, 72, 95, 60, 78, 50, 68, 88].map(
                    (height, index) => (
                      <div
                        key={index}
                        className={`flex-1 rounded-t-md ${
                          index === 6 ? "bg-blue-600" : "bg-blue-100"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
                <p className="mt-3 text-xs text-slate-400">
                  A simple visual preview of spending trends
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Everything in one place
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Simple tools for better money habits
          </h2>
          <p className="mt-4 leading-7 text-slate-500">
            Everything you need to organise your personal finances without
            unnecessary complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-bold ${feature.color}`}
              >
                {feature.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-blue-700 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to organise your finances?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100">
            Start tracking your money and build better financial habits, one
            transaction at a time.
          </p>
          <Link
            to="/register"
            className="mt-7 inline-flex rounded-xl bg-white px-7 py-3.5 font-bold text-blue-700 transition hover:bg-blue-50"
          >
            Get Started Today →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white px-5 py-7 text-center">
        <p className="text-sm text-slate-500">
          © 2026 Expense Tracker. Manage your money with confidence.
        </p>
      </footer>
    </div>
  )
}

export default Home
