export const payloadHelper = (keys, values) => {
  let payload = {};

  for (let key in keys) {
    if (values.hasOwnProperty(key)) {
      payload = {
        ...payload,
        [key]: values[key],
      };
    }
  }
  return payload;
};
