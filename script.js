// Customer data
const customers = {
    "C001": { name: "John Doe", tickets: 5 },
    "C002": { name: "Jane Smith", tickets: 10 },
    "C003": { name: "Alice Johnson", tickets: 3 }
};

// Function to search for customer tickets
function searchTickets() {
    const customerId = document.getElementById('customerId').value.trim(); // Sanitize input
    const resultDiv = document.getElementById('result');
    
    if (customers.hasOwnProperty(customerId)) {
        const customer = customers[customerId];
        resultDiv.textContent = `Customer Name: ${customer.name}, Lucky Draw Tickets: ${customer.tickets}`;
    } else {
        resultDiv.textContent = 'Customer ID not found';
    }
}
