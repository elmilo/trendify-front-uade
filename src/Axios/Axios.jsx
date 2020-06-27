import axios from "axios";
import dataTopNotificacionesUsuarioResponse from "../Assets/dataTopNotificacionesUsuarioResponse";

let config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

/* #region CONSUMOS */

export const createConsumoMultiple = (rawdata) => {
  return axios
    .post("/createConsumoMultiple/", rawdata, config)
    .then((response) => {
    //console.log(response);
    return response.data;
  });
};

export const getTopConsumos = (idCliente, dia, mes, anio) => {
  return axios
    .get("/getTop15Consumos/" + idCliente + "/" + dia + "/" + mes + "/" + anio, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const getVentasPorDiaPorCategoria = (idCliente) => {
  return axios
    .get("/getVentasPorDiaPorCategoria/" + idCliente, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const getVentasPorDiaPorProducto = (idCliente, idProducto) => {
  return axios
    .get("/getConsumosPorClienteYProducto/" + idCliente + '/' + idProducto, null, config)
    .then((response) => {
      console.log(response);
      return response.data;
  });
};

/* #endregion CONSUMOS */
/* #region USUARIOS */

export const createNuevoUsuario = (rawdata) => {
  return axios
    .post("/nuevoUsuario/", rawdata, config)
    .then((response) => { 
      //console.log(response);
      return response.data;
  });
};

export const createModificarUsuario = (rawdata) => {
  return axios
    .post("/modificarUsuario/", rawdata, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const createEliminarUsuario = (idUsuario) => {
  return axios
    .post("/eliminarUsuario/" + idUsuario, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const getUsuario = (idUsuario) => {
  return axios
    .get("/getUsuario/" + idUsuario, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const getListadoUsuarios = (idCliente) => {
  return axios
    .get("/listadoUsuarios/" + idCliente, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const getTopNotificacionesUsuario = (idUsuario) => {
  return axios
    .get("/getMensajes/" + idUsuario, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const setNotificacionUsuarioLeida = (idNotificacion) => {
  return axios
    .get("/setMensajeLeido/" + idNotificacion, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

/* #endregion USUARIOS */
/* #region CONFIG. NOTIFICACIONES */

export const createNotificacion = (rawdata) => {
  return axios
    .post("/createNotificacion/", rawdata, config)
    .then((response) => {
      return response.data;
  });
};

export const modificarNotificacion = (rawdata) => {
  return axios
    .post("/modificarNotificacion/", rawdata, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const eliminarNotificacion = (idNotificacion) => {
  return axios
    .post("/eliminarNotificacion/" + idNotificacion, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const getNotificacion = (idNotificacion) => {
  return axios
    .get("/getNotificacion/" + idNotificacion, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const getListadoNotificaciones = (idUsuario) => {
  return axios
    .get("/getNotificacionesPorUsuario/" + idUsuario, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const enviarNotificacion = (idNotificacion) => {
  return axios
    .get("/enviarNotificacion/" + idNotificacion, null, config)
    .then((response) => {
      return response.data;
  });
};

export const procesarNotificaciones = (idUsuario) => {
  return axios
    .get("/correrProcesoParaUsuario/" + idUsuario, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

/* #endregion CONFIG. NOTIFICACIONES */
/* #region LOGIN */

export const getLogin = (email, password) => {
  return axios
    .post("/login/", { email: email, pass: password }, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

/* #endregion LOGIN */
/* #region COMMON */

export const getCategorias = () => {
  return axios
    .get("/getCategorias/", null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const getProductosPorCategoria = (categoria) => {
  return axios
    .get("/getProductosPorCategoria/" + categoria, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

/* #endregion COMMON */