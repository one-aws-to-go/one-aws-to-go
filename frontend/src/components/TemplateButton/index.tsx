import { ReactComponent as Clouds } from "./Clouds.svg";

import "./TemplateButton.css";

const TemplateButton = () => {
  return (
    <div className="container" onClick={console.log}>
      <Clouds />
      <strong>Text</strong>
    </div>
  );
};

export default TemplateButton;
