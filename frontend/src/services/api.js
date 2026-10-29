const API_URL = "https://expense-tracker-backend-s7q3.onrender.com/api"

export const api = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    return response.json()
  },

  login: async (userData) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    return response.json()
  },

  getTransactions: async (token) => {
    const response = await fetch(`${API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.json()
  },

  addTransaction: async (transactionData, token) => {
    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transactionData),
    })

    return response.json()
  },

  updateTransaction: async (id, transactionData, token) => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transactionData),
    })

    return response.json()
  },

  deleteTransaction: async (id, token) => {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.json()
  },
  getBudget: async (token) => {
  const response = await fetch(`${API_URL}/budget`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json()
},

updateBudget: async (amount, token) => {
  const response = await fetch(`${API_URL}/budget`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  })

  return response.json()
},

}