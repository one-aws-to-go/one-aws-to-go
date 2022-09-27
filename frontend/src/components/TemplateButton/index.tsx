import { ReactComponent as Clouds } from "./Clouds.svg";

import "./TemplateButton.css";

const TemplateButton: React.FC = () => {
  return (
    <div className="template-select-container">
      <div className="template-select-content">
        <Clouds className="image" />
        <p className="template-text">Template</p>
      </div>
    </div>
  );
};

export default TemplateButton;
