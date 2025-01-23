const baseURL = "http://localhost:3000";

/** Return PDF as image  */
export const getPDF = async () => {
  const response = await fetch(`${baseURL}/pdf`);
  const blob = await response.blob();

  console.log("PDF received");

  const file = window.URL.createObjectURL(blob);

  console.log(file);
  return file;
};
