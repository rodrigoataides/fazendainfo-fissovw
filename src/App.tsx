import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Login from "./components/Login";
import { ThemeData } from "./types/ThemeData";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

const defaultData: ThemeData = {
  borderRadius: 10,
  colorPrimary: "#0B0B3B",
};

const App = () => {
  const [data, setData] = useState<ThemeData>(defaultData);
  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        token: {
          colorPrimary: data.colorPrimary,
          borderRadius: data.borderRadius,
        },
      }}
    >
      <Login />
    </ConfigProvider>
  );
};
const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
