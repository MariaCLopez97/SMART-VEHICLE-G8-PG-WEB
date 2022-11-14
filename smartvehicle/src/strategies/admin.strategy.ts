import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services/autenticacion.service';


export class EstrategiaAdministrador implements AuthenticationStrategy {
  name: string = 'admin';

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) {

  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
      if (datos) {
        if (datos.data.rol == 'admin' ) {
          let perfil: UserProfile = Object.assign({
            rol: datos.data.rol
          });
          return perfil;
        } else {
          throw new HttpErrors[401]("Rol sin acceso");
        }
      } else {
        throw new HttpErrors[401]("token inválido");
      }
    } else {
      throw new HttpErrors[401]("No hay token en la petición");
    }
  }
}
