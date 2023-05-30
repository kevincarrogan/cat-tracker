import { useEffect, useState } from "react";


const getMessage = (payload) => JSON.parse(payload.data).message;


const App = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const evtSource = new EventSource("http://localhost:3010/sse");
    evtSource.addEventListener("message", (payload) => {
      setMessage(getMessage(payload));
    });
  }, []);
  return <div>{message}</div>
};

export default App;
