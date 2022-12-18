export interface Usuario {
  usuario : string,
  password: string,
  vehiculo: string,
  estado: string,
  id,
  uber:{
    destino: string,
    modelo : string,
    precio: number,
    salida: number,
    patente : string}
}

