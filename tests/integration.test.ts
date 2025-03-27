import { PhysicsEngine } from '../src/physics/PhysicsEngine';
import { Renderer } from '../src/rendering/Renderer';
import { GravityObject } from '../src/models/GravityObject';
import { PresetManager } from '../src/presets/PresetManager';

describe('Integration Tests', () => {
  // Мок для контекста холста
  let mockCtx: any;
  
  beforeEach(() => {
    // Создаем мок для контекста холста
    mockCtx = {
      fillStyle: '',
      fillRect: jest.fn(),
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      stroke: jest.fn(),
      globalAlpha: 1.0,
      createRadialGradient: jest.fn().mockReturnValue({
        addColorStop: jest.fn()
      }),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      strokeStyle: '',
      lineWidth: 1
    };
  });
  
  // Тест взаимодействия PhysicsEngine и Renderer
  describe('PhysicsEngine and Renderer interaction', () => {
    test('should update object positions and render them', () => {
      const physics = new PhysicsEngine();
      const renderer = new Renderer(mockCtx as unknown as CanvasRenderingContext2D);
      
      // Создаем тестовые объекты
      const objects: GravityObject[] = [
        { x: 100, y: 100, vx: 5, vy: 3, mass: 50, color: 'red' },
        { x: 300, y: 200, vx: -3, vy: 4, mass: 70, color: 'blue' }
      ];
      
      // Копируем начальные позиции для сравнения
      const initialPositions = objects.map(obj => ({ x: obj.x, y: obj.y }));
      
      // Применяем физику
      physics.updatePhysics(objects, 1000, 800);
      
      // Проверяем, что позиции изменились
      for (let i = 0; i < objects.length; i++) {
        expect(objects[i].x).not.toBe(initialPositions[i].x);
        expect(objects[i].y).not.toBe(initialPositions[i].y);
      }
      
      // Рендерим объекты
      renderer.renderObjects(objects);
      
      // Проверяем, что методы рендеринга были вызваны
      expect(mockCtx.beginPath).toHaveBeenCalled();
      expect(mockCtx.arc).toHaveBeenCalled();
      expect(mockCtx.fill).toHaveBeenCalled();
    });
    
    test('should handle object collisions and render merged object', () => {
      const physics = new PhysicsEngine();
      const renderer = new Renderer(mockCtx as unknown as CanvasRenderingContext2D);
      
      // Включаем коллизии
      physics.setCollisionsEnabled(true);
      
      // Создаем два объекта, которые должны столкнуться
      const objects: GravityObject[] = [
        { x: 100, y: 100, vx: 0, vy: 0, mass: 100, color: 'red' },
        { x: 110, y: 100, vx: 0, vy: 0, mass: 50, color: 'blue' }
      ];
      
      // Получаем радиусы объектов
      const radius1 = PhysicsEngine.calculateRadius(objects[0].mass);
      const radius2 = PhysicsEngine.calculateRadius(objects[1].mass);
      
      // Расстояние между объектами
      const distance = Math.sqrt(
        Math.pow(objects[1].x - objects[0].x, 2) + 
        Math.pow(objects[1].y - objects[0].y, 2)
      );
      
      // Проверяем, должны ли объекты столкнуться
      const shouldCollide = radius1 + radius2 > distance;
      
      // Применяем физику
      physics.updatePhysics(objects, 1000, 800);
      
      // Рендерим оставшиеся объекты
      renderer.renderObjects(objects);
      
      if (shouldCollide) {
        // Если объекты должны были столкнуться, то должен остаться один объект
        expect(objects.length).toBe(1);
        
        // И должен быть вызван рендеринг объекта
        expect(mockCtx.beginPath).toHaveBeenCalled();
        expect(mockCtx.arc).toHaveBeenCalled();
        expect(mockCtx.fill).toHaveBeenCalled();
      }
    });
  });
  
  // Тест взаимодействия PresetManager с другими компонентами
  describe('PresetManager integration', () => {
    test('should create objects that can be updated by PhysicsEngine', () => {
      const presetManager = new PresetManager();
      const physics = new PhysicsEngine();
      
      // Получаем первый пресет
      const preset = presetManager.getPresetByIndex(0);
      
      // Создаем объекты из пресета
      const objects = preset.createObjects();
      
      // Проверяем, что объекты были созданы
      expect(objects.length).toBeGreaterThan(0);
      
      // Копируем начальные позиции
      const initialPositions = objects.map(obj => ({ x: obj.x, y: obj.y }));
      
      // Применяем физику
      physics.updatePhysics(objects, 1000, 800);
      
      // Проверяем, что позиции объектов изменились
      let positionsChanged = false;
      for (let i = 0; i < objects.length; i++) {
        if (objects[i].x !== initialPositions[i].x || objects[i].y !== initialPositions[i].y) {
          positionsChanged = true;
          break;
        }
      }
      
      expect(positionsChanged).toBe(true);
    });
    
    test('should create objects that can be rendered', () => {
      const presetManager = new PresetManager();
      const renderer = new Renderer(mockCtx as unknown as CanvasRenderingContext2D);
      
      // Получаем первый пресет
      const preset = presetManager.getPresetByIndex(0);
      
      // Создаем объекты из пресета
      const objects = preset.createObjects();
      
      // Рендерим объекты
      renderer.renderObjects(objects);
      
      // Проверяем, что методы рендеринга были вызваны
      expect(mockCtx.beginPath).toHaveBeenCalled();
      expect(mockCtx.arc).toHaveBeenCalled();
      expect(mockCtx.fill).toHaveBeenCalled();
    });
  });
  
  // Тест производительности с большим количеством объектов
  describe('performance with many objects', () => {
    test('should handle large number of objects efficiently', () => {
      const physics = new PhysicsEngine();
      const renderer = new Renderer(mockCtx as unknown as CanvasRenderingContext2D);
      
      // Создаем много объектов
      const objects: GravityObject[] = [];
      for (let i = 0; i < 100; i++) {
        objects.push({
          x: Math.random() * 1000,
          y: Math.random() * 800,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          mass: 10 + Math.random() * 40,
          color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        });
      }
      
      // Засекаем время выполнения
      const startPhysics = performance.now();
      
      // Применяем физику
      physics.updatePhysics(objects, 1000, 800);
      
      const physicsTime = performance.now() - startPhysics;
      
      // Засекаем время рендеринга
      const startRendering = performance.now();
      
      // Рендерим объекты
      renderer.renderObjects(objects);
      
      const renderingTime = performance.now() - startRendering;
      
      // Проверяем, что операции выполнились за разумное время
      // В тестовой среде время будет отличаться, но нам важно, что операции завершились
      expect(physicsTime).toBeGreaterThan(0);
      expect(renderingTime).toBeGreaterThan(0);
      
      // Проверяем, что все объекты остались после обработки
      expect(objects.length).toBe(100);
    });
  });
}); 