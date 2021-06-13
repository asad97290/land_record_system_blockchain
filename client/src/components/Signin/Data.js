import React from "react";
import { Button, Form } from "react-bootstrap";
import {BASE_URL} from "../../constants.js"
import axios from "axios";
function Data() {
  const url = `${BASE_URL}/users/login`;
  let conf = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const login = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    for (let key of formData.keys()) {
      data[key] = formData.get(key);
    }

    axios
      .post(url, data, conf)
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.message.token)
          );
          let userCnic = response.data.message.userCnic;
          let orgName = response.data.message.orgName;
          localStorage.setItem("cnic", userCnic);
          localStorage.setItem("organization", orgName);
          window.location.pathname = "/profile/" + userCnic;
        } else if (response.data.success === false) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container">
      <div
        className="row mx-auto justify-content-center row-content text-center"
        style={{ width: "95%" }}
      >
        <div className="col-12">
          <h2>Login</h2>
          <Form className="text-left addForm p-4 mb-3" onSubmit={login}>
            <Form.Group>
              <Form.Label>Email *</Form.Label>
              <Form.Control
                id="email"
                type="text"
                placeholder="Enter Your Email Here"
                required
                name="email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password *</Form.Label>
              <Form.Control
                id="password"
                type="password"
                placeholder="Enter Password"
                required
                name="password"
              />
            </Form.Group>
            <Button
              type="submit"
              style={{ backgroundColor: "#218838" }}
              className="w-100 mt-2"
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Data;
