
import { useState } from "react"
import { useTransactions } from "../context/TransactionContext"
import { useBudget } from "../context/BudgetContext"

function Dashboard() {
  const { transactions } = useTransactions()
  const { budget, updateBudget } = useBudget()
  const [budgetInput, setBudgetInput] = useState("")
  const [budgetMessage, setBudgetMessage] = useState("")

  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(value) || 0)

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0)

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0)

  const balance = totalIncome - totalExpense

  // Local calendar month, avoiding UTC month-boundary issues
  const now = new Date()
  const currentMonth =
    `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

  const monthlyTransactions = transactions.filter((t) => {
    if (!t.date) return false
    const date = String(t.date).slice(0, 10)
    return date.slice(0, 7) === currentMonth
  })

  const monthlyIncome = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0)

  const monthlyExpense = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0)

  const monthlyBalance = monthlyIncome - monthlyExpense
  const numericBudget = Number(budget) || 0
  const remainingBudget = numericBudget - monthlyExpense
  const progress =
    numericBudget > 0
      ? Math.min((monthlyExpense / numericBudget) * 100, 100)
      : 0

  const budgetStatus =
    numericBudget <= 0
      ? "Set a budget to track your spending."
      : monthlyExpense >= numericBudget
        ? "You have reached or exceeded your budget."
        : monthlyExpense >= numericBudget * 0.8
          ? "You are getting close to your budget limit."
          : "You're on track with your budget."

  const handleBudgetSave = async () => {
    if (budgetInput.trim() === "") {
      setBudgetMessage("Please enter a monthly budget.")
      return
    }

    const amount = Number(budgetInput)

    if (!Number.isFinite(amount) || amount <= 0) {
      setBudgetMessage("Enter an amount greater than zero.")
      return
    }

    try {
      await updateBudget(amount)
      setBudgetInput("")
      setBudgetMessage("Budget updated successfully.")
    } catch {
      setBudgetMessage("Could not update the budget. Please try again.")
    }
  }

  const categoryExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((result, t) => {
      const category = t.category || "Other"
      result[category] = (result[category] || 0) + Number(t.amount || 0)
      return result
    }, {})

  const categoryList = Object.entries(categoryExpenses)
    .sort((a, b) => b[1] - a[1])

  const recentTransactions = [...transactions]
    .sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime()
      const dateB = new Date(b.date || 0).getTime()
      return dateB - dateA
    })
    .slice(0, 5)

  const summaryCards = [
    {
      title: "Total income",
      amount: totalIncome,
      icon: "↗",
      color: "text-emerald-700",
      iconBg: "bg-emerald-50",
      border: "border-emerald-100",
    },
    {
      title: "Total expenses",
      amount: totalExpense,
      icon: "↘",
      color: "text-rose-700",
      iconBg: "bg-rose-50",
      border: "border-rose-100",
    },
    {
      title: "Available balance",
      amount: balance,
      icon: "₹",
      color: balance < 0 ? "text-rose-700" : "text-blue-700",
      iconBg: balance < 0 ? "bg-rose-50" : "bg-blue-50",
      border: balance < 0 ? "border-rose-100" : "border-blue-100",
    },
  ]

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Page heading */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-700">
              Personal finance
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              A clear overview of your income, spending and budget.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-medium text-slate-500">This month</p>
            <p className="mt-1 font-semibold text-slate-800">
              {now.toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </header>

        {/* Overall summary */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {summaryCards.map((card) => (
            <article
              key={card.title}
              className={`rounded-2xl border ${card.border} bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>
                  <p className={`mt-3 wrap-break-word text-2xl font-bold ${card.color} sm:text-3xl`}>
                    {money(card.amount)}
                  </p>
                </div>
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl font-bold ${card.iconBg} ${card.color}`}>
                  {card.icon}
                </span>
              </div>
              <p className="mt-4 text-xs text-slate-400">
                Across your recorded transactions
              </p>
            </article>
          ))}
        </section>

        {/* Monthly overview */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Monthly overview
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your activity for the current month
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Monthly income", monthlyIncome, "text-emerald-700", "bg-emerald-50"],
              ["Monthly expenses", monthlyExpense, "text-rose-700", "bg-rose-50"],
              ["Monthly balance", monthlyBalance, monthlyBalance < 0 ? "text-rose-700" : "text-blue-700", "bg-blue-50"],
            ].map(([label, amount, color, bg]) => (
              <div key={label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">{label}</p>
                <p className={`mt-2 wrap-break-word text-xl font-bold ${color}`}>
                  {money(amount)}
                </p>
                <div className={`mt-4 h-1.5 w-12 rounded-full ${bg}`} />
              </div>
            ))}

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Transactions this month</p>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {monthlyTransactions.length}
              </p>
              <div className="mt-4 h-1.5 w-12 rounded-full bg-blue-100" />
            </div>
          </div>
        </section>

        {/* Budget */}
        <section className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
          <div className="border-b border-blue-50 bg-linear-to-r from-blue-50 to-white p-5 sm:p-6">
            <p className="text-sm font-semibold text-blue-700">PLAN & CONTROL</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Monthly budget
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Set a spending limit and keep track of your progress.
            </p>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="monthly-budget" className="mb-2 block text-sm font-medium text-slate-700">
                  Budget amount (₹)
                </label>
                <input
                  id="monthly-budget"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="e.g. 12000"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  value={budgetInput}
                  onChange={(e) => {
                    setBudgetInput(e.target.value)
                    setBudgetMessage("")
                  }}
                />
              </div>
              <div className="sm:self-end">
                <button
                  onClick={handleBudgetSave}
                  className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 sm:w-auto"
                >
                  Save budget
                </button>
              </div>
            </div>

            {budgetMessage && (
              <p role="status" className="text-sm font-medium text-blue-700">
                {budgetMessage}
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                <p className="text-sm font-medium text-slate-600">Set budget</p>
                <p className="mt-2 break-words text-2xl font-bold text-blue-700">
                  {money(numericBudget)}
                </p>
              </div>
              <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-4">
                <p className="text-sm font-medium text-slate-600">Spent this month</p>
                <p className="mt-2 break-words text-2xl font-bold text-rose-700">
                  {money(monthlyExpense)}
                </p>
              </div>
              <div className={`rounded-xl border p-4 ${remainingBudget < 0 ? "border-rose-100 bg-rose-50/60" : "border-emerald-100 bg-emerald-50/60"}`}>
                <p className="text-sm font-medium text-slate-600">Remaining</p>
                <p className={`mt-2 break-words text-2xl font-bold ${remainingBudget < 0 ? "text-rose-700" : "text-emerald-700"}`}>
                  {money(remainingBudget)}
                </p>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-700">Budget usage</p>
                <p className="text-sm font-bold text-slate-900">
                  {Math.round(progress)}%
                </p>
              </div>
              <div
                className="h-3 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label="Monthly budget used"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    numericBudget > 0 && monthlyExpense >= numericBudget
                      ? "bg-rose-500"
                      : numericBudget > 0 && monthlyExpense >= numericBudget * 0.8
                        ? "bg-amber-400"
                        : "bg-blue-600"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className={`mt-3 text-sm font-medium ${
                numericBudget > 0 && monthlyExpense >= numericBudget
                  ? "text-rose-700"
                  : numericBudget > 0 && monthlyExpense >= numericBudget * 0.8
                    ? "text-amber-700"
                    : "text-emerald-700"
              }`}>
                {budgetStatus}
              </p>
            </div>
          </div>
        </section>

        {/* Category expenses */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Expenses by category
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Categories with the highest recorded spending appear first.
            </p>
          </div>

          {categoryList.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
              <p className="font-medium text-slate-700">No expense data yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Add an expense transaction to see your categories here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {categoryList.map(([category, amount]) => {
                const share = totalExpense > 0
                  ? Math.min((amount / totalExpense) * 100, 100)
                  : 0

                return (
                  <div key={category} className="rounded-xl border border-slate-100 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="font-semibold capitalize text-slate-800">
                        {category}
                      </p>
                      <p className="font-bold text-slate-900">{money(amount)}</p>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${share}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      {Math.round(share)}% of all recorded expenses
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* Recent transactions */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent transactions
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your latest five recorded transactions
              </p>
            </div>
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {recentTransactions.length} shown
            </span>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
              <p className="font-medium text-slate-700">No transactions yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Your transactions will appear here after you add one.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentTransactions.map((transaction, index) => (
                <div
                  key={transaction._id || transaction.id || `${transaction.title}-${transaction.date}-${index}`}
                  className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                      transaction.type === "income"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}>
                      {transaction.type === "income" ? "↗" : "↘"}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-800">
                        {transaction.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        <span className="capitalize">{transaction.category || "Other"}</span>
                        {transaction.date && ` · ${String(transaction.date).slice(0, 10)}`}
                      </p>
                    </div>
                  </div>
                  <p className={`shrink-0 font-bold ${
                    transaction.type === "income"
                      ? "text-emerald-700"
                      : "text-rose-700"
                  }`}>
                    {transaction.type === "income" ? "+" : "−"} {money(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Dashboard
