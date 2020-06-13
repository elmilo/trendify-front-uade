import React from "react";
import Layout from '../Layout/Layout.js';
import TablaArchivos from './TablaArchivos.js';
import TablaProceso from './TablaProceso.js';
import CustomDropZone from "./CustomDropZone.js";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { styled } from '@material-ui/core/styles';
import auth from '../../ProtectedRoutes/auth';
import XLSX from 'xlsx/xlsx';
import { Alert, AlertTitle } from '@material-ui/lab';

import { createConsumoMultiple } from '../../Axios/Axios';

const ImportarButton = styled(Button)({
  'border-radius': '0.2rem !important',
  '& span': {
    padding: '5px !important',
    fontSize: '18px'
  }
});

const VolverButton = styled(Button)({
  'border-radius': '0.2rem !important',
  'margin': '15px 0',
  '& span': {
    padding: '5px !important',
    fontSize: '18px'
  }
});

const ButtonContainer = styled(Container)({
  padding: '15px 0',
  textAlign: 'center'
});

const LoadingProgressBar = styled(LinearProgress)({
  width: '100%',
  marginTop: '20px',
});

export class CargarVentas extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      files: [],
      hasFileRead: false,
      isUploading: false,
      hasUploadResponse: false,
      hasUploadErrors: false,
      uploadResponse: null,
      consumos: []
    }

    this.onDropFile = this.onDropFile.bind(this);
    this.onUploadFiles = this.onUploadFiles.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  addZero = function (anumber) {
    return ((anumber < 10)? ('0' + anumber): anumber);
  };

  formatDate = function (dateInt) {

    if (!isNaN(dateInt)) {
      var date = new Date((dateInt - (25567 + 1)) * 86400 * 1000);
      
      var day = this.addZero(date.getDate());
      var month = this.addZero(date.getMonth() + 1);
      var year = date.getFullYear();

      return day + "/" + month + "/" + year;
    }

    return dateInt;
  }

  onDropFile = function (file) {

    this.setState(prevState => ({
      ...prevState,
      files: [...prevState.files, file]
    }));

    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onabort = () => console.log('file reading was aborted')
    
    reader.onload = (e) => {

      const wb = XLSX.read(e.target.result, { type: rABS ? 'binary' : 'array', bookVBA: true });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      const excludeRows = [0];

      var nuevosConsumos = json.filter((obj, index) => !excludeRows.includes(index)).map((row) => {
        return {
          codigo_barra: row.__EMPTY_1,
          ventas: row.__EMPTY_2,
          fecha: this.formatDate(row.__EMPTY_3),
          stock: row.__EMPTY_4
        };
      });

      this.setState(prevState => ({
        ...prevState,
        consumos: prevState.consumos.concat(nuevosConsumos)
      }));
    }

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    };
  }

  onUploadFiles = function () {

    this.setState(prevState => ({
      ...prevState,
      isUploading: true
    }));

    createConsumoMultiple({ "idCliente": auth.getIdCliente(), "consumos": this.state.consumos })
      .then((dUploadResponse) => {

        this.setState(prevState => ({
          ...prevState,
          isUploading: false,
          hasFileRead: true,
          hasUploadResponse: true,
          uploadResponse: dUploadResponse,
          hasUploadErrors: dUploadResponse.consumos && dUploadResponse.consumos.some((c) => !c.success),
          files: []
        }));

      }).catch(error => {

        this.setState(prevState => ({
          ...prevState,
          isUploading: false,
          hasFileRead: true,
          hasUploadResponse: false,
          uploadResponse: null,
          hasUploadErrors: false,
          files: []
        }));
      });
  }

  clearState = function () {
    this.setState({
      files: [],
      isUploading: false,
      hasFileRead: false,
      hasUploadResponse: false,
      hasUploadErrors: false,
      uploadResponse: null,
      consumos: []
    });
  }

  render() {

    return (
      <div>
        <Layout title="Cargar Ventas">
          <div className="container">

            {!this.state.hasUploadResponse &&
              <div>

                <CustomDropZone onDropFile={this.onDropFile} />

                {this.state.files && this.state.files.length > 0 &&

                  <div>
                    <TablaArchivos files={this.state.files} />

                    {this.state.isUploading && <LoadingProgressBar color="secondary" />}

                    <ButtonContainer maxWidth="lg">

                      {!this.state.isUploading && <ImportarButton variant="contained" color="secondary" fullWidth onClick={this.onUploadFiles}>Importar</ImportarButton>}
                      {this.state.isUploading && <ImportarButton variant="contained" color="secondary" fullWidth disabled>Procesando...</ImportarButton>}

                    </ButtonContainer>
                  </div>
                }
              </div>
            }

            {this.state.hasFileRead && this.state.hasUploadResponse && !this.state.hasUploadErrors &&
              <div>
                <Alert severity="info">
                  <AlertTitle>Importación exitosa! El archivo fue <strong>importado correctamente.</strong></AlertTitle>
                </Alert>
              </div>
            }

            {this.state.hasFileRead && this.state.hasUploadResponse && this.state.hasUploadErrors &&
              <div>
                <Alert severity="error">
                  <AlertTitle>El archivo contiene errores. Por favor, realice las correcciones correspondientes en los siguientes consumos <strong>y vuelva a importarlo!</strong></AlertTitle>
                </Alert>

                <TablaProceso data={this.state.uploadResponse} />
              </div>
            }

            {this.state.hasFileRead && !this.state.hasUploadResponse &&
              <div>
                <Alert severity="error">
                  <AlertTitle>Oops, parece que el archivo está corrupto. No se pudo procesar la información.</AlertTitle>
                </Alert>
              </div>
            }

            {this.state.hasFileRead &&

              <VolverButton variant="contained" color="default" fullWidth onClick={this.clearState}>Volver a Cargar ventas</VolverButton>
            }

          </div>
        </Layout>
      </div>
    );

  }
}

export default (CargarVentas);