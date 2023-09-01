import "../css/pages/register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Select, Alert, AlertTitle } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();

  const [type, setType] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  function HandleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let obj = {
      username: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      type: type,
    };
    fetch("http://localhost:5000/api/actions/reg", {
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
          setErrorMessage("Ya existe una cuenta con ese correo");
        } else if (!data) {
          setErrorMessage("El servidor está caído, inténtelo más tarde.");
        } else {
          setErrorMessage("Hubo un error desconocido.");
        }
      });
  }

  function HandleChange(e) {
    e.preventDefault();
    console.log(e.target.value);
    let type = e.target.value;
    if (type == 0) {
      return;
    }
    if (type == 1) {
      return setType(1);
    }
    return setType(2);
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
      <div className="rform-container">
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
        <form onSubmit={HandleSubmit} className="register-form">
          <h2 className="form-title">Register</h2>
          <input type="text" placeholder="Nombre" name="name" />
          <input type="text" placeholder="Correo electrónico" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <FormControl
            fullWidth
            sx={{
              position: "relative",
              left: "12%",
              marginTop: "50px",
              border: "none",
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Tipo de cuenta"
              onChange={HandleChange}
              style={styles.select}
              MenuProps={{
                PaperProps: {
                  style: styles.menuPaper,
                },
              }}
            >
              <MenuItem
                value={0}
                style={{ backgroundColor: "rgba(202, 209, 215, 0.1)" }}
              >
                Selecciona un tipo de cuenta
              </MenuItem>
              <MenuItem value={1}>Personal</MenuItem>
              <MenuItem value={2}>Empresa</MenuItem>
            </Select>
          </FormControl>
          <button className="button-48" role="button" type="submit">
            <span className="text">Submit</span>
          </button>
          <a href="/login" className="change-page-form-a">
            Or log-in
          </a>
        </form>
      </div>
    </>
  );
}
export default Register;
