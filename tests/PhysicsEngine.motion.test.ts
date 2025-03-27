import { PhysicsEngine } from '../src/physics/PhysicsEngine';
import { GravityObject } from '../src/models/GravityObject';

describe('PhysicsEngine Motion', () => {
  // Тест обновления позиций объектов
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
    
    test('should apply timeScale correctly', () => {
      const physics = new PhysicsEngine();
      
      // Создаем объект с известной скоростью
      const obj: GravityObject = {
        x: 100, y: 100, vx: 5, vy: 10, mass: 50, color: 'red'
      };
      
      // Тест с разными значениями timeScale
      const timeScales = [0.5, 1.0, 2.0];
      
      for (const timeScale of timeScales) {
        // Сбрасываем позицию объекта
        obj.x = 100;
        obj.y = 100;
        
        // Копируем начальную позицию
        const initialX = obj.x;
        const initialY = obj.y;
        
        // Применяем физику с текущим timeScale
        physics.updatePhysics([obj], 1000, 1000, timeScale);
        
        // Ожидаемое изменение позиции
        const expectedDx = obj.vx * timeScale;
        const expectedDy = obj.vy * timeScale;
        
        // Проверяем, что позиция изменилась пропорционально timeScale
        expect(obj.x).toBeCloseTo(initialX + expectedDx);
        expect(obj.y).toBeCloseTo(initialY + expectedDy);
      }
    });
  });

  // Тест отражения от границ
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
    
    test('should keep objects within bounds', () => {
      const physics = new PhysicsEngine();
      
      // Ширина и высота границ
      const width = 1000;
      const height = 800;
      
      // Создаем объекты на границе или за границей
      const objects: GravityObject[] = [
        // Объект за левой границей
        { x: -10, y: 400, vx: -5, vy: 0, mass: 50, color: 'red' },
        // Объект за правой границей
        { x: width + 10, y: 400, vx: 5, vy: 0, mass: 50, color: 'blue' },
        // Объект за верхней границей
        { x: 500, y: -10, vx: 0, vy: -5, mass: 50, color: 'green' },
        // Объект за нижней границей
        { x: 500, y: height + 10, vx: 0, vy: 5, mass: 50, color: 'yellow' }
      ];
      
      // Применяем физику
      physics.updatePhysics(objects, width, height);
      
      // Проверяем, что объекты остались в пределах границ
      for (const obj of objects) {
        const radius = PhysicsEngine.calculateRadius(obj.mass);
        expect(obj.x).toBeGreaterThanOrEqual(radius);
        expect(obj.x).toBeLessThanOrEqual(width - radius);
        expect(obj.y).toBeGreaterThanOrEqual(radius);
        expect(obj.y).toBeLessThanOrEqual(height - radius);
      }
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
  });

  // Тест метода updatePhysics (комбинированное обновление)
  describe('updatePhysics', () => {
    test('should update all physics in one call', () => {
      const physics = new PhysicsEngine();
      
      // Создаем массив объектов
      const objects: GravityObject[] = [
        { x: 100, y: 100, vx: 1, vy: 2, mass: 50, color: 'red' },
        { x: 200, y: 200, vx: -1, vy: -1, mass: 50, color: 'blue' }
      ];
      
      // Копируем начальные позиции
      const initialPositions = objects.map(obj => ({ x: obj.x, y: obj.y }));
      
      // Применяем физику
      physics.updatePhysics(objects, 1000, 1000);
      
      // Проверяем, что позиции объектов изменились
      for (let i = 0; i < objects.length; i++) {
        // Позиция должна измениться хотя бы на величину скорости
        expect(objects[i].x).not.toBe(initialPositions[i].x);
        expect(objects[i].y).not.toBe(initialPositions[i].y);
      }
    });
  });

  // Тест стабильной орбиты
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

  // Тест детерминированности
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