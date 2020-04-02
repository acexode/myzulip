import React, {useState} from 'react';
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
import logincss from './login.css'
import { useHistory } from "react-router-dom";
import axios from 'axios'

function UpdateUser({user}) {
    let history = useHistory();
     const [serverError, setServerError] = useState([])
  return (
    <Formik
    initialValues={{_id : user._id, email: user.email, password: "", firstName: user.firstName, lastName: user.lastName, username: user.username, phone: user.phone, bio: user.bio }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);     
        axios.put(`https://glacial-earth-67440.herokuapp.com/api/v1/users/`,  values )
        .then(res => {
          console.log(res);
          console.log(res.data);
          history.push('/login')
        }).catch(error =>{
          // console.log(err)
          setServerError(error.response.data.errors)
          console.log(error.response.data.errors)
        })	
        setSubmitting(false);
      }, 500);
    }}
    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email()
        .required("Required"),
      firstName: Yup.string()        
        .required("Required"),
      lastName: Yup.string()        
        .required("Required"),
      username: Yup.string()        
        .required("Required"),
      phone: Yup.string()        
        .required("Required"),
      bio: Yup.string()        
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
        
            <form className="container" onSubmit={handleSubmit}>
            <h3 className="text-center pt-2">Edit</h3>
            
            <div className="row">
            {setServerError.length > 0 &&
              serverError.map((e, i) =>(               
                <div  key={i} className=" bg-danger text-center" style={{textAlign: 'center', marginLeft: '15px', marginRight: '15px', marginBottom: '1px'}}>{Object.values(e)}</div>
                

              ))
            }
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.email && touched.email && "error"}
                    />
                {errors.email && touched.email && (
                    <div className="input-feedback">{errors.email}</div>
                )}
            </div>
            <div className="col-md-6">
                        <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.username && touched.username && "error"}
                    />
                    {errors.username && touched.username && (
                        <div className="input-feedback">{errors.username}</div>
                    )}
            </div>
            </div>
       
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="firstName">Firstname</label>
                    <input
                        name="firstName"
                        type="text"
                        placeholder="Firstname"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.firstName && touched.firstName && "error"}
                    />
                    {errors.firstName && touched.firstName && (
                        <div className="input-feedback">{errors.firstName}</div>
                    )}

                </div>
                <div className="col-md-6">
                <label htmlFor="lastName">LastName</label>
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Lastname"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.lastName && touched.lastName && "error"}
                    />
                    {errors.lastName && touched.lastName && (
                        <div className="input-feedback">{errors.lastName}</div>
                    )}

                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                        <label htmlFor="phone">Phone</label>
                        <input
                            name="phone"
                            type="text"
                            placeholder="Phone number"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.phone && touched.phone && "error"}
                        />
                        {errors.phone && touched.phone && (
                            <div className="input-feedback">{errors.phone}</div>
                        )}
                </div>
                <div className="col-md-6">
                    <label htmlFor="firstname">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.password && touched.password && "error"}
                    />
                    {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                    )}
                </div>
            </div>
        
        
          
          <label htmlFor="bio">Bio</label>
          <input
            name="bio"
            type="text"
            placeholder="Enter a short bio"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.bio && touched.bio && "error"}
          />
          {errors.bio && touched.bio && (
            <div className="input-feedback">{errors.bio}</div>
          )}         

          
          <button type="submit" disabled={isSubmitting} className="login-button" >Save Changes</button>
          
        </form>
     
      );
    }}
  </Formik>
  );
}

export default UpdateUser;