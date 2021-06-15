import React from "react";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";
import { useState } from "react";
import {BASE_URL} from "../../constants.js"
import axios from "axios";

export default function Data() {
  const [qr, setQr] = useState("");
  const [token, setToken] = useState("");

  let conf = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Content-Type": "application/json",
    },
  };

  const handleError = (error) => {
    alert(error);
  };

  const handleScan = (result) => {
    if (result) {
      axios
        .get(
          `${BASE_URL}/getLandHistory?address=${result}`,
          conf
        )
        .then((response) => {
          if (response.data.result.length === 0) {
            alert("Invalid VIN Number");
          } else {
            window.location.pathname = "/property/" + result;
          }
        });

      console.log("------------------", result);
      // setToken(() => JSON.parse(localStorage.getItem("token")));
    }
  };

  return (
    <div>
      <QrReader
        delay={300}
        style={{ width: "100%" }}
        onError={handleError}
        onScan={handleScan}
      />
      {/* <h3>result: {qr}</h3> */}
    </div>
  );
}
