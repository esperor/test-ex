import { html } from "https://esm.sh/htm@3.1.1/preact?external=preact";
import "./button.css";

/**
 *
 * @param {{data: Document, onClick: (e, id) => void}}
 * @returns
 */
function Button({ data, onClick }) {
  return html`
    <button
      type="button"
      class="menu__button"
      id=${data.attributes.Id.value}
      onClick=${(e) => onClick(e, data.attributes.Id.value)}
    >
      <img
        src="/assets/icons/${data.attributes.Icon.value}"
        class="menu__button__icon"
      />
      <label for=${data.attributes.Id.value} class="menu__button__label"
        >${data.attributes.Name.value}</label
      >
    </button>
  `;
}

export default Button;
