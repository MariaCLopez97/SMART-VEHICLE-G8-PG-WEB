import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {LLaves} from '../config/llaves';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(@repository(UsuarioRepository)
  public usuarioRepository: UsuarioRepository) { }

  generarClave() {
    const clave = generador(8, false);
    return clave;
  }

  cifrarClave(clave: string) {
    const claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  //Autenticacion
  identificarPersona(usuario: string, clave: string, rol: string) {
    try {
      const p = this.usuarioRepository.findOne({where: {correo: usuario, clave: clave}});
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  generarTokenJWT(usuario: Usuario) {
    const token = jwt.sign({
      data: {
        id: usuario.id,
        correo: usuario.correo,
        nombre: usuario.nombres + " " + usuario.apellidos,
        rol: usuario.rol
      }
    }, LLaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string){
    try {
      let datos = jwt.verify(token, LLaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}
