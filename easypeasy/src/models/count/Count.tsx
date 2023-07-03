import { CountType, Status } from "./model";

interface CountProps {
  fetchCount: () => void;
  counts: CountType[];
  status: Status;
  deleteCount: (count: CountType) => void;
}

function Count({ fetchCount, counts, status, deleteCount }: CountProps) {
  console.log("Count component rendered");

  return (
    <div>
      {status === "loading" && <button disabled>Loading...</button>}
      {status !== "loading" && (
        <button onClick={fetchCount} disabled>
          Fetch Count
        </button>
      )}
      {status === "failed" && <div>Error fetching count</div>}

      <div>
        {counts &&
          counts.map((count: CountType, idx: number) => {
            return (
              <>
                <div key={idx} className="card">
                  {count.title} :<span> {count.count} </span> <br />
                  <button>++</button>
                  <button>--</button>
                  <button>Reset</button>
                  <button onClick={() => deleteCount(count)}>Delete</button>
                  <button>Save</button>
                </div>
                <hr />
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Count;
