import { createStore } from "easy-peasy";
import { CountModel } from "../models/count/model";
import { countModel } from "../models";

type Models = {
  counts: CountModel;
};

const models: Models = {
  counts: countModel,
};

const store = createStore<Models>(models);

export default store;
