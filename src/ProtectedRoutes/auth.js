const auth = {
   isAuthenticated: false,
   authenticate(session, callback) {
       this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('idUsuario', session.id);
      localStorage.setItem('idCliente', session.cliente.idCliente);
      localStorage.setItem('nombre', session.nombre);
      localStorage.setItem('apellido', session.apellido);

      if(callback){
         callback();
      }
   },
   signOut(callback) {
      this.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('idUsuario');
      localStorage.removeItem('idCliente');
      localStorage.removeItem('nombre');
      localStorage.removeItem('apellido');
      
      if(callback){
         callback();
      }
   },
   isConnected() {

      if(!this.getIdUsuario() || !this.getIdCliente())
         return false;

      return localStorage.getItem('isAuthenticated');
   },
   getIdUsuario() {
      return localStorage.getItem('idUsuario');
   },
   getIdCliente() {
      return localStorage.getItem('idCliente');
   },
   getNombre() {
      return localStorage.getItem('nombre');
   },
   getApellido() {
      return localStorage.getItem('apellido');
   },
   getNombreCompleto() {
      return this.getApellido() + ', ' + this.getNombre();
   },
};

export default auth

