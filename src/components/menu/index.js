import { html } from "https://esm.sh/htm@3.1.1/preact?external=preact";
import { useState, useMemo } from "preact/hooks";
import Button from "./button";
import "./menu.css";

/**
 *
 * @param {{data: Document, onChange: (e) => void, isOpen: boolean}} props
 */
function Menu({ data, onChange, isOpen }) {
  const modulesXml = useMemo(() => data.getElementsByTagName("Module"), [data]);
  const modules = [];
  for (let i = 0; i < modulesXml.length; i++) {
    modules.push(modulesXml[i]);
  }

  return html`
    <div class="menu ${isOpen ? "menu--opened" : ""}">
      ${modules.map(
        (module) =>
          html`
            <${Button}
              data=${module}
              onClick=${(e, id) => onChange(id)}
            />
          `
      )}
    </div>
  `;
}

export default Menu;
