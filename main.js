const expenses = [];
let myChart;
function addExpense() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    if (description && !isNaN(amount) && date) {
        const expense = { description, amount, date };
        expenses.push(expense);
        renderExpenses();
        calculateTotalBill();
        updateChart();
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('date').value = '';
        document.getElementById('app').scrollTop = document.getElementById('app').scrollHeight;
    }
   
}

function renderExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.innerHTML = `
            <span>${expense.description}</span>
            <span>${expense.amount.toFixed(2)}</span>
            <span>${expense.date}</span>
        `;
        expenseList.appendChild(expenseItem);
    });
}

function calculateTotalBill() {
    const totalBillElement = document.getElementById('totalBill');
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    totalBillElement.textContent = `Total Bill: ${totalAmount.toFixed(2)}`;
}

function updateChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const years = [...new Set(expenses.map(expense => new Date(expense.date).getFullYear()))];
    const yearlyExpenses = years.map(year => {
        const expensesForYear = expenses.filter(expense => new Date(expense.date).getFullYear() === year);
        return expensesForYear.reduce((total, expense) => total + expense.amount, 0);
    });

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years.map(year => year.toString()),
            datasets: [{
                label: 'Yearly Expenses',
                data: yearlyExpenses,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

