export const log = (event: string, data?: any) => {
  log(
    JSON.stringify({
      time: new Date().toISOString(),
      event,
      data,
    })
  );
};