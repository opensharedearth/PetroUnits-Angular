import { Injectable } from '@angular/core';
import { 
  UnitDefinition,
  ConversionExpression,
  Error
} from './conversion.model';
@Injectable()
export class ParseService {
  checkIfValidExpression(expression): boolean {
    if ( /[\\|<>!@#$%^&*();~`+_\-]/.test(expression) ) {
      return false;
    }
    return true;
  }
  createRegExp(term: string): RegExp {
    if ( ! this.checkIfValidExpression(term) ) {
      return null;
    }
    return new RegExp(term);
  }
  evaluateExpression(expression: string): ConversionExpression {
    let cExp = new ConversionExpression();
    let lhs, rhs, lhsMatches;
    cExp.fullTextFromInput = expression;
    if ( ! this.checkIfValidExpression(expression) ) {
      cExp.error = {
        name: 'Invalid characters in input field',
        message: 'Please use only alphanumeric values and equals when typing your expression in the input field.'
      }
      return cExp;
    }

    if ( /=/.test(expression) ) {
      [ lhs, rhs ] = expression.split('=');
      cExp.outputUnit = rhs.trim();
    } else {
      return cExp;
    }

    lhsMatches = this.matchExpression(lhs);
    console.log(lhsMatches);
    if (lhsMatches) {
      cExp.inputUnit = this.evaluateInputUnit(lhsMatches).trim();
      
      cExp.inputValue = parseFloat(lhsMatches[1]);
    }
    console.log(cExp);
    return cExp;
  }
  evaluateInputUnit( matches: string[] ){
    // matches[2] - unit e.g. cm
    // matches[3] - exponent e.g. 2 in cm2
    // matches[4] - divisor unit e.g s in 30m/s2
    // matches[5] - exponent of divisor unit e.g. 2 in 30m/s2
    let exponent: string = '';
    if (matches[3]) {
      exponent = this.encodeExponentUnit(matches[3]);
    }
    // todo parse other matches 
    return matches[2] + exponent + matches[4] + matches[5];
  }
  encodeExponentUnit(exponent: string): string {
    const SQUARE = 2, CUBE = 3;
    let encodedExponent: string;
    console.log(exponent);
    if ( +exponent === SQUARE ) {
      encodedExponent = String.fromCharCode(178);
    }
    if ( +exponent === CUBE ) {
      encodedExponent = String.fromCharCode(179);
    }
    return encodedExponent;
  }
  matchExpression(expression: string) {
    return /(^[0-9]+\.?[0-9]*)(\s*[A-Za-z]+)([0-9]?)\/?([A-Za-z]*)([0-9]?)/.exec(expression);
  }
}