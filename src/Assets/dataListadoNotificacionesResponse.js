export default {

  notificaciones: [{ 
    id: 1,
    descripcion: 'Lacteos +-10%',
    id_categoria: 1,
    categoria: 'Lacteos',
    id_medio_notificacion: 1,
    medio_notifiacion: 'SMS',
    id_parametro_notifiacion: 1,
    parametro_notifiacion: 'Criterio 1'
  },
  { 
    id: 2,
    descripcion: 'Limpieza +10% en los últimos 4 días',
    id_categoria: 2,
    categoria: 'Limpieza',
    id_medio_notificacion: 2,
    medio_notifiacion: 'Email',
    id_parametro_notifiacion: 2,
    parametro_notifiacion: 'Criterio 2'
  },
  { 
    id: 3,
    descripcion: 'Golosinas -10% en la última semana',
    id_categoria: 3,
    categoria: 'Golosinas',
    id_medio_notificacion: 2,
    medio_notifiacion: 'Email',
    id_parametro_notifiacion: null,
    parametro_notifiacion: 'Criterio Personalizado'
  }]
};
