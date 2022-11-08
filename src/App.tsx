import Router from "./utils/router";
import "./App.scss";
import { Provider } from "react-redux";
import { tipStore } from "./stores/TipStore";
function DevTools() {
  if (process.env.REACT_APP_ENV === "development") {
    return (
      <div style={{ position: "absolute", zIndex: 9999 }}>
        <span>develop version</span>
        <button
          onClick={() => {
            if (localStorage.getItem("token")) {
              localStorage.removeItem("token");
            } else {
              localStorage.setItem("token", "123");
            }
            window.location.href = "/";
          }}
        >
          {localStorage.getItem("token") ? "删除token" : "生成token"}
        </button>
      </div>
    );
  }
  return null;
}

function App() {
  return (
    <div className="app">
      <Provider store={tipStore}>
        <Router />
      </Provider>
      <DevTools />
    </div>
  );
}

export default App;
