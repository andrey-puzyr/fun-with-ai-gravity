import { PhysicsEngine } from '../src/physics/PhysicsEngine';
import { GravityObject } from '../src/models/GravityObject';

describe('PhysicsEngine Core', () => {
  // Тест 1: Инициализация PhysicsEngine
  describe('initialization', () => {
    test('should have correct default constants', () => {
      // Проверяем значения констант
      expect(PhysicsEngine.DEFAULT_G).toBe(0.5);
      expect(PhysicsEngine.DEFAULT_MIN_DISTANCE).toBe(20);
    });

    test('should initialize with default parameters', () => {
      const physics = new PhysicsEngine();
      // Проверяем, что объект создан
      expect(physics).toBeDefined();
    });

    test('should initialize with custom parameters', () => {
      const customG = 1.0;
      const customMinDistance = 30;
      const physics = new PhysicsEngine(customG, customMinDistance);
      expect(physics).toBeDefined();
    });
  });

  // Тест 2: Гравитационное взаимодействие двух объектов
  describe('gravitational interaction between two objects', () => {
    test('should correctly calculate gravitational force', () => {
      const physics = new PhysicsEngine(1.0, 10); // G = 1 для упрощения расчетов
      
      // Создаем два объекта на расстоянии 100 единиц друг от друга
      const obj1: GravityObject = {
        x: 0, y: 0, vx: 0, vy: 0, mass: 100, color: 'red'
      };
      
      const obj2: GravityObject = {
        x: 100, y: 0, vx: 0, vy: 0, mass: 100, color: 'blue'
      };
      
      const objects = [obj1, obj2];
      
      // Применяем только расчет гравитационных сил, без обновления позиций
      physics.calculateGravitationalForces(objects);
      
      // Проверяем, что скорости изменились в соответствии с законом гравитации
      // F = G * m1 * m2 / r^2 = 1 * 100 * 100 / 100^2 = 1
      // a1 = F / m1 = 1 / 100 = 0.01
      // a2 = F / m2 = 1 / 100 = 0.01
      expect(obj1.vx).toBeCloseTo(0.01);
      expect(obj1.vy).toBeCloseTo(0);
      expect(obj2.vx).toBeCloseTo(-0.01);
      expect(obj2.vy).toBeCloseTo(0);
    });

    test('should respect Newton\'s third law (equal and opposite forces)', () => {
      const physics = new PhysicsEngine(1.0, 10);
      
      const obj1: GravityObject = {
        x: 0, y: 0, vx: 0, vy: 0, mass: 100, color: 'red'
      };
      
      const obj2: GravityObject = {
        x: 0, y: 100, vx: 0, vy: 0, mass: 200, color: 'blue'
      };
      
      const objects = [obj1, obj2];
      
      // Применяем только расчет гравитационных сил
      physics.calculateGravitationalForces(objects);
      
      // Проверяем, что импульсы равны по модулю и противоположны по направлению
      // p1 = m1 * v1 = 100 * vy1
      // p2 = m2 * v2 = 200 * vy2
      // Должно быть: p1 = -p2, т.е. 100 * vy1 = -200 * vy2
      expect(100 * obj1.vy).toBeCloseTo(-200 * obj2.vy);
    });

    test('should calculate force inversely proportional to square of distance', () => {
      const physics = new PhysicsEngine(1.0, 10);
      
      // Тест на расстоянии 100
      const obj1Distance100: GravityObject = {
        x: 0, y: 0, vx: 0, vy: 0, mass: 100, color: 'red'
      };
      
      const obj2Distance100: GravityObject = {
        x: 100, y: 0, vx: 0, vy: 0, mass: 100, color: 'blue'
      };
      
      const objectsDistance100 = [obj1Distance100, obj2Distance100];
      physics.calculateGravitationalForces(objectsDistance100);
      
      // Тест на расстоянии 200 (в 2 раза больше)
      const obj1Distance200: GravityObject = {
        x: 0, y: 0, vx: 0, vy: 0, mass: 100, color: 'red'
      };
      
      const obj2Distance200: GravityObject = {
        x: 200, y: 0, vx: 0, vy: 0, mass: 100, color: 'blue'
      };
      
      const objectsDistance200 = [obj1Distance200, obj2Distance200];
      physics.calculateGravitationalForces(objectsDistance200);
      
      // Сила должна быть в 4 раза меньше при удвоении расстояния
      // F ~ 1/r^2, поэтому F(200) = F(100) / 4
      expect(obj1Distance200.vx).toBeCloseTo(obj1Distance100.vx / 4);
    });

    test('should calculate force proportional to product of masses', () => {
      const physics = new PhysicsEngine(1.0, 10);
      
      // Тест с массами 100 и 100
      const obj1Mass100: GravityObject = {
        x: 0, y: 0, vx: 0, vy: 0, mass: 100, color: 'red'
      };
      
      const obj2Mass100: GravityObject = {
        x: 100, y: 0, vx: 0, vy: 0, mass: 100, color: 'blue'
      };
      
      const objectsMass100 = [obj1Mass100, obj2Mass100];
      physics.calculateGravitationalForces(objectsMass100);
      
      // Тест с массами 100 и 200 (в 2 раза больше)
      const obj1Mass200: GravityObject = {
        x: 0, y: 0, vx: 0, vy: 0, mass: 100, color: 'red'
      };
      
      const obj2Mass200: GravityObject = {
        x: 100, y: 0, vx: 0, vy: 0, mass: 200, color: 'blue'
      };
      
      const objectsMass200 = [obj1Mass200, obj2Mass200];
      physics.calculateGravitationalForces(objectsMass200);
      
      // Сила должна быть в 2 раза больше при удвоении массы
      // F ~ m1 * m2, поэтому F(m2=200) = F(m2=100) * 2
      expect(obj1Mass200.vx).toBeCloseTo(obj1Mass100.vx * 2);
    });
  });

  // Тест 3: Минимальное расстояние
  describe('minimum distance threshold', () => {
    test('should not apply gravity when distance is less than MIN_DISTANCE', () => {
      const minDistance = 20;
      const physics = new PhysicsEngine(1.0, minDistance);
      
      // Объекты на расстоянии меньше минимального
      const obj1: GravityObject = {
        x: 0, y: 0, vx: 0, vy: 0, mass: 100, color: 'red'
      };
      
      const obj2: GravityObject = {
        x: minDistance - 1, y: 0, vx: 0, vy: 0, mass: 100, color: 'blue'
      };
      
      const objects = [obj1, obj2];
      
      physics.calculateGravitationalForces(objects);
      
      // Скорости не должны измениться
      expect(obj1.vx).toEqual(0);
      expect(obj1.vy).toEqual(0);
      expect(obj2.vx).toEqual(0);
      expect(obj2.vy).toEqual(0);
    });

    test('should apply gravity when distance is exactly at MIN_DISTANCE', () => {
      const minDistance = 20;
      const physics = new PhysicsEngine(1.0, minDistance);
      
      // Объекты на минимальном расстоянии
      const obj1: GravityObject = {
        x: 0, y: 0, vx: 0, vy: 0, mass: 100, color: 'red'
      };
      
      const obj2: GravityObject = {
        x: minDistance, y: 0, vx: 0, vy: 0, mass: 100, color: 'blue'
      };
      
      const objects = [obj1, obj2];
      
      physics.calculateGravitationalForces(objects);
      
      // Скорости должны измениться
      expect(obj1.vx).not.toBe(0);
      expect(obj2.vx).not.toBe(0);
    });
  });

  // Тест для методов включения/отключения коллизий
  describe('collision settings', () => {
    test('should have collisions enabled by default', () => {
      const physics = new PhysicsEngine();
      expect(physics.getCollisionsEnabled()).toBe(true);
    });
    
    test('should correctly toggle collisions', () => {
      const physics = new PhysicsEngine();
      
      // Изначально коллизии включены
      expect(physics.getCollisionsEnabled()).toBe(true);
      
      // Выключаем коллизии
      physics.setCollisionsEnabled(false);
      expect(physics.getCollisionsEnabled()).toBe(false);
      
      // Включаем коллизии обратно
      physics.setCollisionsEnabled(true);
      expect(physics.getCollisionsEnabled()).toBe(true);
    });
  });

  // Тест метода calculateRadius
  describe('calculateRadius', () => {
    test('should calculate correct radius for different masses', () => {
      const masses = [0, 1, 10, 50, 100, 500, 1000];
      
      for (const mass of masses) {
        const expectedRadius = 5 + Math.sqrt(mass) / 2;
        const calculatedRadius = PhysicsEngine.calculateRadius(mass);
        
        expect(calculatedRadius).toBeCloseTo(expectedRadius);
      }
    });
    
    test('should handle zero and positive mass', () => {
      // Для массы 0 ожидаем минимальный радиус 5
      expect(PhysicsEngine.calculateRadius(0)).toBeCloseTo(5);
      
      // Проверяем, что положительная масса даёт ожидаемый результат
      const positiveRadiusResult = PhysicsEngine.calculateRadius(10);
      expect(positiveRadiusResult).toBeGreaterThanOrEqual(5);
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

  // Тесты для расчета сохранения момента импульса и энергии
  describe('conservation laws', () => {
    test('should conserve momentum in two-body interaction', () => {
      const physics = new PhysicsEngine(1.0, 1000); // Большое минимальное расстояние, чтобы избежать коллизий
      
      // Создаем два объекта
      const obj1: GravityObject = {
        x: 100, y: 200, vx: 1, vy: 0, mass: 100, color: 'red'
      };
      
      const obj2: GravityObject = {
        x: 300, y: 200, vx: -1, vy: 0, mass: 200, color: 'blue'
      };
      
      const objects = [obj1, obj2];
      
      // Вычисляем начальный импульс системы
      const initialMomentumX = obj1.mass * obj1.vx + obj2.mass * obj2.vx;
      const initialMomentumY = obj1.mass * obj1.vy + obj2.mass * obj2.vy;
      
      // Применяем расчет гравитационных сил
      physics.calculateGravitationalForces(objects);
      
      // Вычисляем конечный импульс системы
      const finalMomentumX = obj1.mass * obj1.vx + obj2.mass * obj2.vx;
      const finalMomentumY = obj1.mass * obj1.vy + obj2.mass * obj2.vy;
      
      // Импульс должен сохраняться
      expect(finalMomentumX).toBeCloseTo(initialMomentumX);
      expect(finalMomentumY).toBeCloseTo(initialMomentumY);
    });
  });

  // Тесты для системы из многих объектов
  describe('multi-object system', () => {
    test('should correctly handle interactions between multiple objects', () => {
      const physics = new PhysicsEngine(1.0, 10);
      
      // Создаем систему из трех объектов
      const obj1: GravityObject = {
        x: 0, y: 0, vx: 0, vy: 0, mass: 100, color: 'red'
      };
      
      const obj2: GravityObject = {
        x: 100, y: 0, vx: 0, vy: 0, mass: 100, color: 'blue'
      };
      
      const obj3: GravityObject = {
        x: 0, y: 100, vx: 0, vy: 0, mass: 100, color: 'green'
      };
      
      const objects = [obj1, obj2, obj3];
      
      physics.calculateGravitationalForces(objects);
      
      // Проверяем, что все объекты получили ускорение
      expect(obj1.vx).not.toBe(0);
      expect(obj1.vy).not.toBe(0);
      expect(obj2.vx).not.toBe(0);
      expect(obj2.vy).not.toBe(0);
      expect(obj3.vx).not.toBe(0);
      expect(obj3.vy).not.toBe(0);
      
      // Проверяем сохранение импульса (сумма m*v должна быть постоянной)
      const totalMomentumX = obj1.mass * obj1.vx + obj2.mass * obj2.vx + obj3.mass * obj3.vx;
      const totalMomentumY = obj1.mass * obj1.vy + obj2.mass * obj2.vy + obj3.mass * obj3.vy;
      
      // В замкнутой системе без внешних сил суммарный импульс должен быть близок к нулю
      // Из-за численных ошибок может быть небольшое отклонение
      expect(Math.abs(totalMomentumX)).toBeLessThan(1e-10);
      expect(Math.abs(totalMomentumY)).toBeLessThan(1e-10);
    });
  });

  // Тесты крайних случаев
  describe('edge cases', () => {
    test('should handle very large masses', () => {
      const physics = new PhysicsEngine(1.0, 10);
      
      const obj1: GravityObject = {
        x: 0, y: 0, vx: 0, vy: 0, mass: 1e10, color: 'red'
      };
      
      const obj2: GravityObject = {
        x: 100, y: 0, vx: 0, vy: 0, mass: 100, color: 'blue'
      };
      
      const objects = [obj1, obj2];
      
      // Не должно быть ошибок при выполнении
      expect(() => physics.updatePhysics(objects, 1000, 1000)).not.toThrow();
      
      // Маленький объект должен получить большое ускорение
      expect(Math.abs(obj2.vx)).toBeGreaterThan(1);
      // Большой объект должен получить очень маленькое ускорение
      expect(Math.abs(obj1.vx)).toBeLessThan(0.01);
    });

    test('should handle very small masses', () => {
      const physics = new PhysicsEngine(1.0, 10);
      
      const obj1: GravityObject = {
        x: 0, y: 0, vx: 0, vy: 0, mass: 1e-10, color: 'red'
      };
      
      const obj2: GravityObject = {
        x: 100, y: 0, vx: 0, vy: 0, mass: 1e-10, color: 'blue'
      };
      
      const objects = [obj1, obj2];
      
      // Не должно быть ошибок при выполнении
      expect(() => physics.updatePhysics(objects, 1000, 1000)).not.toThrow();
      
      // Ускорение должно быть очень маленьким
      expect(Math.abs(obj1.vx)).toBeLessThan(1e-10);
      expect(Math.abs(obj2.vx)).toBeLessThan(1e-10);
    });

    test('should handle zero mass', () => {
      const physics = new PhysicsEngine(1.0, 10);
      
      const obj1: GravityObject = {
        x: 0, y: 0, vx: 0, vy: 0, mass: 0, color: 'red'
      };
      
      const obj2: GravityObject = {
        x: 100, y: 0, vx: 0, vy: 0, mass: 100, color: 'blue'
      };
      
      const objects = [obj1, obj2];
      
      // Не должно быть ошибок при выполнении (деление на ноль)
      expect(() => physics.updatePhysics(objects, 1000, 1000)).not.toThrow();
    });
  });
}); 