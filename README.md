
#B03-L2-assignment-week-3

START
    Load HTML Document
    Display Header with "super Sale Up to 40% off" message
    Display Navigation Bar with "Shop" and "Community" links,   logo, and buttons for account, search, and cart
    Display Poster with image and title "Stock photos" along with description and explore button
    Display Input Area with search input and search button
    Display "Initial Section" and "Recommended Section" placeholders
    Display "Favorites List" section placeholder
    Load CSS Stylesheet
    
    WHEN "Search" button clicked
        Retrieve search term from input
        Fetch data from API based on search term and page number
        Display images in "Recommended Section"

    WHEN Image "Add" button clicked
        Add image to "Favorites List"
        Remove image from "Recommended Section"

    WHEN Image "Remove" button clicked in "Favorites List"
        Remove image from "Favorites List"
        Update localStorage to reflect changes

    WHEN Window loads
        Populate "Favorites List" from localStorage
END


