import React, { useEffect, useRef, useState } from 'react';
import { MapPin, ArrowRight, Phone } from 'lucide-react';

// Helper to load Google Maps JS API with Places library
function useGoogleMaps(apiKey) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If already present
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    const key = apiKey;
    const params = new URLSearchParams({
      key,
      libraries: 'places',
      v: 'weekly',
    });
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => setError(new Error('Failed to load Google Maps'));
    script.onload = () => setLoaded(true);

    document.head.appendChild(script);

    return () => {
      // Clean up is optional for single-page load; no-op here
    };
  }, [apiKey]);

  return { loaded, error };
}

export default function Booking() {
  const PUBLIC_FALLBACK_KEY = 'AIzaSyD-EXAMPLE-PUBLIC-KEY-ONLY-FOR-DEMO'; // Replace at build time if env is set
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || PUBLIC_FALLBACK_KEY;
  const { loaded } = useGoogleMaps(apiKey);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const pickupRef = useRef(null);
  const dropRef = useRef(null);
  const [fare, setFare] = useState(null);
  const [distanceText, setDistanceText] = useState('');
  const [durationText, setDurationText] = useState('');

  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const center = { lat: 6.9271, lng: 79.8612 }; // Colombo
    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 12,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#0b0f15' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#e5e7eb' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#0b0f15' }] },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#1f2937' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#0e7490' }],
        },
      ],
      disableDefaultUI: true,
      zoomControl: true,
    });

    const pickupAutocomplete = new window.google.maps.places.Autocomplete(
      pickupRef.current,
      { fields: ['geometry', 'name'] },
    );
    const dropAutocomplete = new window.google.maps.places.Autocomplete(
      dropRef.current,
      { fields: ['geometry', 'name'] },
    );

    const markers = { pickup: null, drop: null };
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: { strokeColor: '#FACC15', strokeWeight: 5 },
    });
    directionsRenderer.setMap(mapInstance.current);

    function setMarker(kind, position) {
      if (markers[kind]) markers[kind].setMap(null);
      markers[kind] = new window.google.maps.Marker({
        position,
        map: mapInstance.current,
        icon:
          kind === 'pickup'
            ? {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#22c55e',
                fillOpacity: 1,
                strokeColor: '#052e16',
                strokeWeight: 2,
              }
            : {
                path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 5,
                fillColor: '#FACC15',
                fillOpacity: 1,
                strokeColor: '#7c2d12',
                strokeWeight: 2,
              },
      });
    }

    function computeFare(km) {
      // Simple estimator: LKR 150 base + 90 per km
      return Math.max(0, 150 + km * 90);
    }

    async function routeIfReady() {
      const p = pickupAutocomplete.getPlace();
      const d = dropAutocomplete.getPlace();
      if (!p?.geometry || !d?.geometry) return;

      const origin = p.geometry.location;
      const destination = d.geometry.location;

      setMarker('pickup', origin);
      setMarker('drop', destination);

      const res = await directionsService.route({
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      directionsRenderer.setDirections(res);

      const leg = res.routes[0].legs[0];
      const km = leg.distance.value / 1000;
      setFare(Math.round(computeFare(km)));
      setDistanceText(leg.distance.text);
      setDurationText(leg.duration.text);

      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(origin);
      bounds.extend(destination);
      mapInstance.current.fitBounds(bounds, 80);
    }

    pickupAutocomplete.addListener('place_changed', routeIfReady);
    dropAutocomplete.addListener('place_changed', routeIfReady);
  }, [loaded]);

  return (
    <section id="booking" className="bg-[#0a0d12] py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Book Your Ride</h2>
          <p className="mt-2 text-white/70">Instant estimates with live Google Maps routing.</p>
          {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
            <p className="mt-3 text-xs text-white/50">
              Using public demo key. For production, set VITE_GOOGLE_MAPS_API_KEY.
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-white/70">Pickup Location</label>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                  <MapPin size={18} className="text-yellow-300" />
                  <input
                    ref={pickupRef}
                    placeholder="Enter pickup..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Drop Location</label>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                  <MapPin size={18} className="text-yellow-300" />
                  <input
                    ref={dropRef}
                    placeholder="Enter destination..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input type="date" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none" />
                <input type="time" className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none" />
              </div>

              <input
                type="tel"
                placeholder="Contact number"
                className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none"
              />

              <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 font-medium text-black transition hover:brightness-95">
                Confirm Booking <ArrowRight size={18} />
              </button>

              {fare && (
                <div className="mt-3 rounded-lg border border-white/10 bg-black/30 p-3 text-sm">
                  <div className="flex items-center justify-between"><span>Distance</span><span className="text-white/80">{distanceText}</span></div>
                  <div className="mt-1 flex items-center justify-between"><span>ETA</span><span className="text-white/80">{durationText}</span></div>
                  <div className="mt-1 flex items-center justify-between"><span className="font-medium text-yellow-300">Estimated Fare</span><span className="font-semibold text-yellow-300">LKR {fare.toLocaleString()}</span></div>
                </div>
              )}

              <p className="mt-2 text-xs text-white/50">For urgent bookings call now</p>
              <a href="tel:+94771234567" className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-200">
                <Phone size={16} /> +94 77 123 4567
              </a>
            </div>
          </div>

          <div className="h-[420px] overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <div ref={mapRef} className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
