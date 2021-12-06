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
      if (!cancelled) {
        errorCallback && errorCallback()
      }
    })
    .finally(() => {
      if (!cancelled) {
        finallyCallback && finallyCallback()
      }
    })

  return () => {
    cancelled = true
  }
}
