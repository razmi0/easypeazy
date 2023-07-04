import { action, Action, Thunk, thunk } from "easy-peasy";

/**
 * TYPES
 */

export type CountType = {
  id: number;
  count: number;
  title: string;
  localStatus: LocalStatus;
};

export type Status = "idle" | "loading" | "succeeded" | "failed";
export type LocalStatus = Status | "updated" | "updating" | "edit";

export interface CountModel {
  counts: CountType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  setStatus: Action<CountModel, "idle" | "loading" | "succeeded" | "failed">;
  increment: Action<CountModel, { id: number }>;
  decrement: Action<CountModel, { id: number }>;
  addCounts: Action<CountModel, CountType[]>;
  removeCount: Action<CountModel, number>;
  fetchCounts: Thunk<CountModel, CountType[]>;
  deleteCount: Thunk<CountModel, { id: number }>;
  saveCount: Thunk<CountModel, CountType>;
  setLocalStatus: Action<CountModel, { id: number; localStatus: LocalStatus }>;
  initEditTitle: Action<CountModel, number>;
  updateCount: Action<CountModel, CountType>;
}
export type Method = "POST" | "GET" | "DELETE" | "PUT" | "PATCH" | "HEAD";

export interface FetchOptions {
  method: Method;
  body: string;
  headers: {
    "Content-type": string;
  };
}

/**
 * Variables
 */

const url =
  "https://my-json-server.typicode.com/razmi0/json_placeholder/counts";

/**
 * MODEL
 */

const countModel: CountModel = {
  counts: [] as CountType[],
  /**
   * status
   * @example "idle" | "loading" | "succeeded" | "failed"
   */
  status: "idle" as Status,

  increment: action((state, { id }) => {
    state.counts = state.counts.map((item) => {
      if (item.id === id) {
        item.count += 1;
      }
      return item;
    });
  }),

  decrement: action((state, { id }) => {
    state.counts = state.counts.map((item) => {
      if (item.id === id) {
        item.count -= 1;
      }
      return item;
    });
  }),

  setStatus: action((state, payload) => {
    state.status = payload;
  }),

  setLocalStatus: action((state, { id, localStatus }) => {
    state.counts = state.counts.map((item) => {
      if (item.id === id) {
        item.localStatus = localStatus;
      }
      return item;
    });
  }),

  addCounts: action((state, payload) => {
    state.counts.push(...payload);
  }),

  removeCount: action((state, id) => {
    state.counts = state.counts.filter((item) => item.id !== id);
  }),

  updateCount: action((state, { id, title, count, localStatus }) => {
    state.counts = state.counts.map((item) => {
      if (item.id === id) {
        console.log("updateCount", item);

        item = { id, title, count, localStatus };
        console.log("item", item);
      }
      return item;
    });
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

  saveCount: thunk(
    async (actions, { id, title, count, localStatus }: CountType) => {
      try {
        actions.setLocalStatus({ id, localStatus: "updating" });
        await fetch(`${url}/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ title, count, localStatus }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        actions.updateCount({ id, title, count, localStatus });
        actions.setLocalStatus({ id, localStatus: "updated" });
      } catch (error) {
        actions.setLocalStatus({ id, localStatus: "failed" });
        console.log(error);
      }
    }
  ),

  initEditTitle: action((state, id) => {
    state.counts = state.counts.map((item) => {
      if (item.id === id) {
        item.localStatus = "edit";
      }

      return item;
    });
  }),
};

export default countModel;
