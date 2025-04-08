const customers = {
    "C001": 5,
    "C002": 10,
    "C003": 3
};

function searchTickets() {
    const customerId = document.getElementById('customerId').value;
    const resultDiv = document.getElementById('result');
    if (customers[customerId]) {
        resultDiv.textContent = `Lucky Draw Tickets: ${customers[customerId]}`;
    } else {
        resultDiv.textContent = 'Customer ID not found';
    }
}
