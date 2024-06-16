/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Select from "react-select";
import logo from "../assets/images/logo.svg";
import ThemeSwitch from "./ThemeSwitch";

export default function Header({ selectedFont, setSelectedFont }) {
  const handleSelect = (event) => {
    setSelectedFont(event.target.value);
  };

  return (
    <header className="header">
      <img src={logo} alt="logo" />

      <div className="header-content">
        <div className="select-container">
          <select onChange={handleSelect}>
            <option value="sanserif">Sans Serif</option>
            <option value="serif">Serif</option>
            <option value="mono">Mono</option>
          </select>
        </div>

        <ThemeSwitch />
      </div>
    </header>
  );
}
