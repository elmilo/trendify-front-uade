import axios from "axios";
const TRENDIFY_ENDPOINT = "http://nolaborables.com.ar/api/v2/";

export const getDataFeriados = (anio) => {
  return axios.get(TRENDIFY_ENDPOINT + "/feriados/" + anio).then((response) => {
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
    createData("00:00", Math.floor(Math.random() * parameter)),
    createData("03:00", Math.floor(Math.random() * parameter)),
    createData("06:00", Math.floor(Math.random() * parameter)),
    createData("09:00", Math.floor(Math.random() * parameter)),
    createData("12:00", Math.floor(Math.random() * parameter)),
    createData("15:00", Math.floor(Math.random() * parameter)),
    createData("18:00", Math.floor(Math.random() * parameter)),
    createData("21:00", Math.floor(Math.random() * parameter)),
    createData("24:00", Math.floor(Math.random() * parameter)),
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

