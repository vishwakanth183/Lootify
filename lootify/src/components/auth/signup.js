"use client";
import React from "react";
import Image from "next/image";
import { TextField, Button, useMediaQuery } from '@mui/material';
import Link from "next/link";
import { Typography } from "@mui/material";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import "../../../src/shared/commonStyles.scss";
import './signup.scss'

const SignUp = () => {
    const validationschema = yup.object().shape({
        email: yup.string()
            .label('email')
            .required("Email is required")
            .email('Invaild email'),
        password: yup.string()
            .label('password')
            .required("Password is required"),
        firstName: yup.string()
            .label('First Name')
            .required("First Name is required"),
        lastName: yup.string()
            .label('Last Name')
            .required("Last Name is required"),
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
                    <Typography className="hederTxt">Hello!</Typography>
                    <Typography className="text">Create your account to access here</Typography>
                    <Formik initialValues={{ email: '', password: '' }}
                        validationSchema={validationschema}
                        onSubmit={(values, { resetForm }) => {
                            console.log('vvv')
                        }}
                    >
                        {({ errors, isValid, touched, dirty, values, handleBlur, handleChange, handleSubmit }) => (
                            <Form className="formView" style={{ width: '100%', display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                                <div className="nameview">
                                    <TextField
                                        name='firstName'
                                        label="First Name"
                                        variant="outlined"
                                        onBlur={handleBlur('firstName')}
                                        onChange={handleChange('firstName')}
                                        className="nametextfield"
                                        error={Boolean(errors.firstName) && Boolean(touched.firstName)}
                                        helperText={Boolean(touched.firstName) && errors.firstName}
                                    />
                                    <TextField
                                        name='lastName'
                                        label="Last Name"
                                        variant="outlined"
                                        onBlur={handleBlur('lastName')}
                                        onChange={handleChange('lastName')}
                                        className="nametextfield"
                                        error={Boolean(errors.lastName) && Boolean(touched.lastName)}
                                        helperText={Boolean(touched.lastName) && errors.lastName}
                                    />
                                </div>
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
                                <Button className="button" type='submit' variant="contained">Sign Up</Button>
                            </Form>
                        )}
                    </Formik>
                    <div className="registerview">
                        <Typography className="textView">All ready have an account?<Link className="registertext" href={"/lootify/signin"}>Login here</Link></Typography>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default SignUp;