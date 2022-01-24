import React from "react";
import { Button } from "@mui/material";

export const ChangeUsers = () => {
  const deleteUsers = () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:8081/api/users", requestOptions);
  };
  return (
    <div>
      <Button variant="contained" onClick={deleteUsers}>
        remove all users
      </Button>
    </div>
  );
};
