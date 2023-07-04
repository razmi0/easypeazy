import { useState } from "react";
import { CountType, Status } from "./model";

interface CountProps {
  counts: CountType[];
  status: Status;
  fetchCount: () => void;
  deleteCount: (count: CountType) => void;
  increment: (count: CountType) => void;
  decrement: (count: CountType) => void;
  saveCount: (count: CountType) => void;
  initEditTitle: (id: number) => void;
}

function Count({
  fetchCount,
  counts,
  status,
  deleteCount,
  increment,
  decrement,
  saveCount,
  initEditTitle,
}: CountProps) {
  console.log("Count component rendered");

  return (
    <>
      <FetchButton fetchCount={fetchCount} status={status} />
      <div className="flexitude">
        {counts &&
          counts.map((count: CountType, idx: number) => {
            return (
              <div key={idx}>
                <div className="card">
                  <div className="card-header">
                    <button onClick={() => increment(count)}>++</button>
                    <CountDisplay count={count} initEditTitle={initEditTitle} />
                    <button onClick={() => decrement(count)}>--</button> <br />
                  </div>
                  <button onClick={() => deleteCount(count)}>Delete</button>
                  <button onClick={() => saveCount(count)}>Save</button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

interface CountDisplayProps {
  count: CountType;
  initEditTitle: (id: number) => void;
}

const CountDisplay = ({ count, initEditTitle }: CountDisplayProps) => {
  const [title, setTitle] = useState(count.title);
  return (
    <div className="counter">
      <span className="counter-title">
        <CountTitle
          count={count}
          title={title}
          setTitle={setTitle}
          initEditTitle={initEditTitle}
        />{" "}
        ( {count.localStatus} )
      </span>
      <span className="counter-content"> {count.count} </span>
    </div>
  );
};

interface CountTitleProps {
  title: string;
  setTitle: (title: string) => void;
  count: CountType;
  initEditTitle: (id: number) => void;
}

const CountTitle = ({
  count,
  initEditTitle,
  title,
  setTitle,
}: CountTitleProps) => {
  const handleOnBlur = (newTitle: string) => {
    setTitle(newTitle);
    count.title = newTitle;
  };

  return (
    <>
      {count.localStatus !== "edit" && (
        <span className="counter-title" onClick={() => initEditTitle(count.id)}>
          {title}
        </span>
      )}
      {count.localStatus === "edit" && (
        <input
          type="text"
          className="counter-title-input"
          placeholder="Enter title"
          value={title}
          onChange={(e) => handleOnBlur(e.target.value)}
        />
      )}
    </>
  );
};

interface FetchButtonProps {
  fetchCount: () => void;
  status: Status;
}

const FetchButton = ({ fetchCount, status }: FetchButtonProps) => {
  return (
    <>
      {status === "loading" && <button disabled>Loading...</button>}
      {status !== "loading" && (
        <button onClick={fetchCount}>Fetch Count</button>
      )}
      {status === "failed" && <div>Error fetching count</div>}
    </>
  );
};

export default Count;
