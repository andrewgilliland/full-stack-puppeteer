const baseURL = "http://localhost:3000";

/** Return PDF as image  */
export const getPDF = async () => {
  const response = await fetch(`${baseURL}/pdf`);
  const data = await response.blob();

  console.log("PDF received");

  const file = window.URL.createObjectURL(data);

  const src = file.replace("blob:", "");

  console.log(file);
  return src;
};
