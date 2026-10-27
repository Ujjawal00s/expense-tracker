
import { NavLink, Outlet, useNavigate } from "react-router-dom"

const DashboardLayout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: "▦" },
    { to: "/transactions", label: "Transactions", icon: "⇄" },
    { to: "/reports", label: "Reports", icon: "▥" },
    { to: "/profile", label: "Profile", icon: "♙" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      {/* Sidebar */}
      <aside className="flex w-full flex-col bg-[#102d5c] text-white md:fixed md:inset-y-0 md:left-0 md:w-64">
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-xl font-bold">
            ₹
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">
              ExpenseTracker
            </h1>
            <p className="text-xs text-blue-200">Manage your money</p>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto p-4 md:flex-col md:gap-2 md:p-5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-950/20"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span className="w-5 text-center text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-blue-100 transition hover:bg-red-500/15 hover:text-red-200"
          >
            <span className="w-5 text-center">↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="min-w-0 flex-1 p-4 sm:p-6 md:ml-64 md:p-8">
        <header className="mb-6 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
              Personal Finance
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-800">
              Expense Tracker
            </h2>
          </div>
          <div className="rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
            My Dashboard
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
