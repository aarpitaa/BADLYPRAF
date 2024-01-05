/**
 * Function to calculate the total price based on item selected and the email provided.
 * Formula: 
 * If email ends with '@umn.edu':
 *     discount = 20% of itemPrice
 * Else:
 *     discount = 0
 * totalAfterDiscount = itemPrice - discount
 * 
 * Returns: Updated values for item price, discount, and total after discount
 */

function calculatePrice() {
    // Prices for each item (provided in the given switch-case)
    let itemPrice;
    const selectedItem = document.getElementById('dropdown').value;
    
    switch (selectedItem) {
        case "UltraHighRise90sJeans":
            itemPrice = 55.99;  // Example price for "Ultra High Rise 90s Straight Leg Jeans"
            break;
        case "CowlNeckSatinDressApricot":
            itemPrice = 79.95;  // Example price for "Cowl Neck Satin Dress (Apricot)"
            break;
        case "OversizedBoyfriendBlazerCharcoal":
            itemPrice = 64.50;  // Example price for "Oversized Boyfriend Blazer (Charcoal)"
            break;
        case "BeltedTrenchCoatCamel":
            itemPrice = 115.00;  // Example price for "Belted Trench Coat (Camel)"
            break;
        case "FloralPrintMaxiDressNavyBlue":
            itemPrice = 89.99;  // Example price for "Floral Print Maxi Dress (Navy Blue)"
            break;
        case "MockNeckRibbedSweaterOlive":
            itemPrice = 48.75;  // Example price for "Mock Neck Ribbed Sweater (Olive)"
            break;
        case "ButtonDownCorduroyShirtBurntOrange":
            itemPrice = 44.90;  // Example price for "Button Down Corduroy Shirt (Burnt Orange)"
            break;
        case "HighWaistedPaperbagTrousersBlack":
            itemPrice = 58.00;  // Example price for "High-Waisted Paperbag Trousers (Black)"
            break;
        case "VeganLeatherBikerJacket":
            itemPrice = 105.50;  // Example price for "Vegan Leather Biker Jacket"
            break;
        case "PleatedMidiSkirtBurgundy":
            itemPrice = 52.30;  // Example price for "Pleated Midi Skirt (Burgundy)"
            break;
        case "ColdShoulderRuffleTopWhite":
            itemPrice = 32.80;  // Example price for "Cold Shoulder Ruffle Top (White)"
            break;
        case "AthleticFitPerformanceTeeGray":
            itemPrice = 24.95;  // Example price for "Athletic Fit Performance Tee (Gray)"
            break;
        case "DistressedDenimJacketLightWash":
            itemPrice = 68.50;  // Example price for "Distressed Denim Jacket (Light Wash)"
            break;
        case "AsymmetricalHemWrapDressCerulean":
            itemPrice = 74.95;  // Example price for "Asymmetrical Hem Wrap Dress (Cerulean)"
            break;
        case "BandeauBikiniSetTropicalPrint":
            itemPrice = 49.99;  // Example price for "Bandeau Bikini Set (Tropical Print)"
            break;
        case "VNeckCashmereSweaterDustyPink":
            itemPrice = 92.00;  // Example price for "V-Neck Cashmere Sweater (Dusty Pink)"
            break;
        case "StripedLinenWideLegPants":
            itemPrice = 56.75;  // Example price for "Striped Linen Wide Leg Pants"
            break;
        case "RuchedBodyconMiniDressRed":
            itemPrice = 49.50;  // Example price for "Ruched Bodycon Mini Dress (Red)"
            break;
        case "EmbroideredBohoPeasantBlouse":
            itemPrice = 39.90;  // Example price for "Embroidered Boho Peasant Blouse"
            break;
        case "HighRiseBootCutDenimDarkWash":
            itemPrice = 59.95;  // Example price for "High Rise Boot Cut Denim (Dark Wash)"
            break;
        case "SheerLaceBodysuitBlack":
            itemPrice = 28.70;  // Example price for "Sheer Lace Bodysuit (Black)"
            break;
        case "BalloonSleeveKnitCardiganTaupe":
            itemPrice = 54.25;  // Example price for "Balloon Sleeve Knit Cardigan (Taupe)"
            break;
        case "SportsBraAbstractPrint":
            itemPrice = 29.95;  // Example price for "Sports Bra (Abstract Print)"
            break;
        case "TailoredSingleBreastedSuitNavy":
            itemPrice = 195.00;  // Example price for "Tailored Single-Breasted Suit (Navy)"
            break;
        case "SmockedWaistPalazzoPantsTeal":
            itemPrice = 57.80;  // Example price for "Smocked Waist Palazzo Pants (Teal)"
            break;
        case "CrochetLaceTrimCamisoleBeige":
            itemPrice = 29.50;  // Example price for "Crochet Lace Trim Camisole (Beige)"
            break;
        case "FauxFurHoodedParkaOliveGreen":
            itemPrice = 135.50;  // Example price for "Faux Fur Hooded Parka (Olive Green)"
            break;
        case "AthleticJoggersSideStripeHeatherGray":
            itemPrice = 46.90;  // Example price for "Athletic Joggers with Side Stripe (Heather Gray)"
            break;
        case "OffTheShoulderRuchedBlouseLilac":
            itemPrice = 38.00;  // Example price for "Off-the-Shoulder Ruched Blouse (Lilac)"
            break;
        case "ZipUpTeddyBearJacketBrown":
            itemPrice = 79.99;  // Example price for "Zip-Up Teddy Bear Jacket (Brown)"
            break;
    }

    // Check for UMN email discount
    const email = document.getElementById('email').value;
    let discountPercentage = email.endsWith('@umn.edu') ? 20 : 0;
    let discount = (discountPercentage / 100) * itemPrice;
    let totalAfterDiscount = itemPrice - discount;

    // Update the placeholders with calculated values
    document.getElementById('itemPrice').innerText = `Item Price: $${itemPrice.toFixed(2)}`;
    document.getElementById('discountApplied').innerText = `Discount Applied: ${discountPercentage}%`;
    document.getElementById('priceEstimate').innerText = `Total After Discount: $${totalAfterDiscount.toFixed(2)}`;
}

// Attach event listeners to the dropdown and email input
document.getElementById('dropdown').addEventListener('change', calculatePrice);
document.getElementById('email').addEventListener('input', calculatePrice);


document.getElementById('form-container').addEventListener('submit', function(e) {
    // The default form submission is not prevented
    // When the form submits, the page will navigate to the response from the server
});
