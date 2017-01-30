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
      cExp.inputUnit = lhsMatches[2].trim();
      cExp.inputValue = parseFloat(lhsMatches[1]);
    }
    return cExp;
  }
  matchExpression(expression: string) {
    return /(^[0-9]+\.?[0-9]*)(\s*[A-Za-z]+)([0-9]?)\/?([A-Za-z]*)([0-9]?)/.exec(expression);
  }
}