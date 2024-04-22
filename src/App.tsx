import "./App.scss";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import { useAppSelector } from "./app/hooks";

function App() {
  const user = useAppSelector((state) => state.user);
  console.log(user);

  return (
    <div className="App">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
