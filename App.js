import { render } from "preact";
import { html } from "https://esm.sh/htm@3.1.1/preact?external=preact";
import Index from "./src/pages";

function App() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/assets/data.xml", false);
  xhttp.send();
  const data = xhttp.responseXML;

  return html` <${Index} data=${data} /> `;
}

document.head.insertAdjacentHTML(
  "beforeend",
  `<style>

  :root {
    --nav-height: 5rem;
    --menu-width: 20vw;
    --c_bg-secondary: #DDD;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
    height: 100vh;
    overflow: hidden;
  }
  
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 0;
  }
  
  .page {
    margin: 0;
    padding: 0;
    height: 100%;
  }
</style>`
);

render(html`<${App} />`, document.body);

export default App;
