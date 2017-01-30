import { ParseService } from './parse.service';

describe('ParseService', () => {
  let service: ParseService;

  beforeEach(() => { service = new ParseService(); });
  
  describe('checkIfValidExpression method', () => {

    it('exists on service', () => {
    expect(typeof service.checkIfValidExpression)
      .toBe("function");
    });

    it('finds invalid chars', () => {
      expect( service.checkIfValidExpression('*&') )
        .not.toBe(true);
    });

    it('accepts valid chars', () => {
      expect( service.checkIfValidExpression('hello') )
        .toBe(true);
      expect( service.checkIfValidExpression('10 cm = miles') )
        .toBe(true);
    });
  });
  

  describe('createRegExp method', () => {

    it('exists on service', () => {
      expect( typeof service.createRegExp ).toBe("function");
    });

    it('return a RegExp object', () => {
      let rx = service.createRegExp('20m = cm');
      console.log(rx);
      expect( rx instanceof RegExp ).toBe(true);
    });
  });

  describe('matchExpression method', () => {
    
    it('returns an Array', () => {
      let match = service.matchExpression;
      let matches = match('10cm');
      expect(Array.isArray(matches)).toBe(true);
      console.log(matches);
      console.log(match('10'));
    });

    it('matches numbers followed by letters', () => {
      let match = service.matchExpression;
      let matches = match('32 miles');
      expect(matches.length > 0).toBe(true);
      console.log(matches);
    });

    it('does not match an expression with only numbers', () => {
      expect(service.matchExpression('30'))
        .toBe(null);
    });

    it('does not match an expression with only letters', () => {
      expect(service.matchExpression('cm'))
        .toBe(null);
    });

    it('matches an expression that has a decimal', () => {
      let matches = service.matchExpression('32.312cm');
      expect(matches.length > 0).toBe(true);
    });

    it('matches units followed by a number representing an exponent', () => {
      let matches = service.matchExpression('34.3mm2');
      expect(matches.length > 0).toBe(true);
      console.log(matches);
    });

  });

});