import { jest, describe, it, expect } from '@jest/globals';
import { calculateLogisticsKm, getRouteDistanceBetweenAddresses } from './index.js';
import { calculateHaversineKm } from './haversine.js';

// Mock the geocoder module to avoid real API network calls during automated testing
jest.mock('./geocoder.js', () => ({
  convertAddressToLatLng: jest.fn((address: string) => {
    if (address === 'Paris, France') {
      return Promise.resolve({ lat: 48.8566, lng: 2.3522, displayName: 'Paris, France' });
    }
    if (address === 'Lyon, France') {
      return Promise.resolve({ lat: 45.7640, lng: 4.8357, displayName: 'Lyon, France' });
    }
    return Promise.resolve(null);
  })
}));

describe('Logistics Engine Core Tests', () => {
  
  describe('calculateHaversineKm (Native Math)', () => {
    it('should return 0 when computing distance to the exact same point', () => {
      const distance = calculateHaversineKm(40.7128, -74.0060, 40.7128, -74.0060);
      expect(distance).toBe(0);
    });

    it('should correctly approximate known earth distances (e.g., NY to LA ~3936 km)', () => {
      const nyLat = 40.7128;
      const nyLng = -74.0060;
      const laLat = 34.0522;
      const laLng = -118.2437;
      
      const distance = calculateHaversineKm(nyLat, nyLng, laLat, laLng);
      
      // Verification: Check if within a reasonable mathematical margin of 3936 km
      expect(distance).toBeGreaterThan(3900);
      expect(distance).toBeLessThan(4000);
    });
  });

  describe('calculateLogisticsKm (Haversine + 33%)', () => {
    it('should apply the 33% markup factor correctly', () => {
      const lat1 = 51.5074; // London
      const lng1 = -0.1278;
      const lat2 = 48.8566; // Paris
      const lng2 = 2.3522;

      const baselineStraightLine = calculateHaversineKm(lat1, lng1, lat2, lng2);
      const logisticsDistance = calculateLogisticsKm(lat1, lng1, lat2, lng2);
      
      const expectedCalculation = Math.round((baselineStraightLine * 1.33) * 100) / 100;
      expect(logisticsDistance).toBe(expectedCalculation);
    });
  });

  describe('getRouteDistanceBetweenAddresses (Integration flow)', () => {
    it('should fetch coordinates and return full route details for found addresses', async () => {
      const result = await getRouteDistanceBetweenAddresses('Paris, France', 'Lyon, France');
      
      expect(result).not.toBeNull();
      expect(result?.originName).toBe('Paris, France');
      expect(result?.destName).toBe('Lyon, France');
      expect(result?.kilometers).toBeGreaterThan(0);
    });

    it('should return null smoothly if an address cannot be resolved', async () => {
      const result = await getRouteDistanceBetweenAddresses('Unknown Place Anywhere', 'Lyon, France');
      expect(result).toBeNull();
    });
  });
});
