const api_key = "898153229596588";
const cloud_name = "dl897rdek";

document.querySelector("#upload-form").addEventListener("submit", async function (e){
  e.preventDefault();

  const signatureResponse = await axios.get("/cloud_signature");

  const data = new FormData();
  data.append("file", document.querySelector("#file-field").files[0]);
  data.append("api_key", api_key);
  data.append("signature", signatureResponse.data.signature);
  data.append("timestamps", signatureResponse.data.timestamp);

  const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}`, {
    headers: {"Content-Type": "multipart/form-data"},
    onUploadProgress: function (e) {
      console.log(e.loaded/e.total);
    }
  });
  console.log(cloudinaryResponse.data);

  const imageData = {
    public_id: cloudinaryResponse.data.public_id,
    version: cloudinaryResponse.data.version,
    signature: cloudinaryResponse.data.signature,
    url: cloudinaryResponse.data.url
  };

  axios.post("/cloud_post", imageData);
});