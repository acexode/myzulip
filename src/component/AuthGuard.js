import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

const AuthGuard = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render ={props =>
            localStorage.getItem("token") ? (
                <Component {...props} />
            ) :(
                <Redirect
                    to ={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />
            )
        }
    
    />
)

export default AuthGuard