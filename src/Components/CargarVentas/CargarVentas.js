import React, { useState, useMemo, useCallback } from "react";
import Layout from '../Layout/Layout.js';
import TablaArchivos from './TablaArchivos.js';
import TablaProceso from './TablaProceso.js';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import XLSX from 'xlsx/xlsx';
import dataUploadResponse from "../../Assets/dataUploadResponse";
import dataUploadResponseError from "../../Assets/dataUploadResponseError";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { Link } from "react-router-dom";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    padding: '15px 0',
    textAlign: 'center'
  },
  uploadButton: {
    'border-radius': '0.2rem !important',
    'margin': '0 3px',
    '& span': {
      padding: '5px !important',
      fontSize: '18px'
    }
  },
  progressBar: {
    width: '100%',
    marginTop: '20px',
  }
}));

export default function CargarVentas(props) {

  const [isUploading, setIsUploading] = useState(false);
  const [hasUploadResponse, setHasUploadResponse] = useState(false);
  const [hasUploadErrors, setHasUploadErrors] = useState(false);
  const [uploadResponse, setUploadResponse] = useState({});
  const [consumos, setConsumos] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {

    acceptedFiles.forEach((file) => {

      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = (e) => {

        const wb = XLSX.read(e.target.result, { type: rABS ? 'binary' : 'array', bookVBA: true });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);

        const excludeRows = [0];

        var nuevosConsumos = json.filter((obj, index) => !excludeRows.includes(index)).map((row) => {
          return {
            codigo_barra: row.__EMPTY_1,
            ventas: row.__EMPTY_2,
            fecha: row.__EMPTY_3,
            stock: row.__EMPTY_4
          };
        });

        setConsumos(prevConsumos => prevConsumos.concat(nuevosConsumos));
      }

      if (rABS) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsArrayBuffer(file);
      };
    })
  }, [])

  const onUpload = function () {

    setIsUploading(true);

    //Simula la pegada a la API
    setTimeout(() => {

      var dUploadResponse = dataUploadResponseError; //Simula la respuesta enviada por la API

      setIsUploading(false);
      setHasUploadResponse(true);
      setUploadResponse(dUploadResponse);
      setHasUploadErrors(dUploadResponse.consumos && dUploadResponse.consumos.some((c) => !c.success));
      
      acceptedFiles.length = 0;
      acceptedFiles.splice(0, acceptedFiles.length);

      if (inputRef && inputRef.current) {
        inputRef.current.value = '';
      }

    }, 3000);
  }

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    inputRef
  } = useDropzone({ accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', noKeyboard: true, onDrop });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const clearState = function() {
    setIsUploading(false);
    setHasUploadErrors(false);
    setHasUploadResponse(false);
    setUploadResponse({});
    setConsumos([]);
  }

  const classes = useStyles();

  return (
    <div>
      <Layout title="Cargar Ventas">
        <div className="container">
          
          {!hasUploadResponse &&
            <div>
              <div {...getRootProps({ style })}>
                <CloudUploadIcon color="primary" fontSize="large" />
                <input {...getInputProps()} />
                {isDragAccept && (<p>!Todos los archivos serán aceptados!</p>)}
                {isDragReject && (<p>Algunos archivos no tienen el formato permitido.</p>)}
                {!isDragActive && (<p>Arrastrá los archivos aquí, o bien haz click para seleccionarlos...</p>)}
                <p></p>
                <em>(Solo se aceptarán *.xls o bien *.xlsx)</em>
              </div>

              {acceptedFiles.length > 0 &&

                <div>
                  <TablaArchivos files={acceptedFiles} />

                  {isUploading && <LinearProgress color="secondary" className={classes.progressBar} />}

                  <Container maxWidth="lg" className={classes.buttonContainer}>

                    {!isUploading && <Button variant="contained" className={classes.uploadButton} color="secondary" fullWidth={true} onClick={onUpload}>Importar</Button>}
                    {isUploading && <Button variant="contained" className={classes.uploadButton} color="secondary" fullWidth={true} disabled>Procesando...</Button>}

                  </Container>
                </div>
              }
            </div>
          }

          {hasUploadResponse && !hasUploadErrors &&
              <div>
                <Container maxWidth="lg">
                  <Card className={classes.root}>
                    <CardHeader title="Los archivos fueron importados correctamente." />
                  </Card>
                </Container>
              </div>
          }

          {hasUploadResponse && hasUploadErrors &&

              <div>
                <Container maxWidth="lg">
                  <Card className={classes.root}>
                    <CardHeader title="Alguno de los archivos contiene consumos con errores. Por favor, realice las correcciones correspondiente y vuelva a importarlo." />
                  </Card>
                </Container>

                <TablaProceso data={uploadResponse}/>

                <Button component={Link} to="/cargarVentas" variant="contained" color="default" fullWidth="true" className={classes.nextLevelButton} onClick={clearState}>Volver a Cargar ventas</Button>

              </div> 
          }

        </div>
      </Layout>
    </div>
  );
}

