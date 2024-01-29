"use client";

import React, { useEffect } from "react";

const AuthenticationCheck = () => {
  useEffect(() => {
    console.log("Check for authentication and navigate");
  }, []);

  return <div>Check for authentication</div>;
};

export default AuthenticationCheck;
