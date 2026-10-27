import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../services/api"

const BudgetContext = createContext()

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState(0)

  const fetchBudget = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      setBudget(0)
      return
    }

    const data = await api.getBudget(token)

    if (data.budget) {
      setBudget(Number(data.budget.amount))
    } else {
      setBudget(0)
    }
  }

  useEffect(() => {
    fetchBudget()
  }, [])

  const updateBudget = async (amount) => {
    const token = localStorage.getItem("token")

    if (!token) return

    const data = await api.updateBudget(Number(amount), token)

    if (data.budget) {
      setBudget(Number(data.budget.amount))
    }
  }

  return (
    <BudgetContext.Provider
      value={{
        budget,
        updateBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}

export const useBudget = () => useContext(BudgetContext)