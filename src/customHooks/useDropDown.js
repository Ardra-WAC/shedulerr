import { useState } from "react";

const useDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return { isDropdownOpen, toggleDropdown, closeDropdown };
};

export default useDropdown;
