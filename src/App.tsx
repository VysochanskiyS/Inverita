import React, { useEffect, useState } from "react";
import { Home } from "./components/Home";
import { Routes, Route, Link } from "react-router-dom";
import { Users } from "./components/Users";
import { ChangeUsers } from "./components/ChangeUsers";
import Button from "@mui/material/Button";
function App() {
  const style = {
    container: {
      padding: "2% 5%",
    },
    navigation: {
      position: "absolute" as "absolute",
      top: "50%",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0,
      textAlign: "center" as "center",
    },
    buttons: {
      marginRight: 5,
      backgroundColor: "black",
      border: "1px solid #7fff00",
      padding: 5,
      color: "#7fff00",
      cursor: "pointer",
    },
    link: { textDecoration: "none" },
  };

  const [currentPage, setCurrentPage] = useState(
    Number(window.localStorage.getItem("page"))
  );
  const getUsers = () => {
    return fetch("http://localhost:8081/api/users", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };
  const [users, setUsers] = React.useState([]);

  useEffect(
    () => window.localStorage.setItem("page", JSON.stringify(currentPage)),
    [currentPage]
  );

  const nextPage = () => {
    setCurrentPage(currentPage === 3 ? 1 : currentPage + 1);
    if (currentPage === 1) {
      getUsers();
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const prevPage = () => {
    setCurrentPage(currentPage === 1 ? 3 : currentPage - 1);
    if (currentPage === 3) {
      getUsers();
    }
  };
  return (
    <div style={style.container}>
      <div style={style.navigation}>
        <Link
          style={style.link}
          to={`${currentPage === 1 ? 3 : currentPage - 1}`}
        >
          <Button style={style.buttons} onClick={prevPage}>
            prev
          </Button>
        </Link>
        <Link
          style={style.link}
          to={`${currentPage === 3 ? 1 : currentPage + 1}`}
        >
          <Button style={style.buttons} onClick={nextPage}>
            next
          </Button>
        </Link>
      </div>
      <Routes>
        <Route path="/1" element={<Home users={users} />}></Route>
        <Route path="/2" element={<Users users={users} />}></Route>
        <Route path="/3" element={<ChangeUsers />}></Route>
      </Routes>
    </div>
  );
}

export default App;
