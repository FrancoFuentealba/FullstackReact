export function crearLoginRequestDto({ email, clave }) {
  return {
    email: String(email ?? '').trim().toLowerCase(),
    password: String(clave ?? ''),
  };
}

export function crearRegistroRequestDto({ nombre, email, clave }) {
  return {
    nombre: String(nombre ?? '').trim(),
    email: String(email ?? '').trim().toLowerCase(),
    password: String(clave ?? ''),
  };
}
