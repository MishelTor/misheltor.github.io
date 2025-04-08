const customers = {
"3689773": { name: "AIC|3689773 ម៉ាក់ ", tickets: 1 },


function searchTickets() {
    const customerId = document.getElementById('customerId').value.trim(); // Sanitize input
    const resultDiv = document.getElementById('result');
    if (customers[customerId]) {
        const customer = customers[customerId];
        resultDiv.textContent = `ឈ្មោះតូប: ${customer.name},ចំនួនសន្លឹកឆ្នោត: ${customer.tickets}`;
    } else {
        resultDiv.textContent = 'លេខតូបIDមិនត្រឹមត្រូវ';
    }
}
