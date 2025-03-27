import { PresetManager } from '../src/presets/PresetManager';
import { GravityObject } from '../src/models/GravityObject';

describe('PresetManager', () => {
  // Мокаем window.innerWidth и window.innerHeight для предсказуемых тестов
  const originalInnerWidth = window.innerWidth;
  const originalInnerHeight = window.innerHeight;
  
  beforeAll(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
  });
  
  afterAll(() => {
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, writable: true });
  });
  
  // Тест инициализации
  describe('initialization', () => {
    test('should initialize with predefined presets', () => {
      const presetManager = new PresetManager();
      
      // Проверяем, что пресеты созданы
      expect(presetManager).toBeDefined();
      expect(presetManager.getPresets()).toBeDefined();
      expect(presetManager.getPresets().length).toBeGreaterThan(0);
    });
  });
  
  // Тест метода getPresets
  describe('getPresets', () => {
    test('should return all presets', () => {
      const presetManager = new PresetManager();
      const presets = presetManager.getPresets();
      
      // Проверяем, что возвращается массив пресетов
      expect(Array.isArray(presets)).toBe(true);
      
      // Проверяем, что каждый пресет имеет правильную структуру
      presets.forEach(preset => {
        expect(preset).toHaveProperty('name');
        expect(preset).toHaveProperty('description');
        expect(preset).toHaveProperty('createObjects');
        expect(typeof preset.name).toBe('string');
        expect(typeof preset.description).toBe('string');
        expect(typeof preset.createObjects).toBe('function');
      });
    });
  });
  
  // Тест метода getRandomPreset
  describe('getRandomPreset', () => {
    test('should return a random preset and its index', () => {
      const presetManager = new PresetManager();
      const randomPresetData = presetManager.getRandomPreset();
      
      // Проверяем структуру возвращаемого объекта
      expect(randomPresetData).toHaveProperty('preset');
      expect(randomPresetData).toHaveProperty('index');
      
      // Проверяем, что индекс находится в допустимом диапазоне
      expect(randomPresetData.index).toBeGreaterThanOrEqual(0);
      expect(randomPresetData.index).toBeLessThan(presetManager.getPresets().length);
      
      // Проверяем, что возвращаемый пресет соответствует пресету по указанному индексу
      expect(randomPresetData.preset).toEqual(presetManager.getPresetByIndex(randomPresetData.index));
    });
  });
  
  // Тест метода getPresetByIndex
  describe('getPresetByIndex', () => {
    test('should return a preset for a valid index', () => {
      const presetManager = new PresetManager();
      const presets = presetManager.getPresets();
      
      // Проверяем получение пресета по валидному индексу
      const validIndex = 1;
      const preset = presetManager.getPresetByIndex(validIndex);
      
      expect(preset).toEqual(presets[validIndex]);
    });
    
    test('should return the first preset for an invalid index', () => {
      const presetManager = new PresetManager();
      const presets = presetManager.getPresets();
      
      // Проверяем получение первого пресета при передаче отрицательного индекса
      const negativeIndex = -1;
      const presetWithNegativeIndex = presetManager.getPresetByIndex(negativeIndex);
      
      expect(presetWithNegativeIndex).toEqual(presets[0]);
      
      // Проверяем получение первого пресета при передаче слишком большого индекса
      const tooLargeIndex = presets.length + 10;
      const presetWithLargeIndex = presetManager.getPresetByIndex(tooLargeIndex);
      
      expect(presetWithLargeIndex).toEqual(presets[0]);
    });
  });
  
  // Тесты создания объектов из пресетов
  describe('preset createObjects functions', () => {
    test('should create valid gravity objects for each preset', () => {
      const presetManager = new PresetManager();
      const presets = presetManager.getPresets();
      
      presets.forEach(preset => {
        const objects = preset.createObjects();
        
        // Проверяем, что функция возвращает массив
        expect(Array.isArray(objects)).toBe(true);
        
        // Проверяем, что в массиве есть элементы
        expect(objects.length).toBeGreaterThan(0);
        
        // Проверяем структуру каждого объекта
        objects.forEach((obj: GravityObject) => {
          expect(obj).toHaveProperty('x');
          expect(obj).toHaveProperty('y');
          expect(obj).toHaveProperty('vx');
          expect(obj).toHaveProperty('vy');
          expect(obj).toHaveProperty('mass');
          expect(obj).toHaveProperty('color');
          
          expect(typeof obj.x).toBe('number');
          expect(typeof obj.y).toBe('number');
          expect(typeof obj.vx).toBe('number');
          expect(typeof obj.vy).toBe('number');
          expect(typeof obj.mass).toBe('number');
          expect(typeof obj.color).toBe('string');
        });
      });
    });
    
    test('should create different object configurations for different presets', () => {
      const presetManager = new PresetManager();
      const presets = presetManager.getPresets();
      
      // Сравниваем первые два пресета
      if (presets.length >= 2) {
        const objects1 = presets[0].createObjects();
        const objects2 = presets[1].createObjects();
        
        // Проверяем, что конфигурации разные (разное количество объектов или разные массы)
        const isDifferent = 
          objects1.length !== objects2.length || 
          objects1.some((obj1, index) => {
            const obj2 = objects2[index];
            return obj1.mass !== obj2.mass || obj1.color !== obj2.color;
          });
          
        expect(isDifferent).toBe(true);
      }
    });
  });
}); 