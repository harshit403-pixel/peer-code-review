import { createRoot } from "react-dom/client";
import "./index.css"; // Global styles sabse pehle import karo
import App from "./App";

// ── Entry Point ──────────────────────────────────────────────
// React application yahan DOM mein mount hoti hai
// StrictMode — development mein extra warnings dikhata hai, production mein koi effect nahi

createRoot(document.getElementById("root")).render(

    <App />

);