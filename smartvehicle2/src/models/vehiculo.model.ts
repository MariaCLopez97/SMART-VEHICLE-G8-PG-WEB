import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';
import {Usuario} from './usuario.model';

@model()
export class Vehiculo extends Entity {
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
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoOferta: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  asesorId: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreEncargado: string;

  @property({
    type: 'string',
    required: true,
  })
  correoEncargado: string;

  @property({
    type: 'string',
    required: true,
  })
  celularEncargado: string;

  @hasMany(() => Solicitud)
  solicituds: Solicitud[];

  @property({
    type: 'string',
  })
  solicitudId?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
