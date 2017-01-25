import { Component, OnInit } from '@angular/core';
import { 
  Router, 
  ActivatedRoute, 
  Params, 
  NavigationExtras 
} from '@angular/router';

import { 
  ConversionExpression, 
  UnitDefinition,
  CalculationResult,
  Error 
} from './conversion.model';

import { ParseService } from './parse.service';
import { ConversionService } from './conversion.service';

@Component({
  selector: 'pe-converter',
  templateUrl: './converter.component.html',
  styles: [`
    a {
      cursor: pointer;
    }
    .results {
      font-size: 36px;
      text-align: center;
    }
    .status {
      padding-top: 12px;
    }
    #input-defs, #output-defs {
      max-height: 200px;
      overflow: auto;
    }
    .well { 
      padding: 6px;
    }
    .list-group {
      margin-bottom: 0;
    }
  `]
})
export class ConverterComponent implements OnInit { 
  exp: string;
  exp1: string;
  exp2: string;
  num1: number;
  unit1: string;

  calcResult: CalculationResult;

  filteredInputDefinitions: UnitDefinition[];
  filteredOutputDefinitions: UnitDefinition[];
  queryParams;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private parseService: ParseService,
    private conversionService: ConversionService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe( (q: Params) => {
      // need a copy, not a reference - otherwise will receive errors
      //   when setting props
      let exp: ConversionExpression, copy = Object.assign({}, q);
      this.queryParams = copy;
      exp = new ConversionExpression(copy);
      // filter definitions based on q-params grabbed from input field
      if (exp.inputUnit) {
        this.filteredInputDefinitions = 
          this.conversionService.filterInputDefinitions(exp.inputUnit);
      }
      if (exp.outputUnit) {
        this.filteredOutputDefinitions = 
          this.conversionService.filterOutputDefinitions(exp.outputUnit);
      }
      
      this.calcResult = this.conversionService.calculateExpression(exp);
    });
  }
 

  checkIfValid(expression) {
    //TODO alert user to invalid input
    if ( /[\/\\|<>!@#$%^&*();~`+_\-]/.test(expression) ) {
      console.log('Invalid filter');
      return false;
    }
    return true;
  }

  parseExpression(expression) {
    // if no change to text field value then return
    //   fixed issue 1
    if (this.exp === expression) {
      return;
    }
    let cTest = this.parseService.evaluateExpression(expression);
    console.log(cTest);
    this.updateQParamsFromExpression(cTest);

  //   // Check for invalid input
  //   if ( ! this.checkIfValid(expression) ) {
  //     return;
  //   }

  //   let matches: any[];

    

  //   this.exp = expression;

  //   if ( /=/.test(expression) ) {
  //     [ this.exp1, this.exp2 ] = expression.split('=');
  //     this.updateQueryParams('outputUnit', this.exp2.trim() );
  //     // clear active selection in def list
  //     //   when input is updated
  //     this.clearParam('outputUnitSelect');
  //   } else {
  //     this.exp1 = expression;
  //     this.exp2 = null;
  //     this.num1 = null;
  //     this.unit1 = null;
  //   }

  //   matches = evaluateExpression(this.exp1);
    
  //   if (matches && matches.length > 1) {
  //     this.num1 = matches[1];
  //     this.updateQueryParams('inputValue', this.num1);
  //   }
  //   if (matches && matches.length > 2) {
  //     this.unit1 = matches[2].trim();
  //     this.updateQueryParams('inputUnit', this.unit1);

  //     // clear active selection in def list
  //     //   when input is updated
  //     this.clearParam('inputUnitSelect');
  //   } 
    
  //   // TODO if not matches, give tips to user
    
  //   function evaluateExpression(exp) {
  //     return /(^[0-9]+)([A-Za-z]+[0-9]?|\s[A-Za-z]+[0-9]?)/.exec(exp);
  //   }
  }
  updateQParamsFromExpression(exp: ConversionExpression):void {
    // all q-params apply to conversion calc
    //  therefore, any change should clear previous calc
    //  in case new calc is not possible bc of incomplete input
    this.calcResult = null;
    // Setup params
    let navExtras: NavigationExtras = {
      queryParams: {
        inputValue: exp.inputValue,
        inputUnit: exp.inputUnit,
        inputUnitSelect: exp.inputUnitSelect,
        outputUnit: exp.outputUnit,
        outputUnitSelect: exp.outputUnitSelect
      }
    };
    // apply updated q-params to router
    this.router.navigate(['convert'], navExtras);
  }

  updateQueryParams(key, unit) {
    // all q-params apply to conversion calc
    //  therefore, any change should clear previous calc
    //  in case new calc is not possible bc of incomplete input
    this.calcResult = null;
    // update local copy of q-params
    this.queryParams[key] = unit;
    let navExtras: NavigationExtras = {
      queryParams: this.queryParams
    };
    // apply updated q-params to router
    this.router.navigate(['convert'], navExtras);

    if (key === 'outputUnitSelect' || key === 'inputUnitSelect') {
      this.updateUnits(key);
    }
  }
  updateUnits(key: string) {
    let q = this.queryParams;
    if (key === 'inputUnitSelect') {
      this.unit1 = q[key];
      return;
    }
    this.exp2 = q[key];
  }
  clearParam(key) {
    let q = this.queryParams;
    if (q[key]) {
      q[key] = null;
    }
  }
  
  isUnitSelected(unit: string, type: string) {
    // sets active first match from input expression,
    // or else if list-group-item is clicked, overrides selection
    let q = this.queryParams;
    if (q && q[type + 'Select']) {
      if (unit === q[type + 'Select']) {
        return true;
      } else {
        return false;
      }
    } 
    if (q) {
      return unit === q[type];
    }
    return false;
  }
  
}