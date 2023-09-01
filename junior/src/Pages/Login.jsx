import "../css/pages/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";
function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  function HandleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let obj = {
      email: data.get("email"),
      password: data.get("password"),
    };
    fetch("http://localhost:5000/api/actions/log", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === 200) {
          localStorage.setItem("token", data.token);
          navigate("/home/home");
        } else if (data.status === 403) {
          setErrorMessage("Combinación incorrecta");
        } else if (!data) {
          setErrorMessage("El servidor está caído, inténtelo más tarde.");
        } else {
          setErrorMessage("Hubo un error desconocido.");
        }
      });
  }

  const styles = {
    formControl: {
      position: "relative",
      left: "12%",
      marginTop: "50px",
      border: "none",
      width: "75%",
      color: "aliceblue",
    },
    select: {
      width: "75%",
      position: "relative",
      border: "0px solid",
      background: "transparent",
      color: "aliceblue",
      "& .MuiSelect-select:focus": {
        backgroundColor: "transparent",
        boxShadow: "0 0 3px rgba(0, 0, 0, 0.5)",
        border: "none",
        borderRadius: "4px",
      },
    },
    menuItem: {
      backgroundColor: "rgba(202, 209, 215, 0.1)",
    },
    menuPaper: {
      backgroundColor: "transparent",
      boxShadow: "0 0 3px rgba(0, 0, 0, 0.5)",
      borderRadius: "4px",
    },
  };

  console.log("a");

  return (
    <>
      <div className="lform-container">
        {errorMessage && (
          <Alert
            severity="warning"
            icon={false}
            style={{
              backgroundColor: "rgba(255, 255, 255, .3)",
              color: "white",
              border: "2px solid black",
              width: "25vw",
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={HandleSubmit} className="login-form">
          <h2 className="form-title">Login</h2>
          <input type="text" placeholder="Correo electrónico" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button className="button-48" role="button" type="submit">
            <span className="text">Submit</span>
          </button>

          <a href="/register" className="change-page-form-a">
            Or sign-up
          </a>
        </form>
      </div>
    </>
  );
}
export default Login;
