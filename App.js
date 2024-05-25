import { render } from "preact";
import { html } from "https://esm.sh/htm@3.1.1/preact?external=preact";
import Index from "./src/pages";
import "./index.css";

function App() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/assets/data.xml", false);
  xhttp.send();
  const data = xhttp.responseXML;

  return html`
    <${Index} data=${data} />
  `;
}

render(html`<${App} />`, document.body);

export default App;
