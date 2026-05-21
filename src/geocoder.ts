export interface LrGeocodeResult {
  lat: number;
  lng: number;
  displayName: string;
}

export async function convertAddressToLatLng(address: string): Promise<LrGeocodeResult | null> {
  const url = `https://openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
  
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
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching data from OpenStreetMap Nominatim:', error);
    throw error;
  }
}
