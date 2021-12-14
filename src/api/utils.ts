export function cancellableRequest<T>(
  requestFn: () => Promise<T>,
  successCallback: (data: T) => void,
  errorCallback?: () => void,
  finallyCallback?: () => void,
): () => void {
  let cancelled = false

  requestFn()
    .then((data: T) => {
      if (!cancelled) {
        successCallback(data)
      }
    })
    .catch(() => {
      errorCallback && errorCallback()
    })
    .finally(() => {
      finallyCallback && finallyCallback()
    })

  return () => {
    cancelled = true
  }
}
