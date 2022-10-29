import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Solicitud, Vehiculo} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly solicituds: HasManyRepositoryFactory<Solicitud, typeof Usuario.prototype.id>;

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Usuario, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
    this.solicituds = this.createHasManyRepositoryFactoryFor('solicituds', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicituds', this.solicituds.inclusionResolver);
  }
}
