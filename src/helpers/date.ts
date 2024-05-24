export function formatDate(dateString:string) {
    const date = new Date(dateString);
  
    // Obtiene el día, mes y año
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-11
    const year = date.getFullYear();
  
    // Formatea la fecha al estilo día/mes/año
    return `${day}/${month}/${year}`;
  }