const baseURL = "http://localhost:3000";

export const getPDF = async () => {
  const response = await fetch(`${baseURL}/pdf`);
  const data = await response.blob();
  const file = window.URL.createObjectURL(data);
  window.open(file);
};
