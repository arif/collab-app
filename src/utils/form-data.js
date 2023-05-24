// eslint-disable-next-line
export const objToFormData = (obj) => {
  const data = new FormData();
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (val !== null) {
      data.append(key, val);
    }
  });
  return data;
};
