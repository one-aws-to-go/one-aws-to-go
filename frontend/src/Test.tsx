import StatusIndicator, { EStatus } from "./components/StatusIndicator";

import NavBar from "./components/NavBar";
import StatusListItem from "./components/StatusListItem";
import TemplateButton from "./components/TemplateButton";
import { useState } from "react";

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
      <button
        className="bg-primary rounded-md align-middle m-2 p-2"
        onClick={handleClick}
      >
        Hae data
      </button>
      <div className="m-4 outline-dashed w-max">
        <TemplateButton>Very Long Template Name</TemplateButton>
      </div>
      <br></br>
      <NavBar />
      <br></br>
      <StatusListItem status={status}>
        {`Deploy status: ${statusText}`}
      </StatusListItem>
    </>
  );
};

export default Test;
