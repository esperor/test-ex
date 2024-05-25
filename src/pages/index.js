import { html } from "https://esm.sh/htm@3.1.1/preact?external=preact";
import { useState, useMemo, useEffect } from "preact/hooks";
import Menu from "../components/menu";
import "./index.css";

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

  useEffect(() => {
    const modules = menuData.getElementsByTagName("Module");
    for (let i = 0; i < modules.length; i++) {
      if (modules[i].attributes.Id.value === currentSrcId) {
        setCurrentSrc(modules[i].attributes.URL.value);
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

export default Index;
