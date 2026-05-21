import { convertAddressToLatLng, LrGeocodeResult } from './geocoder.js';
import { calculateHaversineKm } from './haversine.js';

export { convertAddressToLatLng, LrGeocodeResult, calculateHaversineKm };

/**
 * Calculates straight-line distance using the native Haversine module
 * and scales it by 33% to estimate actual road infrastructure routing.
 */
export function calculateLogisticsKm(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number
): number {
  // Call your native math function
  const straightLineKm = calculateHaversineKm(startLat, startLng, endLat, endLng);
  
  // Apply the 33% logistics circuitry multiplier
  const estimatedRoadKm = straightLineKm * 1.33;
  
  // Round cleanly to 2 decimal points
  return Math.round(estimatedRoadKm * 100) / 100;
}

export async function getRouteDistanceBetweenAddresses(
  origin: string,
  destination: string
): Promise<{ originName: string; destName: string; kilometers: number } | null> {
  const fromPlace = await convertAddressToLatLng(origin);
  const toPlace = await convertAddressToLatLng(destination);

  if (!fromPlace || !toPlace) return null;

  const kilometers = calculateLogisticsKm(fromPlace.lat, fromPlace.lng, toPlace.lat, toPlace.lng);

  return {
    originName: fromPlace.displayName,
    destName: toPlace.displayName,
    kilometers
  };
}
