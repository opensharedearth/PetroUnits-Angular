import { Injectable } from '@angular/core';
import { AREA_UNITS } from './def/area';
import { LENGTH_UNITS } from './def/length';
import { MASS_UNITS } from './def/mass';
@Injectable()
export class UnitService {
  getTable(name): Promise<any> {
    if (name === 'area') {
      return Promise.resolve(AREA_UNITS);
    }
    if (name === 'length') {
      return Promise.resolve(LENGTH_UNITS);
    }
    if (name === 'mass') {
      return Promise.resolve(MASS_UNITS);
    }
    return Promise.reject({
      err: 'Not found',
      msg: 'Table reference: ' + name + ', was not found'
    });
  }
  getUnit(category, name) {
    if (category === 'area') {
      return AREA_UNITS.find( unit => unit.name === name );
    }
    if (category === 'length') {
      return LENGTH_UNITS.find( unit => unit.name === name );
    }
    if (category === 'mass') {
      return MASS_UNITS.find( unit => unit.name === name);
    }
  }
}