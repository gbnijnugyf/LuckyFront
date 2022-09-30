import Router from "./utils/router";
import "./App.scss";

function DevHeader() {
  if (process.env.REACT_APP_ENV === "development") {
    return (
      <span style={{ position: "absolute", zIndex: 9999 }}>
        develop version
      </span>
    );
  }
  return null;
}

function App() {
  return (
    <div className="app">
      <Router />
      <DevHeader />
    </div>
  );
}

export default App;
