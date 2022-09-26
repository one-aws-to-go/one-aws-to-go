import { useState } from "react";
import StatusIndicator, { EStatus } from "./components/StatusIndicator";
import TemplateButton from "./components/TemplateButton";

const Test = () => {
  const [status, setStatus] = useState<EStatus>(EStatus.running);

  const handleClick = () => {
    setStatus(EStatus.success);
  };

  return (
    <>
      <h1 className={"logo"}>Test</h1>
      <StatusIndicator status={status} />
      <br></br>
      <button onClick={handleClick}>Hae data</button>
      <TemplateButton />
    </>
  );
};

export default Test;
