export const filterNullValues = <T>(obj: T): T =>
  Object.keys(obj).reduce((acc, key) => {
    return obj[key] || obj[key] === false ? { ...acc, [key]: obj[key] } : acc;
  }, {} as T);
