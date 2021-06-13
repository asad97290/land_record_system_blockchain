import React from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import {BASE_URL} from "../../constants.js"
function Data() {
  const url = `${BASE_URL}/users`;
  let conf = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    var data = {};
    for (let key of formData.keys()) {
      data[key] = formData.get(key);
    }
    axios
      .post(url, data, conf)
      .then(function (response) {
        if (response.data.success) {

          document.getElementById("email").value = "";
          document.getElementById("userCnic").value = "";
          document.getElementById("orgName").value = "";
          document.getElementById("password").value = "";
          alert("User Registered Successfully!");
        } else {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        alert("-------", error);
      });
  };

  return (
    <div className="container">
      <div
        className="row mx-auto justify-content-center row-content text-center"
        style={{ width: "95%" }}
      >
        <div className="col-12 ">
          <h2>Organization Registration Form</h2>
          <Form className="text-left addForm p-4 mb-3" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email *</Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Enter Your Email Here"
                required
                name="email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>CNIC *</Form.Label>
              <Form.Control
                id="userCnic"
                type="text"
                placeholder="Enter Your CNIC Here"
                required
                name="userCnic"
                minLength="13"
                maxLength="13"
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
            <Form.Group>
              <Form.Label>Organization *</Form.Label>
              <Form.Control as="select" required name="orgName" id="orgName">
                <option value="Org1">Manufacturer</option>
                <option value="Org2">Car Owner</option>
              </Form.Control>
            </Form.Group>

            <Button
              type="submit"
              style={{ backgroundColor: "#DC3545" }}
              className="w-100 mt-2"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Data;