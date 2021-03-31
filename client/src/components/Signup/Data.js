import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

function Data() {
  const url = "https://35.209.170.73:4000/users";
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
          var cnic = document.getElementById("userCnic").value;
          var type = document.getElementById("orgName").value;
          var text = response.data.x509Identity.credentials.certificate;
          text = JSON.stringify(text);
          const element = document.createElement("a");
          const file = new Blob([text], { type: "application/json" });
          element.href = URL.createObjectURL(file);
          element.download = `${cnic}${type}.id`;
          document.body.appendChild(element);
          element.click();
          document.getElementById("userCnic").value = "";
          document.getElementById("orgName").value = "";
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
          <h2>Registration Form</h2>
          <Form className="text-left addForm p-4 mb-3" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>CNIC *</Form.Label>
              <Form.Control
                id="userCnic"
                type="text"
                placeholder="Enter Your CNIC Here without dashes"
                required
                name="userCnic"
                minLength="13"
                maxLength="13"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Type *</Form.Label>
              <Form.Control as="select" required name="orgName" id="orgName">
                <option value="Org1">Development Authority</option>
                <option value="Org2">Land Owner</option>
              </Form.Control>
            </Form.Group>

            <Button
              type="submit"
              className="bg-theme border-theme button-hover w-100 mt-2"
            >
              Submit
            </Button>
          </Form>
          <h6>
            Kindly store your Identity Certificate in a safe place as it will
            only be issued once
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Data;
