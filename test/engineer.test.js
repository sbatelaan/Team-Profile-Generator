const Engineer = require('../library/engineer.js');

describe('Todo', () => {
  describe('Initialization', () => {
    // Positive test
    it("should create an object with a 'name' property set to the 'name' argument provided when called with the 'new' keyword", () => {
      // Arrange
      const name = 'stephen';

      // Act
      const obj = new Engineer(name);

      // Assert
      expect(obj.name).toEqual(name);
    });

    it("should create an object with a 'id' property set to the 'id' argument provided when called with the 'new' keyword", () => {
        // Arrange
        const id = '12';
  
        // Act
        const obj = new Engineer('name', id);
  
        // Assert
        expect(obj.id).toEqual(id);
      });

      it("should create an object with a 'email' property set to the 'email' argument provided when called with the 'new' keyword", () => {
        // Arrange
        const email = 'email.email';
  
        // Act
        const obj = new Engineer('name', 'id', email);
  
        // Assert
        expect(obj.email).toEqual(email);
      });

      it("Should create an object with 'github' property set to 'github' argument when  called with 'new' keyword", () => {
        const github = 'github.github';
        const obj = new Engineer('name', 'id', 'email', github )
        expect(obj.github).toEqual(github)
      })
  });
});
