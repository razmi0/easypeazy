import { Count } from "./models";
import { useStoreActions, useStoreState } from "easy-peasy";

import "./App.css";

function App() {
  const fetchCount = useStoreActions((actions) => actions.counts.fetchCounts);
  const deleteCount = useStoreActions((actions) => actions.counts.deleteCount);

  const counts = useStoreState((state) => state.counts.list);
  const status = useStoreState((state) => state.counts.status);
  return (
    <div className="card">
      <Count
        fetchCount={fetchCount}
        counts={counts}
        status={status}
        deleteCount={deleteCount}
      />
    </div>
  );
}

export default App;
