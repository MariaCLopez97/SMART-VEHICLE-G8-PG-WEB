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
  Vehiculo,
  Solicitud,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoSolicitudController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.vehiculoRepository.solicituds(id).find(filter);
  }

  @post('/vehiculos/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {
            title: 'NewSolicitudInVehiculo',
            exclude: ['id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) solicitud: Omit<Solicitud, 'id'>,
  ): Promise<Solicitud> {
    return this.vehiculoRepository.solicituds(id).create(solicitud);
  }

  @patch('/vehiculos/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Vehiculo.Solicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Partial<Solicitud>,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.vehiculoRepository.solicituds(id).patch(solicitud, where);
  }

  @del('/vehiculos/{id}/solicituds', {
    responses: {
      '200': {
        description: 'Vehiculo.Solicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitud)) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.vehiculoRepository.solicituds(id).delete(where);
  }
}
