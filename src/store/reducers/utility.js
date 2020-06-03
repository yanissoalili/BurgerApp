export const updateObject = (oldObject, updatesValues) => {
  return {
    ...oldObject,
    ...updatesValues
  }
}
