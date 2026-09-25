# Nearby Deals - Static Vercel Site

Files:
- index.html
- offers.json

Deploy both files to Vercel as a static site.

The browser Geolocation API detects the user's location. Distance is calculated locally using the Haversine formula. No location API or database is required.

Important: browser geolocation requires HTTPS in production. Vercel provides HTTPS automatically.

To add offers, edit offers.json and provide latitude, longitude, and a mapUrl for each offer.
