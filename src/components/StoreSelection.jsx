import React, { useState, useEffect } from "react";

const StoreSelection = ({ onStoreSelect }) => {
  const [map, setMap] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    // Load the Google Maps API script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
    script.onload = () => initializeMap();
    document.body.appendChild(script);
  }, []);

  const initializeMap = () => {
    const mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 10,
    };
    const map = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );
    setMap(map);

    // Add click event listener to the map
    map.addListener("click", (event) => {
      setSelectedStore({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    });
  };

  const handleStoreSelect = () => {
    // Pass the selected store to the parent component
    if (selectedStore) {
      onStoreSelect(selectedStore);
    } else {
      alert("Please select a store before proceeding.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div
        id="map"
        className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] mb-4"
      ></div>
      <button
        onClick={handleStoreSelect}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Select Store
      </button>
    </div>
  );
};

export default StoreSelection;
