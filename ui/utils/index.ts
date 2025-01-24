const baseURL = "http://localhost:3000";

/** Convert Blob to Data URL  */
export const blobToDataURL = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

/** Return PDF as image  */
export const getPDF = async () => {
  const response = await fetch(`${baseURL}/pdf`);
  const blob = await response.blob();

  // Create a new Blob with type 'application/pdf'
  const pdfBlob = new Blob([blob], { type: "application/pdf" });

  const dataURL = await blobToDataURL(pdfBlob);

  return dataURL;
};
