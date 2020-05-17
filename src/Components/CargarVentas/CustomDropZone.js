import React, { useMemo, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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

export default function CustomDropZone(props) {

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => { 
      props.onDropFile(file) 
    });
  }, [])

  
  const {
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

  return (
    <div {...getRootProps({ style })}>
      <CloudUploadIcon color="primary" fontSize="large" />
      <input {...getInputProps()} />
      {isDragAccept && (<p>!Todos los archivos serán aceptados!</p>)}
      {isDragReject && (<p>Algunos archivos no tienen el formato permitido.</p>)}
      {!isDragActive && (<p>Arrastrá los archivos aquí, o bien haz click para seleccionarlos...</p>)}
      <p></p>
      <em>(Solo se aceptarán *.xls o bien *.xlsx)</em>
    </div>
  );
}

