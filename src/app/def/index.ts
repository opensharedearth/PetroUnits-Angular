import { AREA_UNITS } from './area';
import { LENGTH_UNITS } from './length';
import { MASS_UNITS } from './mass';
import { VELOCITY_UNITS } from './velocity';
import { OIL_VOLUME_UNITS } from './oil-volume';

export const UNIT_DEFINITIONS = LENGTH_UNITS.concat(
                                MASS_UNITS, 
                                AREA_UNITS,
                                VELOCITY_UNITS,
                                OIL_VOLUME_UNITS);