export const findValueInData = (value, data) => {

  return data.findIndex((item) => item.id === value.id);
};
