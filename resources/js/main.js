document.addEventListener("DOMContentLoaded", function () {
    // Get the theme switcher and body elements
    const themeSwitcher = document.getElementById("theme-switcher");
    const body = document.body;

    function toggle_style() {
        if (themeSwitcher.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'true');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'false');
        }
    }

    // Apply the user's last theme preference
    (function applyUserThemePreference() {
        const isDarkMode = localStorage.getItem('dark-mode') === 'true';
        themeSwitcher.checked = isDarkMode;
        body.classList.toggle('dark-mode', isDarkMode);
    })();



    // Function to update the banner with the sale message or hide it if there's no active sale
    function updateSaleBanner(data) {
        const banner = document.getElementById('sales-banner');
        if (!banner) {
            console.error('Sales banner element not found in the DOM.');
            return;
        }
        if (data.active && data.message) {
            banner.textContent = data.message;
            banner.style.display = 'block';
        } else {
            banner.style.display = 'none';
        }
    }

    // Function to fetch the current sale status and update the banner accordingly
    function fetchSaleDataAndUpdateBanner() {
        fetch('/api/sale')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(updateSaleBanner)
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }


    // Fetch and update the sales banner every second
    setInterval(fetchSaleDataAndUpdateBanner, 1000);

    // Add the event listener to the theme switcher for change instead of click
    themeSwitcher.addEventListener('change', toggle_style);

});
