import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Usuario,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoUsuarioController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Usuario> {
    return this.vehiculoRepository.usuario(id);
  }
}
