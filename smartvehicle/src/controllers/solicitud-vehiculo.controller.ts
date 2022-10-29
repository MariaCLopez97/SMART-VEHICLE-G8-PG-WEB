import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Solicitud,
  Vehiculo,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudVehiculoController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.solicitudRepository.vehiculos(id).find(filter);
  }

  @post('/solicituds/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInSolicitud',
            exclude: ['id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'id'>,
  ): Promise<Vehiculo> {
    return this.solicitudRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/solicituds/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Solicitud.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.solicitudRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/solicituds/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Solicitud.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.solicitudRepository.vehiculos(id).delete(where);
  }
}
