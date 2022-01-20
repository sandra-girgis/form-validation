import { useState } from "react";
import "./loginForm.css";
import Input from "./Input";

export default function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    isvalid: false,
  });

  const [errors, setErrors] = useState({
    emailErr: " ",
    passwordErr: " ",
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const changeData = (e) => {
    if (e.target.name === "email") {
      setLoginData({
        ...loginData,
        email: e.target.value,
      });

      var regex = /^\b[A-Z][A-Z 0-9._%-]+@[A-Z0-9]+\.[A-Z]{2,4}\b$/i;
      if (e.target.value.match(regex)) {
        loginData.isvalid = true;
      }

      setErrors({
        ...errors,
        emailErr:
          e.target.value.length === 0
            ? "This field is required"
            : e.target.value.length < 3
            ? "Minimum length is 3 characters"
            : loginData.isvalid === false
            ? "Invalid Email"
            : null,
      });
    } else if (e.target.name === "password") {
      setLoginData({
        ...loginData,
        password: e.target.value,
      });

      setErrors({
        ...errors,
        passwordErr:
          e.target.value === 0
            ? "This field is required"
            : e.target.value.length < 8
            ? "Minimum length is 8 characters"
            : null,
      });
    }
  };

  const submitLoginData = (e) => {
    e.preventDefault();
    if (!errors.emailErr && !errors.passwordErr) {
      console.log(loginData);
    }
  };

  return (
    <div className="container py-5">
      <h1>Login Form</h1>
      <div className="form-group">
        <form onSubmit={(e) => submitLoginData(e)}>
          <Input
            id={"emailID"}
            type={"email"}
            label={"email"}
            className={`form-control ${errors.emailErr ? "border-danger" : ""}`}
            errors={errors.emailErr}
            value={loginData.email}
            placeHolder={"Email@example.com"}
            onChange={(e) => changeData(e)}
            name={"email"}
          />

          <div className="mb-3">
            <label htmlFor="passwordID" className="form-label">
              Password
            </label>
            <div className="pass">
              <input
                type={passwordShown ? "text" : "password"}
                className={`form-control ${
                  errors.passwordErr ? "border-danger" : ""
                }`}
                id="passwordID"
                value={loginData.password}
                onChange={(e) => changeData(e)}
                name="password"
              />
              <span>
                <img
                  onClick={togglePassword}
                  className="eye-icon"
                  src="https://cdns.iconmonstr.com/wp-content/assets/preview/2017/240/iconmonstr-eye-9.png"
                  alt="eye-icon"
                />
              </span>
            </div>
            <div id="password" className="form-text text-danger">
              {errors.passwordErr}
            </div>
          </div>
          <button
            type="submit"
            disabled={errors.passwordErr || errors.emailErr}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
