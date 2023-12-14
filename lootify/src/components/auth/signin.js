"use client";
import React from "react";
import Image from "next/image";
import { TextField, Button, useMediaQuery } from '@mui/material';
import Link from "next/link";
import { Typography } from "@mui/material";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import "../../../src/shared/commonStyles.scss";
import './signin.scss'

const SignIn = () => {
    const validationschema = yup.object().shape({
        email: yup.string()
            .label('email')
            .required("Email is required")
            .email('Invaild email'),
        password: yup.string()
            .label('password')
            .required("Password is required"),
    })
    const isDesktop = useMediaQuery("(max-width:600px)");
    return (
        <div className="mainContainer">
            {!isDesktop &&
                <div className="subviewLeft">
                    <Image
                        src={require("../../../src/assets/images/login.jpg")}
                        className="imageView"
                    />
                </div>}
            <div className="subviewRight">

                <div className="fieldview">
                    <Typography className="hederTxt">Welcome!</Typography>
                    <Typography className="text">Sign in your account to access here</Typography>
                    <Formik initialValues={{ email: '', password: '' }}
                        validationSchema={validationschema}
                        onSubmit={(values, { resetForm }) => {
                            console.log('vvv')
                        }}
                    >
                        {({ errors, isValid, touched, dirty, values, handleBlur, handleChange, handleSubmit }) => (
                            <Form style={{ width: '100%', display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                                <TextField
                                    name='email'
                                    label="Email"
                                    type={'email'}
                                    variant="outlined"
                                    onBlur={handleBlur('email')}
                                    onChange={handleChange('email')}
                                    className="textfield"
                                    error={Boolean(errors.email) && Boolean(touched.email)}
                                    helperText={Boolean(touched.email) && errors.email}
                                />
                                <TextField
                                    label="Password"
                                    name='password'
                                    type={'password'}
                                    className="textfield"
                                    onBlur={handleBlur('password')}
                                    onChange={handleChange('password')}
                                    error={Boolean(errors.password) && Boolean(touched.password)}
                                    helperText={Boolean(touched.password) && errors.password}
                                />
                                <Typography className="forgotPassword">Forgot Password?</Typography>
                                <Button className="button" type='submit' variant="contained">Sign In</Button>
                            </Form>
                        )}
                    </Formik>
                    <div className="registerview">
                        <Typography className="textView">Still not one of us?<Link className="registertext" href={"/lootify/signup"}>Register</Link></Typography>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default SignIn;