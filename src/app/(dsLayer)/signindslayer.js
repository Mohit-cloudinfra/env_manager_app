
import Api from "../(apiLayer)/api";
class LoginDS {
  constructor() {
    this.api = new Api(); 
  }

  
  Civil_Entry_Login(requestData, callbacks = {}) {
    const { onLogin, showAlert } = callbacks;

    return this.api.postAPI(requestData, "/dev/NJ_Civil_Entry_LOGIN")
      .then((response) => {
        const data = response.data;

        if (data.statusCode === 200) {
          if (typeof window !== "undefined") {
            localStorage.setItem("employeeId", data.body.employeeId);
            localStorage.setItem("employeeName", data.body.employeeName);
          }

          
          if (typeof onLogin === "function") {
            onLogin();
          }

          return { success: true };
        } else {
          if (typeof showAlert === "function") {
            showAlert(data.body?.message || "Login failed.");
          }

          return { success: false };
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message || "Something went wrong.";

        if (typeof showAlert === "function") {
          showAlert(errorMessage);
        }

        return { success: false };
      });
  }
}

export default LoginDS;