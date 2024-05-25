import { html } from "https://esm.sh/htm@3.1.1/preact?external=preact";
import { useState, useMemo, useEffect } from "preact/hooks";
import Menu from "../components/menu";
import Session from "../components/session";

function Index({ data }) {
  const xmlApp = useMemo(() => data.getElementsByTagName("App")[0], [data]);
  const menuData = useMemo(
    () => xmlApp.getElementsByTagName("Menu")[0],
    [xmlApp]
  );
  const sessionData = useMemo(
    () => xmlApp.getElementsByTagName("SessionData")[0],
    [xmlApp]
  );
  const [menuOpen, setMenuOpen] = useState(
    menuData.attributes.Visible.value === "1"
  );
  const [currentSrcId, setCurrentSrcId] = useState(
    menuData.attributes.SelectedModuleId.value
  );
  const [currentSrc, setCurrentSrc] = useState(null);
  const [currentName, setCurrentName] = useState(null);

  useEffect(() => {
    const modules = menuData.getElementsByTagName("Module");
    for (let i = 0; i < modules.length; i++) {
      if (modules[i].attributes.Id.value === currentSrcId) {
        setCurrentSrc(modules[i].attributes.URL.value);
        setCurrentName(modules[i].attributes.Name.value);
        break;
      }
    }
  }, [currentSrcId]);

  function onModuleChange(moduleId) {
    setCurrentSrcId(moduleId);
  }

  return html`
    <div class="page page-index">
      <nav>
        <button
          type="button"
          class="menu-button"
          onClick=${() => setMenuOpen(!menuOpen)}
        >
          ${Array.from({ length: 5 }).map(
            (i) => html`<div class="menu-button__line" key=${i}></div>`
          )}
        </button>
        <h3 class="nav__name">${currentName}</h3>
        <${Session} data=${sessionData} />
        <h3 class="nav__brand">MedRex</h3>
      </nav>
      <${Menu} data=${menuData} onChange=${onModuleChange} isOpen=${menuOpen} />
      <div class="content ${menuOpen ? "content--shrinked" : ""}">
        <iframe
          class="content__frame"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          frameborder="0"
          src=${currentSrc}
        />
      </div>
    </div>
  `;
}

document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  height: var(--nav-height);
  background-color: var(--c_bg-secondary);
  align-items: center;
  padding-left: 1%;
  padding-right: 1%;
  z-index: 10;
  justify-content: space-between;
  border: 0;
  border-bottom: 0.125rem solid #AAA;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: inherit;
    z-index: 9;
  }
}

.page-index {
  display: flex;
  justify-content: right;
}

.menu-button__line {
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  height: 2px;
  background-color: #121212;
  transition: all 0.2s ease-in-out;
}

.menu-button {
  width: 4rem;
  height: 3rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  z-index: 11;
  border-radius: 0.25rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    .menu-button__line {
      width: 95%;
    }
  }
  &:active .menu-button__line {
    width: 70%;
    transition: all 0.1s ease-in-out;
  }
}

.content {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: relative;
  width: 100%;
  height: calc(100% - var(--nav-height));
  padding: var(--nav-height) 0 0 0;
  margin: 0;
  transition: all 0.3s ease-in-out;
  &.content--shrinked {
    width: calc(100% - var(--menu-width));
  }
}

.content__frame {
  width: 100%;
  height: 100%;
  border: 0;
  margin: 0;
  padding: 0;
}

.nav__brand {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
  color: #121212;
  z-index: 11;
}

.nav__name {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.3rem;
  font-weight: 500;
  margin-right: autox;
  margin-left: 1rem;
  padding: 0;
  color: #121212;
  z-index: 11;
}
</style>`
);

export default Index;
