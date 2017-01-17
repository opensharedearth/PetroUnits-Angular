import { PetroUnitsPage } from './app.po';

describe('petro-units App', function() {
  let page: PetroUnitsPage;

  beforeEach(() => {
    page = new PetroUnitsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
