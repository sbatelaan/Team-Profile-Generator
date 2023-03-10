const Employee = require('../library/employee.js');

describe('Todo', () => {
  describe('Initialization', () => {
    // Positive test
    it("should create an object with a 'name' property set to the 'name' argument provided when called with the 'new' keyword", () => {
      // Arrange
      const name = 'stephen';

      // Act
      const obj = new Employee(name);

      // Assert
      expect(obj.name).toEqual(name);
    });

    it("should create an object with a 'id' property set to the 'id' argument provided when called with the 'new' keyword", () => {
        // Arrange
        const id = '12';
  
        // Act
        const obj = new Employee('name', id);
  
        // Assert
        expect(obj.id).toEqual(id);
      });

      it("should create an object with a 'email' property set to the 'email' argument provided when called with the 'new' keyword", () => {
        // Arrange
        const email = 'email.email';
  
        // Act
        const obj = new Employee('name', 'id', email);
  
        // Assert
        expect(obj.email).toEqual(email);
      });
  });
});
