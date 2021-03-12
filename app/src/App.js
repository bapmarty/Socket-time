import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const ENDPOINT = "https://stime.baptistemrt.fr";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = io(ENDPOINT, { transports: ['websocket']});
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <section style={{textAlign: "center"}} >
      <h1>First time using socket.io</h1>
      <p>It's <time dateTime={response}>{response}</time></p>
    </section>
  );
}

export default App;