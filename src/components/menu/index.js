import { html } from "https://esm.sh/htm@3.1.1/preact?external=preact";
import {  useMemo } from "preact/hooks";
import Button from "./button";

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
            <${Button} data=${module} onClick=${(e, id) => onChange(id)} />
          `
      )}
    </div>
  `;
}

document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
  .menu {
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(var(--menu-width) * -1); 
    width: var(--menu-width);
    padding-top: calc(var(--nav-height) + 2rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 8;
    background-color: var(--c_bg-secondary);
    transition: left 0.3s ease-in-out;
    &.menu--opened {
      left: 0;
    }
  }
</style>`
);

export default Menu;