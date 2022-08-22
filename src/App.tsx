import { getEventsEndpoint } from "./backend";

function App() {

  getEventsEndpoint().then(events => {
    for (const event of events) {
      console.log(event.date);
    }
  });
  return (
    <div>
      Olá!
    </div>
  );
}

export default App;
