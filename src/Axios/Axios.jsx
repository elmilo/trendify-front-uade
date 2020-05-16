import axios from "axios";
const TRENDIFY_ENDPOINT = "http://localhost:3001/api/";

const instance = axios.create({
    baseURL: TRENDIFY_ENDPOINT,
    //Solo sin son necesarios
    /*headers: {
    }*/
});

export default {
    postExcelData: (ExcelData) =>
    instance({
        'method': 'POST',
        'url':'/query',
        'data': ExcelData,
        'headers': { 'content-type':'application/json'},
    }),
    getData: (symbol) =>
    instance({
        'method':'GET',
        'url':'/query',
        'params': {
            'search':'parameter',
            'symbol': symbol.toUpperCase()
        },
        transformResponse: [function (data) {
            //Transformar respuesta, por si se quiere algo.
            // Do whatever you want to transform the data
            console.log('Transforming data...')
            const json = JSON.parse(data)
            // list of nested object keys
            const dates = Object.keys(json['nested object'])
            data = {
                dates
            }
            return data;
        }],
    }),
}


/*
import Axios as api from '../Axios/Axios'
api.postExcelData(myExcelData)               
        .then((response)=>{
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })

*/