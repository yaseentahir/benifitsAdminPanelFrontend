export const objectToFormData = (object) => {
  const formData = new FormData();

  Object.keys(object).forEach((key) => {
    if (key === "icon") {
      formData.append(key, object[key][0]);
    }
    formData.append(key, object[key]);
  });

  return formData;
};
