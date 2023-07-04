import { CountModel } from "../models/count/model";
import { createTypedHooks } from "easy-peasy";

const { useStoreActions, useStoreDispatch, useStoreState } =
  createTypedHooks<CountModel>();

export { useStoreActions, useStoreDispatch, useStoreState };
