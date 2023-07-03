import { action, Action, Thunk, thunk } from "easy-peasy";

export type CountType = {
  id: number;
  count: number;
  title: string;
};

export type Status = "idle" | "loading" | "succeeded" | "failed";

export interface CountModel {
  counts: CountType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  setStatus: Action<CountModel, "idle" | "loading" | "succeeded" | "failed">;
  addCounts: Action<CountModel, CountType[]>;
  removeCount: Action<CountModel, number>;
  fetchCounts: Thunk<CountModel, CountType[]>;
  deleteCount: Thunk<CountModel, { id: number }>;
}

const url =
  "https://my-json-server.typicode.com/razmi0/json_placeholder/counts";

const countModel: CountModel = {
  counts: [] as CountType[],
  /**
   * status
   * @example "idle" | "loading" | "succeeded" | "failed"
   */
  status: "idle" as Status,

  setStatus: action((state, payload) => {
    state.status = payload;
  }),

  addCounts: action((state, payload) => {
    state.counts.push(...payload);
  }),

  removeCount: action((state, id) => {
    state.counts = state.counts.filter((item) => item.id !== id);
  }),

  fetchCounts: thunk(async (actions) => {
    try {
      actions.setStatus("loading");
      const data = await fetch(url);
      const json = await data.json();
      actions.addCounts(json);

      actions.setStatus("succeeded");
      actions.setStatus("idle");
    } catch (error) {
      actions.setStatus("failed");
    }
  }),

  deleteCount: thunk(async (actions, { id }) => {
    try {
      actions.setStatus("loading");
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      actions.setStatus("succeeded");
      actions.removeCount(id);
      actions.setStatus("idle");
    } catch (error) {
      actions.setStatus("failed");
      console.log(error);
    }
  }),
};

export default countModel;
