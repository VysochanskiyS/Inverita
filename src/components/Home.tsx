import TextField from "@mui/material/TextField";
import React from "react";
import Button from "@mui/material/Button";
import { User } from "../interfaces/app";
interface IHomeProps {
  users: User[];
}
export const Home: React.FC<IHomeProps> = ({ users }) => {
  const style = {
    container: {
      display: "flex",
    },
    input: {
      marginRight: 7,
    },
    error: {
      color: "red",
    },
  };
  const [error, setError] = React.useState(false);
  const [value, setValue] = React.useState("");
  const postUser = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: `${value}` }),
    };
    if (users.findIndex((item) => item.name === value) > -1) {
      setError(true);
    } else {
      fetch("http://localhost:8081/api/user", requestOptions);
      setValue("");
    }
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setValue(e.target.value);
  };
  return (
    <div style={style.container}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          style={style.input}
          size="small"
          id="outlined-basic"
          label="add person"
          variant="outlined"
          onChange={handleChangeInput}
          value={value}
        />
        {error && <sub style={style.error}>User already exists</sub>}
      </div>
      <Button style={{ height: "40px" }} onClick={postUser} variant="contained">
        add User
      </Button>
    </div>
  );
};
