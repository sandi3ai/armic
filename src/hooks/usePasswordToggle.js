import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const usePasswordToggle = () => {
  const [visible, setVisibility] = useState(false);
  const Icon = visible ? (
    <FaRegEyeSlash onClick={() => setVisibility(false)} />
  ) : (
    <FaRegEye onClick={() => setVisibility(true)} />
  );
  const InputType = visible ? "text" : "password";

  return [Icon, InputType];
};

export default usePasswordToggle;

//dodaj še v VnosZaposlenega.js, Login.js ... + the other app
