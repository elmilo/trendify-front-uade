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
    .get("/listadoUsuarios/" + idUsuario, null, config)
    .then((response) => {
      //console.log(response);
      return dataTopNotificacionesUsuarioResponse;
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
  console.log(rawdata);
  return axios
    .post("/modificarNotificacion/", rawdata, config)
    .then((response) => {
      console.log(response);
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

export const enviarNotificacion = (rawdata) => {
  return axios
    .get("/getNotificacionesPorUsuario/" + rawdata.idUsuario, null, config)
    .then((response) => {
      //console.log(response);
      return response.data;
  });
};

export const procesarNotificaciones = (idUsuario) => {
  return axios
    .get("/getNotificacionesPorUsuario/" + idUsuario, null, config)
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

/* #endregion COMMON */

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

export const getProductosPorCategoria = (parameter) => {
  

  

  return [
    {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
  ];
};

