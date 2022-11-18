import http from "./http-common";

class UserDataService {

  register(data) {
    return http.post("/register", data);
  }

  login(data) {
    return http.post('/login', data);
  }

  getUser() {
    return http.get('/getUser', { withCredentials: true })
    .then(console.log())
    .catch(console.error)
    
  }

  logout() {
    return http.get("/logout")
  }

}

export default new UserDataService();