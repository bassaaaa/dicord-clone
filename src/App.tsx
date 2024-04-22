import "./App.scss";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      {/* sidebar */}
      <Sidebar />

      {/* chat */}
      <Chat />
    </div>
  );
}

export default App;
