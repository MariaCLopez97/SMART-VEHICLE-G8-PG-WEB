import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  Usuario,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudUsuarioController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Usuario> {
    return this.solicitudRepository.usuario(id);
  }
}
