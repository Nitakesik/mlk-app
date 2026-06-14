let data = JSON.parse(localStorage.getItem("milk")) || [];

function save() {
    localStorage.setItem("milk", JSON.stringify(data));
}

function daysLeft(date) {
    return Math.ceil((new Date(date) - new Date()) / 86400000);
}

function getColor(days) {
    if (days <= 1) return "red";
    if (days <= 3) return "orange";
    return "green";
}

function addItem() {
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;

    if (!name || !date) return;

    data.push({ name, date });
    save();
    render();
}

function deleteItem(i) {
    data.splice(i, 1);
    save();
    render();
}

function render() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    data.sort((a,b)=>daysLeft(a.date)-daysLeft(b.date));

    data.forEach((item, i) => {
        let days = daysLeft(item.date);

        let div = document.createElement("div");
        div.className = "card " + getColor(days);

        div.innerHTML = `
            <b>${item.name}</b><br>
            ${item.date}<br>
            осталось ${days} дней<br>
            <button onclick="deleteItem(${i})">удалить</button>
        `;

        list.appendChild(div);
    });
}

render();
