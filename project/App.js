import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import './App.css';

function App() {
  const position = [51.505, -0.09]; // 初始地图中心位置

  return (
    <div className="App">
      <h1>地图展示示例</h1>
      <MapContainer center={position} zoom={13} style={{ width: '100%', height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A sample marker.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
