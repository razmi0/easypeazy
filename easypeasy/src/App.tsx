import { Count } from "./models";
import { useStoreActions, useStoreState } from "./store/hooks";

import "./App.css";

function App() {
  console.log("App component rendered");

  /**
   * useStoreActions
   */
  const fetchCount = useStoreActions(
    (actions: any) => actions.counts.fetchCounts
  );
  const deleteCount = useStoreActions(
    (actions: any) => actions.counts.deleteCount
  );
  const increment = useStoreActions((state: any) => state.counts.increment);
  const decrement = useStoreActions((state: any) => state.counts.decrement);
  const saveCount = useStoreActions((actions: any) => actions.counts.saveCount);
  const setLocalStatus = useStoreActions(
    (actions: any) => actions.counts.setLocalStatus
  );

  /**
   * useStoreStates
   */
  const counts = useStoreState((state: any) => state.counts.counts);
  const status = useStoreState((state: any) => state.counts.status);

  return (
    <div>
      <Count
        fetchCount={fetchCount}
        counts={counts}
        status={status}
        deleteCount={deleteCount}
        increment={increment}
        decrement={decrement}
        saveCount={saveCount}
        setLocalStatus={setLocalStatus}
      />
    </div>
  );
}

export default App;
