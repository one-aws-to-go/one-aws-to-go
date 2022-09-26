import { ReactComponent as Failed } from "./StateFailed.svg";
import { ReactComponent as Running } from "./StateRunning.svg";
import { ReactComponent as Success } from "./StateSuccess.svg";

export enum EStatus {
  running,
  success,
  failed,
}

export interface IStatusProps {
  status: EStatus;
}

const StatusIndicator = (props: IStatusProps) => {
  switch (props.status) {
    case EStatus.failed:
      return <Failed />;

    case EStatus.running:
      return <Running />;

    case EStatus.success:
      return <Success />;

    default:
      return <></>;
  }
};

export default StatusIndicator;
