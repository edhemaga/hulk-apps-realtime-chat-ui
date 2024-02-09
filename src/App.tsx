import './App.css';

import { Socket } from "socket.io-client";
const socket = Socket.connect('http://localhost:3000');

function App() {
  return (
    <div className="App">
      Chat
    </div>
  );
}

export default App;
