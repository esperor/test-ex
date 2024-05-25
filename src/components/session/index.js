import { html } from "https://esm.sh/htm@3.1.1/preact?external=preact";
import Dropdown from "./dropdown";
import { useState } from "preact/hooks";

/**
 *
 * @param {{data: Document}}
 * @returns
 */
function Session({ data }) {
  const orgInfo = data.getElementsByTagName("UIOrgInfo")[0];
  const userInfo = data.getElementsByTagName("LoggedUser")[0];
  const [isInfoShown, setIsInfoShown] = useState(false);

  const handleDropdownClick = (option) => {
    switch (option) {
      case "Profile":
        setIsInfoShown(true);
        break;
      case "Logout":
        alert("Logout");
        break;
    }
  };

  return html`
    <div class="session">
      <div class="session__separator" />
      <div class="session__fields-container">
        <h3 class="session__field">Welcome back: ${
          userInfo.attributes.LastName.value
        }, ${userInfo.attributes.FirstName.value}</h3>
        <h3 class="session__field">Organization: ${
          orgInfo.attributes.Name.value
        }</h3>
      </div>
      <${Dropdown} onClick=${handleDropdownClick} />
    </div>

    ${
      isInfoShown &&
      html`<div
        class="session__info-container"
        onClick=${() => setIsInfoShown(false)}
      >
        <div class="session__info">
          <h3 class="session__info__field">
            First name: ${userInfo.attributes.FirstName.value}
          </h3>
          <h3 class="session__info__field">
            Middle name: ${userInfo.attributes.MiddleName.value}
          </h3>
          <h3 class="session__info__field">
            Last name: ${userInfo.attributes.LastName.value}
          </h3>
          <h3 class="session__info__field">
            Login: ${userInfo.attributes.Login.value}
          </h3>
          <h3 class="session__info__field">
            PhoneNumber: ${userInfo.attributes.PhoneNumber.value}
          </h3>
          <h3 class="session__info__field">
            Date of birth: ${userInfo.attributes.DateOfBirth.value}
          </h3>
        </div>
      </div>`
    }
  `;
}

document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
.session {
  margin-left: auto;
  margin-right: 2rem;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  z-index: 11;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1rem;
}

.session__separator {
  height: calc(var(--nav-height) / 3);
  width: 1px;
  margin-right: 2rem;
  background-color: #212121;
}

.session__fields-container {
  display: flex;
  flex-direction: column;
  gap: 0rem;
  align-items: flex-end;
  margin-right: 1rem;
  z-index: 11;
  h3 {
    margin: 0;
  }
  .session__field {
    font-size: 1rem;
    font-weight: 400;
  }
}

.session__info-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  background: transparent;
  z-index: 13;
}

.session__info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  z-index: 11;
  font-size: 1rem;
  width: 20%;
  height: 40%;
  border-radius: 0.25rem;
  z-index: 14;
  background-color: var(--c_bg-secondary);
  box-shadow: 0 0 0.75rem 0.05rem #000;
}

.session__info__field {
  width: 100%;
  text-align: left;
  padding: 0 0;
  margin: 0;
  font-family: "Arial", sans-serif;
  font-weight: 400;
}
</style>`
);

export default Session;
