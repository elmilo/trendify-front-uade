import React, { useMemo, useCallback } from "react";
import Layout from '../Layout/Layout.js';
import TablaArchivos from './TablaArchivos.js';
import { useDropzone } from 'react-dropzone';
import XLSX from 'xlsx/xlsx';

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

export default function CargarVentas(props) {

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {

      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = (e) => {

        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA: true });

        const sheet = wb.Sheets[wb.SheetNames[0]];

        for (var key in sheet) {
          if (sheet.hasOwnProperty(key) && key.indexOf('!')) {
            console.log(key + " -> " + sheet[key]);
          }
        }
      }

      if (rABS) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsArrayBuffer(file);
      };

    })
  }, [])

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
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

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      <Layout title="Cargar Ventas">
        <div className="container">
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {isDragAccept && (<p>!Todos los archivos serán aceptados!</p>)}
            {isDragReject && (<p>Algunos archivos no tienen el formato permitido.</p>)}
            {!isDragActive && (<p>Arrastrá los archivos aquí, o bien haz click para seleccionarlos...</p>)}
            <p></p>
            <em>(Solo se aceptarán *.xls o bien *.xlsx)</em>
          </div>

          {acceptedFiles.length > 0 && <TablaArchivos files={acceptedFiles}/> }

        </div>
      </Layout>
    </div>
  );
}

