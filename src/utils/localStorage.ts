export const setLocalStorage = (name: string, arg: any) => {
  return localStorage.setItem(name, JSON.stringify(arg));
};

export const getLocalStorage = (name: string) => {
  return JSON.parse(localStorage.getItem(name) || "null");
};

export const removeLocalStorage = (name: string) => {
  return localStorage.removeItem(name);
};
