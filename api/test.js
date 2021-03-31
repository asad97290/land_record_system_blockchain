const axios = require("axios");
const url = "http://localhost:4000/channels/mychannel/chaincodes/landRecord";
// let pk = null;
const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTUyNTgwNDEsInVzZXJDbmljIjoiNDIxMDE1Njc0NjU5Iiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE2MTUyMjIwNDF9.3VH1gbUSyavmDg1RdSO6mFctUrBSTGjW6-m3xtZuuC4'
  // let conf = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   },
// };

const register = async () => {
	let d = {
	  userCnic: "421015674659",
	  orgName: "Org1",
	};
	try {
	  let resp = await axios.post("http://localhost:4000/users", d, {
		headers: { "Content-Type": "application/json" },
	  });
	  console.log("-----------------",resp.data);
	} catch (error) {
	  return error;
	}
  };
//   register()

const login = async () => {
  let d = {
    userCnic: "421015674659",
    orgName: "Org1",
	(`-----BEGIN CERTIFICATE-----\nMIIChTCCAiygAwIBAgIUMkXxClaKEIMLY4JlS47cfk1FbygwCgYIKoZIzj0EAwIw\naDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMRQwEgYDVQQK\nEwtIeXBlcmxlZGdlcjEPMA0GA1UECxMGRmFicmljMRkwFwYDVQQDExBmYWJyaWMt\nY2Etc2VydmVyMB4XDTIxMDMwODE2MjAwMFoXDTIyMDMwODE2MjUwMFowSTEwMA0G\nA1UECxMGY2xpZW50MAsGA1UECxMEb3JnMTASBgNVBAsTC2RlcGFydG1lbnQxMRUw\nEwYDVQQDEww0MjEwMTU2NzQ2NTkwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAATo\nOkGzIQxcGm/03sAQmC7GVIeEUbSurE/6lExo9ZfHi9t1KuBRS/Aj50DmTJuepShE\nEzRao6GXBiaRmQC3Oaqao4HSMIHPMA4GA1UdDwEB/wQEAwIHgDAMBgNVHRMBAf8E\nAjAAMB0GA1UdDgQWBBSDukiFj4Y25cgdAbwHivEAEyC0LzAfBgNVHSMEGDAWgBRW\nViyGfectZuB0uwO+Z6sxo6RoEDBvBggqAwQFBgcIAQRjeyJhdHRycyI6eyJoZi5B\nZmZpbGlhdGlvbiI6Im9yZzEuZGVwYXJ0bWVudDEiLCJoZi5FbnJvbGxtZW50SUQi\nOiI0MjEwMTU2NzQ2NTkiLCJoZi5UeXBlIjoiY2xpZW50In19MAoGCCqGSM49BAMC\nA0cAMEQCIHbWaG/Ix0TlWhkSndONYv2eaYl4FTyCJsJXQO0sVYVRAiBgGCmAAVw9\nrwR+gEiSFMNpWYTcCCRDzFvgYZ9hr9DkAQ==\n-----END CERTIFICATE-----\n`) 
}
	try {
    let resp = await axios.post("http://localhost:4000/users/login", d, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("------------",resp.data);
  } catch (error) {
    return error;
  }
};
// login()

const test = async () => {
  let token = await login();
  console.log(token);
};

// test()

const addLands = async (pk) => {


  let data = {
    fcn: "createLand",
    chaincodeName: "landRecord",
    channelName: "mychannel",
    args: ["R-1028 sector 15/A",  "Buffer zone",  "House",  "120 yards",  "Karachi", "Pakistan",  "42101-2696589-3",  "https://carhistorypictures.s3-ap-southeast-1.amazonaws.com/2018_Toyota_Corolla.jpg","created"]
  };

  return axios
    .post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((resp) => {
      console.log(resp.data.result);
    })
    .catch(function (error) {
      console.log(error);
    });
};

addLands();
