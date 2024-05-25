import { html } from "https://esm.sh/htm@3.1.1/preact?external=preact";
import { useState } from "preact/hooks";

/**
 * 
 * @param {{onClick: (string) => void}} 
 * @returns 
 */
function Dropdown({ onClick }) {
  const [isOpen, setIsOpen] = useState(false);
  return html`
    <div class="dropdown">
      <img
        src="/assets/icons/user.svg"
        class="dropdown__icon"
        alt="User avatar"
      />
      <button
        type="button"
        title="Open user info dropdown"
        class="dropdown__button"
        onClick=${() => setIsOpen(!isOpen)}
      >
        <img
          src="/assets/icons/chevron-down.svg"
          class="dropdown__button__icon"
        />
      </button>
      ${isOpen &&
      html` <div
          class="dropdown__menu-container"
          onClick=${() => setIsOpen(false)}
        ></div>
        <div class="dropdown__menu">
          <button
            id="menu_btn_profile"
            type="button"
            class="dropdown__menu__button"
            onClick=${() => { setIsOpen(false); onClick("Profile"); }}
          >
            <label for="menu_btn_profile">Profile</label>
          </button>
          <button
            id="menu_btn_logout"
            type="button"
            class="dropdown__menu__button"
            onClick=${() => { setIsOpen(false); onClick("Logout"); }}
          >
            <label for="menu_btn_logout">Logout</label>
          </button>
        </div>`}
    </div>
  `;
}

document.head.insertAdjacentHTML(
  "beforeend",
  `<style>

  .dropdown {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
  }

  .dropdown__icon {
    width: 2.5rem;
    height: 2.5rem;
  }

  .dropdown__button__icon {
    width: 1rem;
    height: 1rem;
    transition: all 0.2s ease-in-out;
    scale: 1;
  }

  .dropdown__button {
    width: fit-content;
    height: fit-content;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    &:hover .dropdown__button__icon {
      scale: 1.2;
    }
    &:active .dropdown__button__icon { 
      transition: all 0.1s ease-in-out;
      scale: 0.8;
    }
  }

  .dropdown__menu-container {
    position: fixed;
    inset: 0;
    background: transparent;
    z-index: 13;
  }
  
  .dropdown__menu {
    position: absolute;
    width: fit-content;
    height: fit-content;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    background-color: var(--c_bg-secondary);
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.5rem;
    box-shadow: 0 0 0.5rem 0.05rem #555;
    z-index: 14;
  }

  .dropdown__menu__button {
    width: 10rem;
    height: fit-content;
    padding: 0.7rem 1rem;
    border: 0;
    background-color: #959595;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: #b3b3b3;
    }
    &:active {
      background-color: #d2d2d2;
    }
    label {
      cursor: pointer;
    }
  }
</style>`
);

export default Dropdown;
