import "./index.css"
import { App } from "./App"
import { createRoot } from "react-dom/client"

const root = document.getElementById("root");
const component = (<App></App>);

createRoot(root!).render(component);
