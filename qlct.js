let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function formatMoney(number) {
  return number.toLocaleString("vi-VN") + " đ";
}

function render() {
  const list = document.getElementById("transactionList");
  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${t.date}</td>
      <td>${t.category}</td>
      <td>${t.description}</td>
      <td class="${t.type === "income" ? "plus" : "minus"}">
        ${t.type === "income" ? "+" : "-"}${formatMoney(t.amount)}
      </td>
    `;
    list.appendChild(row);
  });

  document.getElementById("income").innerText = formatMoney(income);
  document.getElementById("expense").innerText = formatMoney(expense);
  document.getElementById("balance").innerText = formatMoney(income - expense);

  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!date || !amount) return alert("Vui lòng nhập đủ thông tin");

  transactions.unshift({ date, category, description, amount, type });
  closeModal();
  render();
}

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.querySelectorAll("input").forEach(i => i.value = "");
}

render();