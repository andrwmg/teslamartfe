import http from "./http-common";


class ListingDataService {

  getAll(data) {
    return http.get("/listings", data);
  }

  createOne() {
      return http.get("/listings")
  }

  seed(data) {
      return http.post('/listings', data)
  }

  get(id) {
    return http.get(`/listings/${id}`);
  }

  create(data) {
    return http.post("/listings", data);
  }

  update(id, data) {
    return http.put(`/listings/${id}`, data);
  }

  delete(id, data) {
    return http.delete(`/listings/${id}`, data);
  }

  deleteAll() {
    return http.delete(`/listings`);
  }

  findById(_id) {
    return http.get(`/listings?title=${_id}`);
  }
}

export default new ListingDataService();