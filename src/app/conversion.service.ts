import { Injectable } from '@angular/core';
import { 
  UnitDefinition, 
  ConversionExpression,
  CalculationResult,
  Error 
} from './conversion.model';

import { ParseService } from './parse.service';
import { UNIT_DEFINITIONS } from './def';
@Injectable()
export class ConversionService {
  definitions: UnitDefinition[] = UNIT_DEFINITIONS;
  filteredInputDefinitions: UnitDefinition[];
  filteredOutputDefinitions: UnitDefinition[];
  constructor(private parseService: ParseService) {}

  findUnitDefinition(unit_type: string, from_list: string): UnitDefinition {
    return;
  }
  filterDefinitions(filter: string): UnitDefinition[] {
    let rx: RegExp = this.parseService.createRegExp(filter); 
    if (!rx) {
      return null;
    }
    return this.definitions.filter( (def: UnitDefinition) => {
      return rx.test(def.name);
    });
  }
  filterInputDefinitions(filter: string): UnitDefinition[] {
    this.filteredInputDefinitions = this.filterDefinitions(filter);
    return this.filteredInputDefinitions;
  }
  filterOutputDefinitions(filter: string): UnitDefinition[] {
    this.filteredOutputDefinitions = this.filterDefinitions(filter);
    return this.filteredOutputDefinitions;
  }
  isCompleteExpression(q: ConversionExpression): boolean {
    if (q.inputUnit && q.inputValue && q.outputUnit) {
      return true;
    }
    return false;
  }
  calculateExpression(q: ConversionExpression): CalculationResult {
    let selectedInputDefinition: UnitDefinition, selectedOutputDefinition: UnitDefinition;
    let calcResult: CalculationResult = {};
    if ( ! this.isCompleteExpression(q) ) {
      calcResult.isValid = false;
      return calcResult;
    }

    // find the unit definitions
    selectedInputDefinition = this.filteredInputDefinitions.find( def => {
      return def.name === q.selectedInput;
    });
    selectedOutputDefinition = this.filteredOutputDefinitions.find( def => {
      return def.name === q.selectedOutput;
    });
    // verify definition matches were found 
    if (!selectedInputDefinition || !selectedOutputDefinition) {
      calcResult.isValid = false;
      calcResult.error = {
        name: 'Missing definition',
        message: 'One or more unit definitions has not been found.'
      }
      return calcResult;
    }
    // check to see if base units match
    if(selectedInputDefinition.baseUnit !== selectedOutputDefinition.baseUnit) {
      calcResult.isValid = false;
      calcResult.error = {
        name: 'Unit domains do not match',
        message: 'Select units in the same domain.'
      }
      return calcResult;
    }

    calcResult.value = q.inputValue * selectedInputDefinition.baseValue 
                   / selectedOutputDefinition.baseValue;
    calcResult.isValid = true;
    return calcResult;
  }
}