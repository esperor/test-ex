import { html } from "https://esm.sh/htm@3.1.1/preact?external=preact";
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

document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
.menu__button {
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #d2d2d2;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 0.3rem 0.05rem #777;
  scale: 1;
  transition: scale 0.2s ease-in-out;
  cursor: pointer;
  border: 0;
  align-items: center;
  &:hover {
    scale: 1.025;
  }
  &:active {
    transition: scale 0.1s ease-in-out;
    scale: 0.975;
  }
}

.menu__button__icon {
  width: 1.5rem;
  height: 1.5rem;
}

.menu__button__label {
  font-size: 1rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #333;
  cursor: pointer;
}
</style>`
);

export default Button;
