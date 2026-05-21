export interface LrGeocodeResult {
  lat: number;
  lng: number;
  displayName: string;
}

export async function convertAddressToLatLng(address: string): Promise<LrGeocodeResult | null> {
  // Correct subdomain endpoint for JSON API queries
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'OsmLogisticsRouteOpenSourceProject/1.0.0'
      }
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat), // Remember to read the first array element [0]
        lng: parseFloat(data[0].lon), // Nominatim uses 'lon' for longitude
        displayName: data[0].display_name
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching data from OpenStreetMap Nominatim:', error);
    throw error;
  }
}
