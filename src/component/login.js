import React from 'react';
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import logincss from './login.css'
import { useHistory } from "react-router-dom";
import axios from 'axios'
function Login() {
    let history = useHistory();
  return (
    <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        axios.post(` https://glacial-earth-67440.herokuapp.com/api/v1/users/`,  values )
        .then(res => {
          console.log(res);
          console.log(res.data);
          let user = {username: res.data.user.username, id: res.data.user._id}
          localStorage.setItem("token", res.data.token)
          localStorage.setItem('user', JSON.stringify(user))
            history.push('/chat',{user: res.data.user})
        })	
        setSubmitting(false);
      }, 500);
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email()
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <div className="login">
            <form className="login-form" onSubmit={handleSubmit}>
            <h3 className="text-center">Login</h3>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}

          <label htmlFor="email">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
          />
          {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}
          <button type="submit" disabled={isSubmitting} class="login-button" >Login</button>
          
        </form>
        </div>
      );
    }}
  </Formik>
  );
}

export default Login;