export const setLanguage = (value: string) => {
  return localStorage.setItem("language", value);
};

export const getLanguage = () => {
  return localStorage.getItem("language");
};
