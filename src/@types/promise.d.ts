declare global {
  // Promise return type.
  type ReturnPromiseType<T> = Awaited<ReturnType<T>>;
}

export {};
