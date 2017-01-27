export class ConversionExpression {
  fullTextFromInput?:string;
  inputUnit?: string;
  inputUnitSelect?: string;
  inputValue?: number;
  outputUnit?: string;
  outputUnitSelect?: string;
  outputValue?: number;
  error?: Error;
  constructor(obj?){
    if (obj) {
      this.fullTextFromInput = obj.fullTextFromInput;
      this.inputValue = obj.inputValue;
      this.inputUnit = obj.inputUnit;
      this.inputUnitSelect = obj.inputUnitSelect;
      this.outputUnit = obj.outputUnit;
      this.outputUnitSelect = obj.outputUnitSelect;
    }
  }
  get selectedInput() {
    if (this.inputUnitSelect) {
      return this.inputUnitSelect;
    }
    return this.inputUnit;
  }
  get selectedOutput() {
    if (this.outputUnitSelect) {
      return this.outputUnitSelect;
    }
    return this.outputUnit;
  }
}
export class UnitDefinition {
  name: string;
  baseUnit: string;
  baseValue: number;
}
export interface CalculationResult {
  value?: number;
  isValid?: boolean;
  error?: Error;
}
export interface Error {
  name: string;
  message: string;
}