import { CountType, Status } from "./model";

interface CountProps {
  counts: CountType[];
  status: Status;
  fetchCount: () => void;
  deleteCount: (count: CountType) => void;
  increment: (count: CountType) => void;
  decrement: (count: CountType) => void;
  saveCount: (count: CountType) => void;
}

function Count({
  fetchCount,
  counts,
  status,
  deleteCount,
  increment,
  decrement,
  saveCount,
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
                    <button onMouseMove={() => increment(count)}>++</button>
                    <CountDisplay
                      title={count.title}
                      count={count.count}
                      id={count.id}
                      localStatus={count.localStatus}
                    />
                    <button onMouseMove={() => decrement(count)}>--</button>{" "}
                    <br />
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

const CountDisplay = ({ title, count, localStatus }: CountType) => {
  return (
    <div className="counter">
      <span className="counter-title">
        {title} ( {localStatus} )
      </span>
      <span className="counter-content"> {count} </span>
    </div>
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
