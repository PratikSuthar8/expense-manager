let balance = parseFloat(localStorage.getItem("balance")) || 0;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const balanceElement = document.getElementById("balance");
const amountInput = document.getElementById("amount");
const expenseInput = document.getElementById("expense");
const expenseDescInput = document.getElementById("expenseDesc");
const expenseList = document.getElementById("expenseList");

function updateBalance() {
  balanceElement.textContent = balance.toFixed(2);
}

function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addFunds() {
  const amount = parseFloat(amountInput.value);
  if (!isNaN(amount) && amount > 0) {
    balance += amount;
    updateBalance();
    amountInput.value = "";
    transactions.push({ type: "income", amount, description: "Funds added", date: new Date().toISOString() });
    saveData();
  } else {
    alert("Please enter a valid amount.");
  }
}

function addExpense() {
  const expense = parseFloat(expenseInput.value);
  const expenseDesc = expenseDescInput.value;
  if (!isNaN(expense) && expense > 0 && expense <= balance) {
    balance -= expense;
    updateBalance();
    expenseInput.value = "";
    expenseDescInput.value = "";
    transactions.push({ type: "expense", amount: expense, description: expenseDesc, date: new Date().toISOString() });
    saveData();
    displayTransactions();
  } else {
    alert("Please enter a valid expense amount or check your balance.");
  }
}

function displayTransactions() {
  expenseList.innerHTML = "";
  transactions.forEach(transaction => {
    const listItem = document.createElement("li");
    const formattedDate = new Date(transaction.date).toLocaleString();
    if (transaction.type === "expense") {
      listItem.textContent = `- $${transaction.amount.toFixed(2)} for ${transaction.description} (${formattedDate})`;
    } else {
      listItem.textContent = `+ $${transaction.amount.toFixed(2)} (${formattedDate}) - ${transaction.description}`;
    }
    expenseList.appendChild(listItem);
  });
}

updateBalance();
displayTransactions();
