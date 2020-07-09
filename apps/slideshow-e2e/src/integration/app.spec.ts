import { getH1, getScrollableContainer, getScrollRightBtn} from '../support/app.po';

describe('slideshow', () => {
  beforeEach(() => cy.visit('/'));

  it('should display 2 H1', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file

    getH1().should((h1) => expect(h1.length).equal(2));

    getH1().contains('Popular around you');
    getH1().contains('Featured');

  });

  it('should display 7 Images inside the scrollable container', () => {
    getScrollableContainer().children().should(img => expect(img.length).equal(7))
  });

  it('The last image should NOT be visible', ()=> {
    getScrollableContainer().children().last().should('not.be.visible');
  })

  it('clicking on the right arrow button 2 time should show the last image & hide the first image', () => {
    getScrollableContainer().children().last().should('not.be.visible');
    cy.wait(5000)
    getScrollRightBtn().click()
    cy.wait(500)
    getScrollRightBtn().click()
    cy.wait(500)
    getScrollRightBtn().click()
    getScrollableContainer().children().last().should('be.visible');
    getScrollableContainer().children().first().should('not.be.visible');
  })

  // it('After 5 seconds - each image should have a title AND a location', () => {
  //
  //   cy.wait(5000)
  //   getScrollableContainer().children().each(image => {
  //     image.find('.image-legend .title').should('not.be.empty')
  //   })
  //
  //   getScrollableContainer().children().each(image => {
  //     image.find('.image-legend .location').should('not.be.empty')
  //   })
  // })
});
