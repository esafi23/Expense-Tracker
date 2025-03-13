document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const amountInput = document.getElementById("amount");
    const descriptionInput = document.getElementById("description");
    const categoryInput = document.getElementById("category");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    function updateTotal() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    function saveToLocalStorage() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach((expense, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${expense.category}: ${expense.amount}€ - ${expense.description} 
                <button class="delete-btn" data-index="${index}">X</button>`;
            expenseList.appendChild(li);
        });
        updateTotal();
    }

    expenseForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const amount = parseFloat(amountInput.value);
        const description = descriptionInput.value.trim();
        const category = categoryInput.value;

        if (isNaN(amount) || amount <= 0 || description === "") {
            alert("Please enter a valid amount and description.");
            return;
        }

        expenses.push({ amount, description, category });
        saveToLocalStorage();
        renderExpenses();
        expenseForm.reset();
    });

    expenseList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.dataset.index;
            expenses.splice(index, 1);
            saveToLocalStorage();
            renderExpenses();
        }
    });

    renderExpenses();
});
