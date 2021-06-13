import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Carousel, CarouselItem, Image } from "react-bootstrap";
import {BASE_URL} from "../../constants.js"
function Data() {
  const [token, setToken] = useState(() =>
    JSON.parse(localStorage.getItem("token"))
  );
  const [property, setProperty] = useState({});
  const [propertyHistory, setPropertyHistory] = useState([]);
  const [url, setImageURL] = useState("");

  if (!token) {
    window.location.pathname = "/signin";
  }

  let { address } = useParams();

  useEffect(async () => {
    console.log(address);
    const url1 = `${BASE_URL}/channels/mychannel/chaincodes/landRecord?args=["${address}"]&fcn=queryLand`;
    const url2 = `${BASE_URL}/channels/mychannel/chaincodes/landRecord?args=["${address}"]&fcn=getHistoryForAsset`;
    let conf = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.get(url1, conf);
    setProperty(() => response.data.result);
    console.log(response.data.result);
    const response2 = await axios.get(url2, conf);
    setPropertyHistory(() => response2.data.result);

    const url = await QRCode.toDataURL(address);
    setImageURL(url);
  }, []);

  function copyText(id) {
    var text = document.getElementById(id).innerText;
    var elem = document.createElement("textarea");
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
  }

  return (
    <div className="container">
      <div className="row justify-content-center row-content">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <Carousel
                    interval={null}
                    id="carousel-example-generic"
                    data-ride="carousel"
                    indicators={false}
                    className="d-none d-lg-block"
                  >
                    <CarouselItem className="carousel-item-imgs">
                      <Image
                        className="d-block mh-100 mx-auto"
                        src={property.propertyImage}
                        alt=""
                      />
                    </CarouselItem>
                  </Carousel>
                  <Carousel
                    interval={null}
                    id="carousel-example-generic2"
                    data-ride="carousel"
                    indicators={false}
                    className="d-none d-md-block d-lg-none"
                  >
                    <CarouselItem className="carousel-item-imgs3">
                      <Image
                        className="d-block mh-100 mx-auto"
                        src={property.propertyImage}
                        alt=""
                      />
                    </CarouselItem>
                  </Carousel>
                  <Carousel
                    interval={null}
                    id="carousel-example-generic3"
                    data-ride="carousel"
                    indicators={false}
                    className="d-flex justify-content-center align-items-center d-md-none bg-black"
                    style={{ height: "400px" }}
                  >
                    <CarouselItem className="carousel-item-imgs2 bg-black">
                      <Image
                        style={{
                          maxHeight: "400px",
                        }}
                        className="d-block mw-100 mx-auto"
                        src={property.propertyImage}
                        alt=""
                      />
                    </CarouselItem>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-2">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h4>Details</h4>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">House Number</p>
                        </div>

                        <div className="col-6 d-flex">
                          <p className="h6" id="address">
                            {property.address}
                          </p>
                          <i
                            onClick={() => copyText("address")}
                            className="fa fa-clipboard mx-2"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">Location</p>
                        </div>
                        <div className="col-6">
                          <p className="h6"> {property.location} </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">Type</p>
                        </div>
                        <div className="col-6">
                          <p className="h6"> {property.type} </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">Area</p>
                        </div>
                        <div className="col-6">
                          <p className="h6"> {property.area} </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">City</p>
                        </div>
                        <div className="col-6">
                          <p className="h6"> {property.city} </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">Country</p>
                        </div>
                        <div className="col-6">
                          <p className="h6"> {property.country} </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="text-secondary">Owner CNIC</p>
                        </div>
                        <div className="col-6 d-flex">
                          <p className="h6" id="ownerCnic">
                            {" "}
                            {property.ownerCnic}
                          </p>
                          <i
                            onClick={() => copyText("ownerCnic")}
                            className="fa fa-clipboard mx-2"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <h4>Car History</h4>
                  <div className="row">
                    <div className="col-12">
                      <ul className="timeline">
                        {propertyHistory.map((propertyInfo, index) => {
                          return (
                            <li key={index}>
                              <a style={{ color: "#DC3545" }}>
                                Transaction ID: {propertyInfo.TxId.slice(0, 40)}{" "}
                              </a>
                              <a
                                className="float-right"
                                style={{ color: "#DC3545" }}
                              >
                                {" "}
                                {new Date(
                                  propertyInfo.Timestamp
                                ).toLocaleString()}{" "}
                              </a>
                              <p>
                                House Number: {propertyInfo.Value.address}
                                <br />
                                Location: {propertyInfo.Value.location}
                                <br />
                                CNIC: {propertyInfo.Value.ownerCnic}
                                <br />
                                Status:{" "}
                                <span
                                  style={{
                                    color: "white",
                                    background: "black",
                                    padding: "2px",
                                    borderRadius: "7px",
                                  }}
                                >
                                  {propertyInfo.Value.status}
                                </span>
                                <br />
                                Area:
                                {propertyInfo.Value.area}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                      <h4>QR Code:</h4>
                      <img src={url} alt="Property QR code" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;
