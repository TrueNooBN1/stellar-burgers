const ingredientInfoModal = '[data-cy=IngredientDetails]';
const testIngredient = '[data-cy="643d69a5c3f7b9001cfa093c"]';
const testMainIngredient = '[data-cy="643d69a5c3f7b9001cfa0941"]';
const testIngredientName = 'Краторная булка N-200i';
const testMainIngredientName = 'Биокотлета из марсианской Магнолии';
const closeModalButton = '[data-cy=close-modal]';
const topBun = '[data-cy=constructorTopBun]';
const bottomBun = '[data-cy=constructorBottomBun]';
const burgerIngredient = '[data-cy=constructorIngredient]';
const ingredientCategory = '[data-cy=ingredientCategory]';
const orderNumber = 87775;

describe('Тестирование сценария сборки бургера и оформления заказа', function () {

  beforeEach(function () {
    // мокирование запросов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
  });

  describe('Добавление булки в бургер', () => {
    beforeEach(function () {
      cy.visit('localhost:4000/');
    });

    it('Добавление и проверка булки', () => {
      cy.get(testIngredient).contains('Добавить').click();
      cy.get(topBun).should('exist');
      cy.get(bottomBun).should('exist');
    });
  });

  describe('Тестирование модального окна ингредиента', () => {
    beforeEach(function () {
      cy.visit('localhost:4000/');
    });

    it('Открытие модального окна', function () {
      cy.get(ingredientInfoModal).should('not.exist');
      cy.get(testIngredient).click();
      cy.get(ingredientInfoModal).should('exist');
      cy.get(testIngredient).should('exist');
    });

    describe('Закрытие модального окна', function () {
      beforeEach(function () {
        cy.get(testIngredient).click();
        cy.get(ingredientInfoModal).should('exist');
      });

      it('Модальное окно закрывается по клику на кнопку закрыть', function () {
        cy.get(closeModalButton).click();
        cy.get(ingredientInfoModal).should('not.exist');
      });

      it('Модальное окно не закрывается при клике внутри', function () {
        cy.get(ingredientInfoModal).click();
        cy.get(ingredientInfoModal).should('exist');
      });

      it('Модальное окно закрывается по клику на оверлей', function () {
        cy.get('[data-cy=modal]').invoke('hide');
        cy.get('[data-cy=modal-overlay]').should('be.visible').click();
        cy.get(ingredientInfoModal).should('not.exist');
      });
    });
  });

  describe('Тестовое оформление заказа', () => {
    beforeEach(function () {
      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('mockRefreshToken')
      );
      cy.setCookie('accessToken', 'mockAccessToken');
      cy.visit('localhost:4000/');
    });

    afterEach(function () {
      window.localStorage.removeItem('refreshToken');
      cy.clearCookies();
    });

    it('Моковые данные пользователя получены', function () {
      cy.get('[data-cy=userName]').contains('userName');
    });

    it('Заказ происходит корректно', function () {
      cy.get(testIngredient).contains('Добавить').click();
      cy.get(testMainIngredient).contains('Добавить').click();

      cy.get(topBun).contains(testIngredientName).should('exist');
      cy.get(bottomBun).contains(testIngredientName).should('exist');
      cy.get(burgerIngredient).contains(testMainIngredientName).should('exist');

      cy.get('[data-cy=orderButton]').contains('Оформить заказ').click();
      cy.get('[data-cy=orderNumber]').contains(orderNumber).should('exist');

      cy.get(closeModalButton).click();
      cy.get('div').contains(orderNumber).should('not.exist');
    });
  });
});