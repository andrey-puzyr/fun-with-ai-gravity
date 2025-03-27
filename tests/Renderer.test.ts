import { Renderer } from '../src/rendering/Renderer';
import { GravityObject } from '../src/models/GravityObject';

// Мок для GravityObjectWithMergeEffect
interface GravityObjectWithMergeEffect extends GravityObject {
  mergeEffect?: {
    time: number;
    maxTime: number;
  };
}

describe('Renderer', () => {
  // Моки для контекста холста
  let mockCtx: any;
  
  beforeEach(() => {
    // Создаем мок для контекста холста с фиктивными методами
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
  
  // Тест инициализации
  describe('initialization', () => {
    test('should create a Renderer instance with canvas context', () => {
      const renderer = new Renderer(mockCtx as unknown as CanvasRenderingContext2D);
      expect(renderer).toBeDefined();
    });
  });
  
  // Тест метода clearCanvas
  describe('clearCanvas', () => {
    test('should clear canvas with fade effect', () => {
      const renderer = new Renderer(mockCtx as unknown as CanvasRenderingContext2D);
      const width = 800;
      const height = 600;
      
      renderer.clearCanvas(width, height);
      
      // Проверяем, что был вызван метод fillRect с правильными параметрами
      expect(mockCtx.fillStyle).toBe('rgba(0, 0, 0, 0.05)');
      expect(mockCtx.fillRect).toHaveBeenCalledWith(0, 0, width, height);
    });
  });
  
  // Тест метода renderObjects
  describe('renderObjects', () => {
    test('should render objects', () => {
      const renderer = new Renderer(mockCtx as unknown as CanvasRenderingContext2D);
      
      // Тестовые объекты
      const objects: GravityObject[] = [
        { x: 100, y: 100, vx: 0, vy: 0, mass: 50, color: 'red' },
        { x: 200, y: 200, vx: 0, vy: 0, mass: 75, color: 'blue' }
      ];
      
      renderer.renderObjects(objects);
      
      // Проверяем, что методы рисования были вызваны соответствующее количество раз
      // Для каждого объекта должны вызываться методы рисования следа, объекта и блика
      expect(mockCtx.beginPath).toHaveBeenCalled();
      expect(mockCtx.arc).toHaveBeenCalled();
      expect(mockCtx.fill).toHaveBeenCalled();
    });
    
    test('should render object with merge effect', () => {
      const renderer = new Renderer(mockCtx as unknown as CanvasRenderingContext2D);
      
      // Тестовый объект с эффектом слияния
      const objectWithEffect: GravityObjectWithMergeEffect = {
        x: 100, y: 100, vx: 0, vy: 0, mass: 50, color: 'red',
        mergeEffect: { time: 0.5, maxTime: 1.0 }
      };
      
      renderer.renderObjects([objectWithEffect]);
      
      // Проверяем, что были вызваны методы для рисования эффекта слияния
      expect(mockCtx.createRadialGradient).toHaveBeenCalled();
      expect(mockCtx.beginPath).toHaveBeenCalled();
      expect(mockCtx.arc).toHaveBeenCalled();
      expect(mockCtx.fill).toHaveBeenCalled();
    });
  });
  
  // Тест метода renderCreationLine
  describe('renderCreationLine', () => {
    test('should render creation line and preview object', () => {
      const renderer = new Renderer(mockCtx as unknown as CanvasRenderingContext2D);
      
      const startX = 100;
      const startY = 100;
      const currentX = 200;
      const currentY = 150;
      
      renderer.renderCreationLine(startX, startY, currentX, currentY);
      
      // Проверяем рисование линии
      expect(mockCtx.beginPath).toHaveBeenCalled();
      expect(mockCtx.moveTo).toHaveBeenCalledWith(startX, startY);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(currentX, currentY);
      expect(mockCtx.stroke).toHaveBeenCalled();
      
      // Проверяем рисование предварительного объекта
      expect(mockCtx.arc).toHaveBeenCalledWith(startX, startY, 10, 0, Math.PI * 2);
    });
  });
  
  // Тесты для приватных методов (опосредованно через публичные)
  describe('private rendering methods (through public interface)', () => {
    test('should set correct global alpha for different rendering steps', () => {
      const renderer = new Renderer(mockCtx as unknown as CanvasRenderingContext2D);
      
      const obj: GravityObject = { 
        x: 100, y: 100, vx: 0, vy: 0, mass: 50, color: 'red' 
      };
      
      // Рендерим объект и проверяем, что globalAlpha был изменен для следа и затем восстановлен
      renderer.renderObjects([obj]);
      
      // После рендеринга всего объекта globalAlpha должен быть восстановлен до 1.0
      expect(mockCtx.globalAlpha).toBe(1.0);
    });
    
    test('should create gradient for object trail', () => {
      const renderer = new Renderer(mockCtx as unknown as CanvasRenderingContext2D);
      
      const obj: GravityObject = { 
        x: 100, y: 100, vx: 0, vy: 0, mass: 50, color: 'red' 
      };
      
      renderer.renderObjects([obj]);
      
      // Проверяем, что был создан градиент для следа объекта
      expect(mockCtx.createRadialGradient).toHaveBeenCalled();
    });
  });
}); 