import { PhysicsEngine } from '../src/physics/PhysicsEngine';
import { GravityObject } from '../src/models/GravityObject';

describe('PhysicsEngine', () => {
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

  // Тест 4: Обновление позиций объектов
  describe('position updates', () => {
    test('should update positions based on velocity', () => {
      const physics = new PhysicsEngine();
      
      const obj: GravityObject = {
        x: 100, y: 100, vx: 5, vy: 10, mass: 100, color: 'red'
      };
      
      const objects = [obj];
      
      physics.updatePositions(objects, 1000, 1000);
      
      // Позиция должна измениться на величину скорости
      expect(obj.x).toBe(105);
      expect(obj.y).toBe(110);
    });

    test('should maintain inertia (constant velocity without forces)', () => {
      const physics = new PhysicsEngine();
      
      // Одиночный объект без внешних сил должен двигаться с постоянной скоростью
      const obj: GravityObject = {
        x: 100, y: 100, vx: 5, vy: 10, mass: 100, color: 'red'
      };
      
      const objects = [obj];
      
      // Применяем физику несколько раз
      for (let i = 0; i < 5; i++) {
        physics.updatePositions(objects, 1000, 1000);
      }
      
      // После 5 шагов позиция должна измениться на 5 * скорость
      expect(obj.x).toBe(100 + 5 * 5);
      expect(obj.y).toBe(100 + 5 * 10);
      
      // Скорость должна остаться неизменной
      expect(obj.vx).toBe(5);
      expect(obj.vy).toBe(10);
    });
  });

  // Тест 5: Отражение от границ
  describe('boundary reflections', () => {
    test('should reflect from top boundary', () => {
      const physics = new PhysicsEngine();
      
      const obj: GravityObject = {
        x: 100, y: 5, vx: 0, vy: -10, mass: 100, color: 'red'
      };
      
      const objects = [obj];
      
      physics.updatePositions(objects, 1000, 1000);
      
      // Объект должен отразиться от верхней границы
      // Радиус вычисляется как 5 + Math.sqrt(100) / 2 = 5 + 5 = 10
      expect(obj.y).toBe(10); // Установлен в радиус
      expect(obj.vy).toBeCloseTo(10 * 0.8); // Скорость отражения с затуханием
    });

    test('should reflect from bottom boundary', () => {
      const physics = new PhysicsEngine();
      
      const obj: GravityObject = {
        x: 100, y: 995, vx: 0, vy: 10, mass: 100, color: 'red'
      };
      
      const objects = [obj];
      
      physics.updatePositions(objects, 1000, 1000);
      
      // Объект должен отразиться от нижней границы
      // Радиус вычисляется как 5 + Math.sqrt(100) / 2 = 5 + 5 = 10
      expect(obj.y).toBe(990); // Высота - радиус
      expect(obj.vy).toBeCloseTo(-10 * 0.8); // Скорость отражения с затуханием
    });

    test('should reflect from left boundary', () => {
      const physics = new PhysicsEngine();
      
      const obj: GravityObject = {
        x: 5, y: 100, vx: -10, vy: 0, mass: 100, color: 'red'
      };
      
      const objects = [obj];
      
      physics.updatePositions(objects, 1000, 1000);
      
      // Объект должен отразиться от левой границы
      // Радиус вычисляется как 5 + Math.sqrt(100) / 2 = 5 + 5 = 10
      expect(obj.x).toBe(10); // Установлен в радиус
      expect(obj.vx).toBeCloseTo(10 * 0.8); // Скорость отражения с затуханием
    });

    test('should reflect from right boundary', () => {
      const physics = new PhysicsEngine();
      
      const obj: GravityObject = {
        x: 995, y: 100, vx: 10, vy: 0, mass: 100, color: 'red'
      };
      
      const objects = [obj];
      
      physics.updatePositions(objects, 1000, 1000);
      
      // Объект должен отразиться от правой границы
      // Радиус вычисляется как 5 + Math.sqrt(100) / 2 = 5 + 5 = 10
      expect(obj.x).toBe(990); // Ширина - радиус
      expect(obj.vx).toBeCloseTo(-10 * 0.8); // Скорость отражения с затуханием
    });

    test('should apply damping factor on reflection', () => {
      const physics = new PhysicsEngine();
      
      const obj: GravityObject = {
        x: 5, y: 100, vx: -10, vy: 0, mass: 100, color: 'red'
      };
      
      const objects = [obj];
      
      physics.updatePositions(objects, 1000, 1000);
      
      // Проверяем коэффициент затухания 0.8
      expect(obj.vx).toBeCloseTo(10 * 0.8);
    });
  });

  // Тест 6: Система из нескольких объектов
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

  // Тест 7: Стабильная орбита
  describe('stable orbit', () => {
    test('should maintain stable orbit with correct initial velocity', () => {
      const physics = new PhysicsEngine(1.0, 10);
      
      // Центральный массивный объект
      const centralObj: GravityObject = {
        x: 500, y: 500, vx: 0, vy: 0, mass: 10000, color: 'yellow'
      };
      
      // Объект на орбите
      // Для круговой орбиты: v = sqrt(G * M / r)
      const distance = 100;
      const orbitalVelocity = Math.sqrt(1.0 * 10000 / distance);
      
      const orbitingObj: GravityObject = {
        x: 500 + distance, y: 500, vx: 0, vy: orbitalVelocity, mass: 10, color: 'blue'
      };
      
      const objects = [centralObj, orbitingObj];
      
      // Начальное положение
      const initialX = orbitingObj.x;
      const initialY = orbitingObj.y;
      
      // Симулируем несколько шагов
      for (let i = 0; i < 100; i++) {
        physics.calculateGravitationalForces(objects);
        physics.updatePositions(objects, 1000, 1000);
      }
      
      // Проверяем, что объект остается примерно на том же расстоянии от центра
      const finalDistance = Math.sqrt(
        Math.pow(orbitingObj.x - centralObj.x, 2) + 
        Math.pow(orbitingObj.y - centralObj.y, 2)
      );
      
      // Допускаем небольшое отклонение из-за дискретности симуляции
      // Используем более широкий допуск
      expect(finalDistance).toBeGreaterThan(distance * 0.9);
      expect(finalDistance).toBeLessThan(distance * 1.1);
    });
  });

  // Тест 8: Предельные случаи
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

    test('should handle very high velocities', () => {
      const physics = new PhysicsEngine();
      
      const obj: GravityObject = {
        x: 500, y: 500, vx: 1e6, vy: 1e6, mass: 100, color: 'red'
      };
      
      const objects = [obj];
      
      // Не должно быть ошибок при выполнении
      expect(() => physics.updatePhysics(objects, 1000, 1000)).not.toThrow();
      
      // Объект должен отразиться от границ
      // Радиус вычисляется как 5 + Math.sqrt(100) / 2 = 5 + 5 = 10
      expect(obj.x).toBe(990);
      expect(obj.y).toBe(990);
      expect(obj.vx).toBeCloseTo(-1e6 * 0.8);
      expect(obj.vy).toBeCloseTo(-1e6 * 0.8);
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

  // Тест 9: Производительность
  describe('performance', () => {
    test('should handle large number of objects efficiently', () => {
      const physics = new PhysicsEngine();
      const objects: GravityObject[] = [];
      
      // Создаем 100 объектов
      for (let i = 0; i < 100; i++) {
        objects.push({
          x: Math.random() * 1000,
          y: Math.random() * 1000,
          vx: Math.random() * 2 - 1,
          vy: Math.random() * 2 - 1,
          mass: 10 + Math.random() * 90,
          color: 'red'
        });
      }
      
      const startTime = performance.now();
      physics.updatePhysics(objects, 1000, 1000);
      const endTime = performance.now();
      
      // Проверяем, что время выполнения не превышает разумный предел
      // Для 100 объектов (10000 взаимодействий) должно быть менее 1 секунды
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });

  // Тест 10: Детерминированность
  describe('determinism', () => {
    test('should produce the same results with the same initial conditions', () => {
      const physics1 = new PhysicsEngine(1.0, 10);
      const physics2 = new PhysicsEngine(1.0, 10);
      
      // Создаем идентичные наборы объектов
      const objects1: GravityObject[] = [
        { x: 0, y: 0, vx: 0, vy: 0, mass: 100, color: 'red' },
        { x: 100, y: 0, vx: 0, vy: 0, mass: 100, color: 'blue' }
      ];
      
      const objects2: GravityObject[] = [
        { x: 0, y: 0, vx: 0, vy: 0, mass: 100, color: 'red' },
        { x: 100, y: 0, vx: 0, vy: 0, mass: 100, color: 'blue' }
      ];
      
      // Выполняем симуляцию несколько шагов
      for (let i = 0; i < 10; i++) {
        physics1.updatePhysics(objects1, 1000, 1000);
        physics2.updatePhysics(objects2, 1000, 1000);
      }
      
      // Результаты должны быть идентичными
      expect(objects1[0].x).toBeCloseTo(objects2[0].x);
      expect(objects1[0].y).toBeCloseTo(objects2[0].y);
      expect(objects1[0].vx).toBeCloseTo(objects2[0].vx);
      expect(objects1[0].vy).toBeCloseTo(objects2[0].vy);
      
      expect(objects1[1].x).toBeCloseTo(objects2[1].x);
      expect(objects1[1].y).toBeCloseTo(objects2[1].y);
      expect(objects1[1].vx).toBeCloseTo(objects2[1].vx);
      expect(objects1[1].vy).toBeCloseTo(objects2[1].vy);
    });
  });
}); 