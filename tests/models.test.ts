import { GravityObject, CreateObjectState } from '../src/models/GravityObject';
import { PhysicsEngine } from '../src/physics/PhysicsEngine';

describe('GravityObject Model', () => {
  // Тест создания объекта
  describe('GravityObject creation', () => {
    test('should correctly create a gravity object with all properties', () => {
      const obj: GravityObject = {
        x: 100,
        y: 200,
        vx: 5,
        vy: -3,
        mass: 50,
        color: '#FF0000'
      };
      
      // Проверяем все свойства объекта
      expect(obj.x).toBe(100);
      expect(obj.y).toBe(200);
      expect(obj.vx).toBe(5);
      expect(obj.vy).toBe(-3);
      expect(obj.mass).toBe(50);
      expect(obj.color).toBe('#FF0000');
    });
    
    test('should correctly handle decimal values', () => {
      const obj: GravityObject = {
        x: 100.5,
        y: 200.75,
        vx: 5.25,
        vy: -3.5,
        mass: 50.33,
        color: '#FF0000'
      };
      
      // Проверяем десятичные значения
      expect(obj.x).toBeCloseTo(100.5);
      expect(obj.y).toBeCloseTo(200.75);
      expect(obj.vx).toBeCloseTo(5.25);
      expect(obj.vy).toBeCloseTo(-3.5);
      expect(obj.mass).toBeCloseTo(50.33);
    });
  });
  
  // Тест расчета радиуса объекта
  describe('object radius calculation', () => {
    test('should calculate correct radius based on mass', () => {
      const masses = [10, 25, 50, 100, 200];
      
      // Проверяем расчет радиуса для разных масс
      for (const mass of masses) {
        const obj: GravityObject = {
          x: 0, y: 0, vx: 0, vy: 0, mass, color: '#000000'
        };
        
        const radius = PhysicsEngine.calculateRadius(obj.mass);
        
        // Радиус должен быть положительным числом
        expect(radius).toBeGreaterThan(0);
        
        // Проверяем формулу расчета радиуса (5 + Math.sqrt(mass) / 2)
        const expectedRadius = 5 + Math.sqrt(mass) / 2;
        expect(radius).toBeCloseTo(expectedRadius);
      }
    });
    
    test('should return increasing radius for increasing mass', () => {
      const smallMass = 10;
      const largeMass = 100;
      
      const smallRadius = PhysicsEngine.calculateRadius(smallMass);
      const largeRadius = PhysicsEngine.calculateRadius(largeMass);
      
      // Больший объект должен иметь больший радиус
      expect(largeRadius).toBeGreaterThan(smallRadius);
    });
  });
  
  // Тест интерфейса CreateObjectState
  describe('CreateObjectState', () => {
    test('should correctly initialize CreateObjectState', () => {
      const createState: CreateObjectState = {
        isCreating: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0
      };
      
      // Проверяем все свойства состояния создания
      expect(createState.isCreating).toBe(false);
      expect(createState.startX).toBe(0);
      expect(createState.startY).toBe(0);
      expect(createState.currentX).toBe(0);
      expect(createState.currentY).toBe(0);
    });
    
    test('should correctly update CreateObjectState', () => {
      const createState: CreateObjectState = {
        isCreating: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0
      };
      
      // Обновляем состояние
      createState.isCreating = true;
      createState.startX = 100;
      createState.startY = 200;
      createState.currentX = 150;
      createState.currentY = 250;
      
      // Проверяем обновленное состояние
      expect(createState.isCreating).toBe(true);
      expect(createState.startX).toBe(100);
      expect(createState.startY).toBe(200);
      expect(createState.currentX).toBe(150);
      expect(createState.currentY).toBe(250);
    });
  });
  
  // Тест модификации объекта
  describe('object modifications', () => {
    test('should correctly update object position based on velocity', () => {
      const obj: GravityObject = {
        x: 100,
        y: 200,
        vx: 5,
        vy: -3,
        mass: 50,
        color: '#FF0000'
      };
      
      // Имитируем обновление позиции
      obj.x += obj.vx;
      obj.y += obj.vy;
      
      // Проверяем новую позицию
      expect(obj.x).toBe(105);
      expect(obj.y).toBe(197);
    });
    
    test('should correctly update object velocity', () => {
      const obj: GravityObject = {
        x: 100,
        y: 200,
        vx: 5,
        vy: -3,
        mass: 50,
        color: '#FF0000'
      };
      
      // Имитируем ускорение объекта
      const ax = 0.5;
      const ay = 0.3;
      
      obj.vx += ax;
      obj.vy += ay;
      
      // Проверяем новую скорость
      expect(obj.vx).toBe(5.5);
      expect(obj.vy).toBe(-2.7);
    });
  });
}); 