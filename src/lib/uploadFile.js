export async function uploadFile(file) {
  // Example: Upload file to a cloud storage service and return the URL
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("https://example.com/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.url;
}
