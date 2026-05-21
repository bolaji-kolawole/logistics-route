# /logistics-route

A high-performance, zero-dependency TypeScript engine designed to estimate real-world logistics shipping and delivery distances using OpenStreetMap coordinates. 

By utilizing a native mathematical implementation of the Haversine formula combined with a standard **33% circuitry markup factor**, this library provides highly reliable road distance approximations instantly—completely eliminating the need for expensive, rate-limited routing matrix APIs.

## 🚀 Key Features

* **Zero Production Dependencies**: Uses native trigonometric calculations to keep your production bundle incredibly lightweight.
* **Smart Circuitry Markup**: Automatically factors in a 33% overhead to convert straight-line calculations into practical, real-world driving kilometers.
* **Built-in Address Resolution**: Out-of-the-box support for geocoding physical street addresses into geographical coordinates via the free, open-source OpenStreetMap Nominatim platform.
* **Fully Type-Safe**: Written completely in modern TypeScript with full ESM support.

## 📦 Installation

Install the library into your project workspace using your preferred package manager:

```bash
npm install /logistics-route
```

## 🛠️ Usage Examples

### 1. Estimate Distance Using Lat/Lng Coordinates
If you already possess the GPS coordinates (Latitude and Longitude) for your fleet dispatch, use the core calculation engine directly:

```typescript
import { calculateLogisticsKm } from '/logistics-route';

// Example: London coordinates to Manchester coordinates
const originLat = 51.5074;
const originLng = -0.1278;
const destLat = 53.4808;
const destLng = -2.2426;

const routeKm = calculateLogisticsKm(originLat, originLng, destLat, destLng);

console.log(`Estimated Driving Distance: ${routeKm} km`); 
// Output will include the 33% real-world road multiplier
```

### 2. Resolve Physical Addresses and Calculate Distance
Pass raw string addresses directly to resolve locations via OpenStreetMap and calculate your logistics metrics in a single async workflow:

```typescript
import { getRouteDistanceBetweenAddresses } from '/logistics-route';

async function processDelivery() {
  const routeData = await getRouteDistanceBetweenAddresses(
    'Paris, France',
    'Lyon, France'
  );

  if (routeData) {
    console.log(`From: ${routeData.originName}`);
    console.log(`To: ${routeData.destName}`);
    console.log(`Billed Logistics Distance: ${routeData.kilometers} km`);
  } else {
    console.log('Failed to resolve route addresses.');
  }
}

processDelivery();
```

## ⚠️ OpenStreetMap Usage Policy Notice

When using address resolution tools, this library communicates directly with the official OpenStreetMap Nominatim API public endpoints. To comply with their absolute fair-use infrastructure policies, ensure your production application follows these constraints:
1. **Rate Limiting**: Limit your software execution wrappers to a maximum volume of **1 geocoding request per second**.
2. **User-Agent Config**: The core library provides a fallback User-Agent header, but caching frequently queried hubs is highly recommended to protect open infrastructure.

##  Local Project Development

To contribute to this open-source project or run local verification checks against the mathematical algorithms, clone the repository and execute these pipelines:

```bash
# Clean install dev dependencies
npm ci

# Execute the native Jest test suite
npm run test

# Compile production targets into the dist folder
npm run build
```

## License

Distributed under the terms of the permissive **MIT License**. For complete visibility on legal software protections and developer usage allowances, review the [LICENSE](./LICENSE) file contained within this repository.