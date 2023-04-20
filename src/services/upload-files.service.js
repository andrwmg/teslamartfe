import axios from "axios";
const loc = window.location

class UploadFilesService {
  upload = async (images) => {
    let output = []
    for (let image of images) {
      if (image.data) {
        let formData = new FormData();
        formData.append('images', image.data)
        await axios.post(`${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':8080/data/listings/upload' : '/data/listings/upload'}`, formData, {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:8081",
            'Content-Type': 'multipart/form-data'
          }
        }).then(({data}) => {
          output.push({...data[0]})
        })
      } else {
        output.push(image)
      }
    }
  return output
  }
}

export default new UploadFilesService();