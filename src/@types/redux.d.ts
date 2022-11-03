import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

declare global {
  // Return action function with payload type.
  type ActionCreatorFn<T extends ActionCreatorWithPayload> = T extends
    | null
    | undefined
    | ActionCreatorWithoutPayload
    ? () => void
    : T extends (payload: infer P, type: string) => void
    ? (payload: P) => void
    : () => void;
}

export {};
