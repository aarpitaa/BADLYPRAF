document.addEventListener('DOMContentLoaded', function() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent page reload
            const row = button.closest('tr');
            const contactId = Number(row.querySelector('.contact-id').textContent); // Get the contact ID

            fetch(`/api/contact`, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: contactId})
            })
                .then(response => {
                    if (response.status === 200 || response.status === 404) {
                        // If successful, the row is removed from the table
                        row.parentElement.removeChild(row);
                    } else if (response.status === 400) {
                        // If 400 is returned, the row is not deleted
                        console.error('Error deleting contact: ', response.status);
                    }
                })
                .catch(error => {
                    console.error('Fetch error: ', error);
                });
        });
    });

    // Function to set the sale via a fetch request
    function setSale() {
        const saleInput = document.getElementById('saleInput');
        const saleMessage = saleInput.value;
        const saleConfirmation = document.getElementById('sale-confirmation');

        if (!saleMessage.trim()) { // Check if the input is not just whitespace
            saleConfirmation.textContent = 'Please fill in the text box';
            return; // Exit the function if no message is provided
        }

        fetch('/api/sale', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({message: saleMessage})
        }).then(response => response.json())
        .then(data => {
            if(data.success) {
                saleConfirmation.textContent = 'Sale set successfully'; // Update the confirmation div
            }
        }).catch(error => console.error('Error:', error));
    }


    // Function to delete the sale via a fetch request
    function deleteSale() {
        fetch('/api/sale', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.json())
        .then(data => {
            if(data.success) {
                
                // If the sale is successfully ended, clear the textbox
                document.getElementById('saleInput').value = '';
                
                document.getElementById('sale-confirmation').textContent = 'Sale ended successfully'; // Update the confirmation div
                
                // Call the function to fetch the current sale status and update the banner immediately
                fetchSaleDataAndUpdateBanner();
            }
        }).catch(error => {
            console.error('Error:', error);
            console.log('An error occurred while attempting to delete contact with ID:', contactId);
        });     
    }


    // Add event listener for the "Set Sale" button
    document.getElementById('set-sale-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        setSale();
    });

    // Add event listener for the "Delete Sale" button
    document.getElementById('del-sale-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        deleteSale();
    });


    // Function to compute the time difference
    function computeTimeDifference(targetDateStr) {
        if (!Date.parse(targetDateStr)) {
            return "Invalid Date";
        }

        const now = new Date();
        const targetDate = new Date(targetDateStr);

        const remainingTime = targetDate - now;
        if (remainingTime < 0) return "PAST";

        const seconds = Math.floor((remainingTime / 1000) % 60);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Function to update "Time Until Date" cells
    function addTimeUntil() {
        document.querySelectorAll('.time-until').forEach((timeUntilCell) => {
            const dateCell = timeUntilCell.closest('tr').querySelector('td:nth-child(3)');
            const targetDateStr = dateCell.textContent;
            if (Date.parse(targetDateStr)) {
                timeUntilCell.textContent = computeTimeDifference(targetDateStr);
            }
        });
    }

    // Run the function immediately and then every second
    addTimeUntil();
    setInterval(addTimeUntil, 1000);
});
