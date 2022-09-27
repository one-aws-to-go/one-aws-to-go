import StatusIndicator, { EStatus } from "../StatusIndicator";

import "./StatusListItem.css";

const StatusListItem = (props: { status: EStatus; children: string }) => {
  return (
    <div className="list-item-container">
      <div className="list-item-content">
        <StatusIndicator status={props.status} />
        <div className="list-item-text">{props.children}</div>
      </div>
    </div>
  );
};

export default StatusListItem;
