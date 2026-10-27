import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../services/api"

const TransactionContext = createContext()

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([])

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      setTransactions([])
      return
    }

    const data = await api.getTransactions(token)

    if (data.transactions) {
      setTransactions(data.transactions)
    } else {
      setTransactions([])
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  const addTransaction = async (transactionData) => {
    const token = localStorage.getItem("token")

    if (!token) return

    const data = await api.addTransaction(
      transactionData,
      token
    )

    if (data.transaction) {
      setTransactions((prev) => [
        data.transaction,
        ...prev,
      ])
    }
  }

  const updateTransaction = async (
    id,
    transactionData
  ) => {
    const token = localStorage.getItem("token")

    if (!token) return

    const data = await api.updateTransaction(
      id,
      transactionData,
      token
    )

    if (data.transaction) {
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction._id === id
            ? data.transaction
            : transaction
        )
      )
    }
  }

  const deleteTransaction = async (id) => {
    const token = localStorage.getItem("token")

    if (!token) return

    const data = await api.deleteTransaction(
      id,
      token
    )

    if (
      data.message ===
      "Transaction deleted successfully"
    ) {
      setTransactions((prev) =>
        prev.filter(
          (transaction) => transaction._id !== id
        )
      )
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export const useTransactions = () =>
  useContext(TransactionContext)