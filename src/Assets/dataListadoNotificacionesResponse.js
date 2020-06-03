export default {

  notificaciones: [{ 
    id: 1,
    descripcion: 'Lacteos +-10%',
    id_categoria: 1,
    categoria: 'Lacteos',
    id_medio_notificacion: 1,
    medio_notificacion: 'SMS',
    id_criterioNotificacion: 'criterio01',
    criterio_notificacion: 'Delta de 10% en los últimos 2 días, ventana de 15 días'
  },
  { 
    id: 2,
    descripcion: 'Limpieza +15% en los últimos 4 días',
    id_categoria: 2,
    categoria: 'Limpieza',
    id_medio_notificacion: 2,
    medio_notificacion: 'Email',
    id_criterioNotificacion: 'criterio02',
    criterio_notificacion: 'Delta de 15% en los últimos 4 días, ventana de 20 días'
  },
  { 
    id: 3,
    descripcion: 'Golosinas -400u en la última semana',
    id_categoria: 3,
    categoria: 'Golosinas',
    id_medio_notificacion: 2,
    medio_notificacion: 'Email',
    id_criterioNotificacion: 'criterio03',
    criterio_notificacion: 'Personalizado',
    diasObservacion_criterio03: 7,
    modificador_criterio03: 2,
    cantProductos_criterio03: 400
  }]
};
