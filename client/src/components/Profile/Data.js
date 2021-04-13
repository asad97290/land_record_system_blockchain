import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function Data() {
  const [token, setToken] = useState(() =>
    JSON.parse(localStorage.getItem("token"))
  );
  const [pageUrl, setPageUrl] = useState("");
  const [userCnic, setUserCnic] = useState(() =>
    localStorage.getItem("userCnic")
  );
  const [organization, setOrganization] = useState(() =>
    localStorage.getItem("orgName")
  );
  const [properties, setProperties] = useState([]);
  const data = {};
  const [selectedFile, setSelectedFile] = useState({ selected: null });

  if (!token) {
    window.location.pathname = "/signin";
  }

  const url = "http://localhost:4000/channels/mychannel/chaincodes/landRecord";
  const url2 = url + `?args=["${userCnic}"]&fcn=queryLandsByOwner`;

  let conf = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios.get(url2, conf).then((response) => {
      setProperties(response.data.result);
    });
  }, [pageUrl]);

  const singleFileChangedHandler = (event) => {
    setSelectedFile({
      selected: event.target.files[0],
    });
  };

  function singleFileUploadHandler(event) {
    event.preventDefault();
    let data = new FormData();
    if (selectedFile.selected) {
      data.append(
        "profileImage",
        selectedFile.selected,
        selectedFile.selected.name
      );
      axios
        .post("http://localhost:4000/profile-img-upload", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        })
        .then((response) => {
          if (200 === response.status) {
            // If file size is larger than expected.
            if (response.data.error) {
              if ("LIMIT_FILE_SIZE" === response.data.error.code) {
                console.log("LIMIT");
              } else {
                // If not the given file type
                console.log("Response ===> ", response.data);
              }
            } else {
              // Success

              createPropertyAsset(event, response.data.location);
              document.getElementById("address").value = "";
              document.getElementById("type").value = "";
              document.getElementById("location").value = "";
              document.getElementById("area").value = "";
              document.getElementById("city").value = "";
              document.getElementById("country").value = "";
              document.getElementById("propertyImage").value = "";
            }
          }
        })
        .catch((error) => {
          console.log("Error ===> ", error);
        });
    } else {
      // if file not selected throw error
      alert("Please upload file");
    }
  }

  async function checkProperty(address) {
    const url3 = `http://localhost:4000/channels/mychannel/chaincodes/landRecord?args=["${address}"]&fcn=queryLand`;
    const response = await axios.get(url3, conf);
    if (response.data.error) {
      return true;
    }
    if (response.data.result.address.search(address) !== -1) {
      alert("Address already taken. type correct address");
      return false;
    }
  }

  function transferOwnership(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const args = [];
    let counter = 0;
    for (let key of formData.keys()) {
      args.push(formData.get(key));
    }
    if (properties.length === 0) {
      alert("you don't have any land to transfer");
      return;
    }
    properties.forEach((property, index) => {
      if (property.address === args[0]) {
        counter = counter + 1;
        data["fcn"] = "changeLandOwner";
        data["chaincodeName"] = "landRecord";
        data["channelName"] = "mychannel";
        data["args"] = args;
        axios.post(url, data, conf).then(function (response) {
          alert("Successfully transfered car asset");
        });

        document.getElementById("address").value = "";
        document.getElementById("ownerCnic").value = "";
        return;
      }
    });
    if (counter === 0) {
      alert("Wrong address");
      return;
    }
  }

  async function createPropertyAsset(event, loc) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const args = [];
    for (let key of formData.keys()) {
      args.push(formData.get(key));
    }
    if (await checkProperty(args[0])) {
      args.pop();
      args.push(userCnic);
      args.push(loc);
      data["fcn"] = "createLand";
      data["chaincodeName"] = "landRecord";
      data["channelName"] = "mychannel";
      data["args"] = args;
      console.log(data);
      axios
        .post(url, data, conf)
        .then(alert("Success property asset created"))
        .catch((error) => {
          alert(error);
        });

      document.getElementById("address").value = "";
      document.getElementById("location").value = "";
      document.getElementById("type").value = "";
      document.getElementById("area").value = "";
      document.getElementById("city").value = "";
      document.getElementById("country").value = "";
    }
  }

  return (
    <Container className="mb-5 py-5">
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={8} className="order-last order-sm-first py-3">
            <Tab.Content>
              <Tab.Pane eventKey="#link1" className="text-center">
                <h4>My Property(s)</h4>
                <br />
                <div className="container">
                  <div className="row">
                    {properties.map((property, index) => {
                      return (
                        <div key={index} className="col-12 col-md-6 mb-4">
                          <div className="card p-3 d-flex align-content-between flex-wrap">
                            <div className="overflow-hidden px-1 imgThumb bg-black">
                              <img
                                src={property.propertyImage}
                                className="card-img-top mh-100 d-block"
                                alt="..."
                              />
                            </div>
                            <div className="card-body text-left">
                              <h5 className="card-title text-dark font-weight-bold">
                                {property.location} {property.area}{" "}
                                {property.city}
                              </h5>

                              <Link
                                className="btn bg-theme border-theme button-hover"
                                to={{
                                  pathname:
                                    "/property/" +
                                    property.address.replaceAll(" ", "+"),
                                  data: property.address,
                                }}
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2" className="text-center">
                <h4>Asset Creation</h4>
                <Form
                  className="text-left addForm py-4 mb-3"
                  onSubmit={singleFileUploadHandler}
                >
                  <Form.Group>
                    <Form.Label>House Number *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Property Address Here. Don't use '/'"
                      required
                      name="address"
                      id="address"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Location *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Property Location"
                      required
                      name="location"
                      id="location"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Type *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Property Type"
                      required
                      name="type"
                      id="type"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Area *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Property Area in Yards"
                      required
                      name="area"
                      id="area"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>City *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter City of your property"
                      required
                      name="city"
                      id="city"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Country *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Country of Your Property"
                      required
                      name="country"
                      id="country"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Image *</Form.Label>
                    <Form.Control
                      onChange={singleFileChangedHandler}
                      type="file"
                      id="propertyImage"
                      placeholder="Upload Image of Your Property"
                      required
                      name="propertyImage"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-2 bg-theme border-theme button-hover"
                    data-toggle="modal"
                    id="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="#link3" className="text-center">
                <h4>Transfer Ownership</h4>
                <Form
                  className="text-left addForm py-4 mb-3"
                  onSubmit={transferOwnership}
                >
                  <Form.Group>
                    <Form.Label>House Number *</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Property Address Here. Don't use '/'"
                      required
                      name="address"
                      id="address"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>CNIC Of Buyer *</Form.Label>
                    <Form.Control
                      type="text"
                      id="ownerCnic"
                      placeholder="Enter Cnic Without Dashes"
                      required
                      name="ownerCnic"
                      minLength="13"
                      maxLength="13"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-2 bg-theme border-theme button-hover"
                    data-toggle="modal"
                  >
                    Submit
                  </Button>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          <Col sm={4}>
            <h4>Hello, {userCnic} </h4>
            <h6>
              Organization:{" "}
              {organization === "Org1" ? "Development Authority" : "Land Owner"}{" "}
            </h6>
            <br />
            <ListGroup>
              <ListGroup.Item
                action
                href="#link1"
                onClick={() => setPageUrl(window.location.href)}
              >
                My Property(s)
              </ListGroup.Item>
              {organization === "Org1" ? (
                <>
                  <ListGroup.Item action href="#link2">
                    Create Property Record
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link3">
                    Transfer Ownership
                  </ListGroup.Item>
                </>
              ) : (
                <>
                  <ListGroup.Item action href="#link3">
                    Transfer Ownership
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default Data;
