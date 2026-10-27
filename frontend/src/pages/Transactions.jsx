
import { useState } from "react"
import { useTransactions } from "../context/TransactionContext"

const categories = [
  "food",
  "shopping",
  "travel",
  "bills",
  "education",
  "health",
  "entertainment",
  "other",
]

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)

const initialForm = {
  title: "",
  amount: "",
  type: "",
  category: "",
  date: "",
  description: "",
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"

function Transactions() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions()

  const [formData, setFormData] = useState({ ...initialForm })
  const [editId, setEditId] = useState(null)
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState("")
  const [filterCategory, setFilterCategory] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((previous) => ({ ...previous, [name]: value }))
  }

  const clearForm = () => {
    setFormData({ ...initialForm })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !formData.title.trim() ||
      !formData.amount ||
      !formData.type ||
      !formData.category ||
      !formData.date
    ) {
      alert("Please fill all required fields.")
      return
    }

    const amount = Number(formData.amount)

    if (!Number.isFinite(amount) || amount <= 0) {
      alert("Please enter an amount greater than zero.")
      return
    }

    const transactionData = {
      ...formData,
      title: formData.title.trim(),
      amount,
    }

    if (editId !== null) {
      await updateTransaction(editId, transactionData)
      setEditId(null)
    } else {
      await addTransaction(transactionData)
    }

    clearForm()
  }

  const handleEdit = (transaction) => {
    setFormData({
      title: transaction.title || "",
      amount: transaction.amount ?? "",
      type: transaction.type || "",
      category: transaction.category || "",
      date: transaction.date ? transaction.date.slice(0, 10) : "",
      description: transaction.description || "",
    })

    setEditId(transaction._id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    )

    if (!confirmed) return

    await deleteTransaction(id)

    if (editId === id) {
      setEditId(null)
      clearForm()
    }
  }

  const handleCancelEdit = () => {
    setEditId(null)
    clearForm()
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const title = (transaction.title || "").toLowerCase()
    const matchesSearch = title.includes(search.toLowerCase().trim())
    const matchesType =
      !filterType || transaction.type === filterType
    const matchesCategory =
      !filterCategory || transaction.category === filterCategory

    return matchesSearch && matchesType && matchesCategory
  })

  const visibleIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const visibleExpenses = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0)

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Manage Your Money
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Transactions
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Add, search and manage your income and expenses in one place.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Matching Transactions</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {filteredTransactions.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Income in Results</p>
            <p className="mt-2 break-words text-2xl font-bold text-emerald-600">
              {money(visibleIncome)}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Expenses in Results</p>
            <p className="mt-2 break-words text-2xl font-bold text-rose-600">
              {money(visibleExpenses)}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-bold text-blue-700">
              {editId !== null ? "✎" : "+"}
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {editId !== null ? "Edit Transaction" : "Add Transaction"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Fields marked with * are required.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Transaction Title *
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="e.g. Grocery shopping"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Amount (₹) *
                </label>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  min="0.01"
                  step="any"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Transaction Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Date *
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Add a note (optional)"
                  value={formData.description}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                {editId !== null ? "Update Transaction" : "Add Transaction"}
              </button>

              {editId !== null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Search & Filter
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Find transactions by title, type or category.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-medium text-slate-600"
              >
                Search
              </label>
              <input
                id="search"
                type="search"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="filterType"
                className="mb-2 block text-sm font-medium text-slate-600"
              >
                Transaction Type
              </label>
              <select
                id="filterType"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={inputClass}
              >
                <option value="">All types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="filterCategory"
                className="mb-2 block text-sm font-medium text-slate-600"
              >
                Category
              </label>
              <select
                id="filterCategory"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={inputClass}
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredTransactions.length}
              </span>{" "}
              transaction(s)
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("")
                setFilterType("")
                setFilterCategory("")
              }}
              className="rounded-lg border border-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Clear Filters
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:px-7">
            <h2 className="text-xl font-bold text-slate-900">
              Your Transactions
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View and manage your recorded activity.
            </p>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
                ↗
              </div>
              <h3 className="mt-4 font-semibold text-slate-800">
                No transactions found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr className="text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-6 py-4 font-semibold">Transaction</th>
                      <th className="px-6 py-4 font-semibold">Category</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Amount</th>
                      <th className="px-6 py-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction._id}
                        className="transition hover:bg-slate-50/70"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-800">
                            {transaction.title}
                          </div>
                          <div className="mt-1 text-xs capitalize text-slate-500">
                            {transaction.type}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm capitalize text-slate-600">
                          {transaction.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {transaction.date
                            ? transaction.date.slice(0, 10)
                            : "—"}
                        </td>
                        <td
                          className={`whitespace-nowrap px-6 py-4 text-sm font-bold ${
                            transaction.type === "income"
                              ? "text-emerald-600"
                              : "text-rose-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}
                          {money(transaction.amount)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(transaction)}
                              className="rounded-lg border border-blue-100 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(transaction._id)}
                              className="rounded-lg border border-rose-100 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-slate-100 md:hidden">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction._id} className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="break-words font-semibold text-slate-800">
                          {transaction.title}
                        </h3>
                        <p className="mt-1 text-sm capitalize text-slate-500">
                          {transaction.category} ·{" "}
                          {transaction.date
                            ? transaction.date.slice(0, 10)
                            : "No date"}
                        </p>
                        <span
                          className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            transaction.type === "income"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </div>
                      <p
                        className={`shrink-0 text-sm font-bold ${
                          transaction.type === "income"
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {money(transaction.amount)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(transaction)}
                        className="rounded-lg border border-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(transaction._id)}
                        className="rounded-lg border border-rose-100 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default Transactions
