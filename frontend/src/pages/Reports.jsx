import { useTransactions } from "../context/TransactionContext"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const Reports = () => {
  const { transactions } = useTransactions()

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0)

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0)

  const balance = totalIncome - totalExpense

  // Expense by category
  const categoryTotals = {}

  transactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      const category = transaction.category

      categoryTotals[category] =
        (categoryTotals[category] || 0) + Number(transaction.amount)
    })

  const chartData = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  )

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Reports
        </h1>

        <p className="text-gray-500 mt-1">
          View your income and expense summary.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        {/* Income */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">
            Total Income
          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-2">
            ₹{totalIncome}
          </h2>
        </div>

        {/* Expense */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">
            Total Expense
          </p>

          <h2 className="text-2xl font-bold text-red-600 mt-2">
            ₹{totalExpense}
          </h2>
        </div>

        {/* Balance */}
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500">
            Balance
          </p>

          <h2
            className={`text-2xl font-bold mt-2 ${
              balance >= 0
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            ₹{balance}
          </h2>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Expense by Category
        </h2>

        {chartData.length > 0 ? (
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-gray-500">
            No expense data available for the chart.
          </p>
        )}
      </div>

      {/* Total Transactions */}
      <div className="bg-white p-6 rounded-xl shadow max-w-md">
        <p className="text-gray-500">
          Total Transactions
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-2">
          {transactions.length}
        </h2>
      </div>
    </div>
  )
}

export default Reports