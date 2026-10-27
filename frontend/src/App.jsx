import { BrowserRouter, Routes, Route } from "react-router-dom"

import DashboardLayout from "./layouts/DashboardLayout"
import ProtectedRoute from "./components/ProtectedRoute"

import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Transactions from "./pages/Transactions"
import Reports from "./pages/Reports"
import Profile from "./pages/Profile"
import Login from "./pages/Login"

import { TransactionProvider } from "./context/TransactionContext"
import { BudgetProvider } from "./context/BudgetContext"
import Register from "./pages/Register"

function App() {
  return (
    <BudgetProvider>
      <TransactionProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TransactionProvider>
    </BudgetProvider>
  )
}

export default App