import { useState } from "react";
import StatusIndicator, { EStatus } from "./components/StatusIndicator";
import StatusListItem from "./components/StatusListItem";
import TemplateButton from "./components/TemplateButton";
import Menu from "./components/Menu";

const Test = () => {
  const [status, setStatus] = useState<EStatus>(EStatus.running);
  const [statusText, setStatusText] = useState<string>("Pending");

  const handleClick = () => {
    setStatus(EStatus.success);
    setStatusText("Ready");
  };

  return (
    <>
      <h1 className={"text-3xl font-bold underline"}>Test</h1>
      <StatusIndicator status={status} />
      <br></br>
      <button onClick={handleClick}>Hae data</button>
      <TemplateButton />
      <br></br>
      <Menu />
      <br></br>
      <StatusListItem status={status}>
        {`Deploy status: ${statusText}`}
      </StatusListItem>
    </>
  );
};

export default Test;
