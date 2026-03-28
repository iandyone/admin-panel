export const wait = async (ms: number) => {
  return await new Promise(res => {
    setTimeout(() => {
      res(true);
    }, ms);
  })
}
