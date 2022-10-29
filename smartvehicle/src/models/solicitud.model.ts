import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  clienteId: string;

  @property({
    type: 'string',
    required: true,
  })
  vehiculoId: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
  })
  comentarios?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => Vehiculo)
  vehiculos: Vehiculo[];

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
