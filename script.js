const tickets = {
    "123": 50,
    "456": 75,
    "789": 100
};

function searchTicket() {
    const ticketId = document.getElementById('ticketId').value;
    const resultDiv = document.getElementById('result');
    if (tickets[ticketId]) {
        resultDiv.textContent = Ticket Amount: $${tickets[ticketId]};
    } else {
        resultDiv.textContent = 'Ticket ID not found';
    }
}
