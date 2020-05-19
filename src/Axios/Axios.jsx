import axios from "axios";
const TRENDIFY_ENDPOINT = "https://seminario-back.herokuapp.com/app/";

let config = {
  headers: {
    'Content-Type': 'application/json'
  }
}


export const createConsumoMultiple = (rawdata) => {
  return axios
    .post("/createConsumoMultiple/", rawdata, config)
    .then((response) => {
    //console.log("axios response.data " + response.data);
    return response.data;
  });
};


export const getTrendData = (parameter) => {
  /*return axios
      .get(TRENDIFY_ENDPOINT + "/feriados/" + anio)
      .then(response => {
        //console.log("axios response.data " + response.data);
        return response.data;
      });*/
  function createData(time, amount) {
    return { time, amount };
  }
  const response = [
    createData("17/04", Math.floor(Math.random() * parameter)),
    createData("18/04", Math.floor(Math.random() * parameter)),
    createData("19/04", Math.floor(Math.random() * parameter)),
    createData("20/04", Math.floor(Math.random() * parameter)),
    createData("21/04", Math.floor(Math.random() * parameter)),
    createData("22/04", Math.floor(Math.random() * parameter)),
    createData("23/04", Math.floor(Math.random() * parameter)),
    createData("24/04", Math.floor(Math.random() * parameter)),
    createData("25/04", Math.floor(Math.random() * parameter)),
  ];

  return response;
};

export const postExcelData = (ExcelData) => {
  /*const newUserObject = {
        username: newUser.username,
        password: md5(newUser.password),
        email: newUser.email
    };*/

  return axios
    .post(TRENDIFY_ENDPOINT + "DataEndpoint" + ExcelData)
    .then((response) => {
      console.log("axios response.data " + response.data);
      return response.data;
    });
};

