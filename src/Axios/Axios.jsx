import axios from "axios";
import dataListadoNotifiacionesResponse from "../Assets/dataListadoNotificacionesResponse";
import dataTopNotificacionesUsuarioResponse from "../Assets/dataTopNotificacionesUsuarioResponse";
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

export const createNuevoUsuario = (rawdata) => {
  return axios
    .post("/nuevoUsuario/", rawdata, config)
    .then((response) => { 
      return response.data;
  });
};

export const createModificarUsuario = (rawdata) => {
  return axios
    .post("/modificarUsuario/", rawdata, config)
    .then((response) => {
      return response.data;
  });
};

export const createEliminarUsuario = (idUsuario) => {
  return axios
    .post("/eliminarUsuario/" + idUsuario, null, config)
    .then((response) => {
      return response.data;
  });
};

export const getListadoUsuarios = (idCliente) => {
  return axios
    .get("/listadoUsuarios/" + idCliente, null, config)
    .then((response) => {
      return response.data;
  });
};

export const getListadoNotificaciones = (idCliente) => {
  return axios
    .get("/listadoUsuarios/" + idCliente, null, config)
    .then((response) => {
      return dataListadoNotifiacionesResponse;
  });
};

export const getUsuario = (idUsuario) => {
  return axios
    .get("/getUsuario/" + idUsuario, null, config)
    .then((response) => {
      return response.data;
  });
};

export const getTopNotificacionesUsuario = (idUsuario) => {
  return axios
    .get("/listadoUsuarios/" + idUsuario, null, config)
    .then((response) => {
      return dataTopNotificacionesUsuarioResponse;
  });
};

export const getLogin = (email, password) => {
  return axios
    .post("/login/", { email: email, pass: password }, config)
    .then((response) => {
      return response.data;
  });
};

export const getTopConsumos = (idCliente, dia, mes, anio) => {
  return axios
    .get("/getTop15Consumos/" + idCliente + "/" + dia + "/" + mes + "/" + anio, null, config)
    .then((response) => {
      console.log(response);
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

