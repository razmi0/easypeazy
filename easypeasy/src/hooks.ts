import { CountModel } from "./models/count/model";
import { createTypedHooks } from "easy-peasy";

const typedHooks = createTypedHooks<CountModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
