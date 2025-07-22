import { useState, useEffect } from 'react';
import useWebSocket  from 'react-use-websocket';
import MapView from '../component/Map';

// Define a type for the location
interface Location {
  lat: number;
  lng: number;
}
const socketUrl = `${import.meta.env.VITE_WS_URL}:${import.meta.env.VITE_WS_PORT}`;
export default function DriverDashboard() {
  const [location, setLocation] = useState<Location>({ lat: 0, lng: 0 });

  // WebSocket URL and options (you can specify options like automatic reconnection, etc.)
  const { sendMessage} = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log('WebSocket connection opened');
    },
    onClose: () => {
      console.log('WebSocket connection closed');
    },
    onMessage: (message: MessageEvent) => {
      console.log('WebSocket message received:', message.data);
      const data = JSON.parse(message.data);
      setLocation({ lat: data.lat, lng: data.lng });
    },
    // shouldReconnect: (closeEvent: CloseEvent) => true, // Reconnect automatically on disconnect
  });

  // Function to send location at regular intervals (every 2 seconds)
  useEffect(() => {
    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Sending location via WebSocket
          sendMessage(JSON.stringify({ lat: latitude, lng: longitude }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }, 2000);

    // Cleanup the interval when the component is unmounted
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative z-0">
      <h1 className="text-3xl font-bold mb-4 z-10">Driver Dashboard</h1>

      <div className="w-full h-[600px] z-0 relative">
        {location.lat !== 0 && location.lng !== 0 && <MapView lat={location.lat} lng={location.lng} />}
      </div>
    </div>
  );
}


// import { useState, useEffect, useCallback } from "react";
// import MapView from "../component/Map";

// export default function DriverDashboard() {
//   const [location, setlocation] = useState({ lat: 0, lng: 0 });

//   // useEffect(() => {
//   //   navigator.geolocation.getCurrentPosition(
//   //     (position) => {
//   //       const { latitude, longitude } = position.coords;
//   //       console.log(latitude, longitude);
//   //       setlocation({ lat: latitude, lng: longitude });
//   //     },
//   //     (error) => {
//   //       console.error("Error getting location:", error);
//   //     }
//   //   );

//   //   console.log(location);
//   // }, []);

//   useEffect(() => {
//     handleWS();
//   }, []);

//   const handleWS = useCallback(() => {
//     const wss = new WebSocket("ws://localhost:5577");

//     wss.onopen = () => {
//       console.log("WebSocket connection opened");
//       // sending message on 2 second interval
//       setInterval(() => {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             // console.log(latitude, longitude);
//             wss.send(JSON.stringify({ lat: latitude, lng: longitude }));
//           },
//           (error) => {
//             console.error("Error getting location:", error);
//           }
//         );
//       }, 2000);
//     };
//     wss.onmessage = (event) => {
//       console.log("WebSocket message received:", event.data);
//       const data = JSON.parse(event.data);
//       setlocation({ lat: data.lat, lng: data.lng });
//       console.log(data);
//     };
//     wss.onclose = () => {
//       console.log("WebSocket connection closed");
//     };

//     return () => {
//       wss.close();
//     }
//   }, []);

//   // useEffect(() => {
//   //   automaticLocationChange();
//   // }, []);

//   // function automaticLocationChange() {
//   //   setInterval(() => {
//   //     setlocation((prevLocation) => ({
//   //       lat: prevLocation.lat + 0.001, // smaller increments = smoother movement
//   //       lng: prevLocation.lng + 0.001,
//   //     }));
//   //   }, 1000); // updates every second
//   // }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative z-0">
//       <h1 className="text-3xl font-bold mb-4 z-10">Driver Dashboard</h1>

//       <div className="w-full h-[600px] z-0 relative">
//         {location.lat !== 0 && location.lng !== 0 && (
//           <MapView lat={location.lat} lng={location.lng} />
//         )}
//       </div>
//     </div>
//   );
// }
