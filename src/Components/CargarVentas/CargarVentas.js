import React, { useMemo, useCallback } from "react";
import Layout from '../Layout/Layout.js';
import { useDropzone } from 'react-dropzone';

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
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
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
          <aside>
            <h4>Archivos</h4>
            <ul>{files}</ul>
          </aside>
        </div>
      </Layout>
    </div>
  );
}

