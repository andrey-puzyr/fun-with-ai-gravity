import { GravityObject, CreateObjectState, Preset } from './models/GravityObject';
import { PhysicsEngine } from './physics/PhysicsEngine';
import { Renderer } from './rendering/Renderer';
import { PresetManager } from './presets/PresetManager';

// Объявляем тип для глобального объекта window
declare global {
  interface Window {
    gravitySimulator: GravitySimulator;
  }
}

// Основной класс симуляции
class GravitySimulator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private objects: GravityObject[] = [];
  private animationId: number = 0;
  private createState: CreateObjectState = {
    isCreating: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  };
  
  // Модули для физики, рендеринга и пресетов
  private physics: PhysicsEngine;
  private renderer: Renderer;
  private presetManager: PresetManager;
  
  // Переменная для управления скоростью времени
  private timeScale: number = 1.0;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    
    // Инициализация модулей
    this.physics = new PhysicsEngine();
    this.renderer = new Renderer(this.ctx);
    this.presetManager = new PresetManager();
    
    this.setupCanvas();
    this.setupEventListeners();
    
    // Проверяем наличие параметра preset в URL
    this.loadPresetFromURL();
    
    this.startAnimation();
    
    // Делаем экземпляр доступным глобально
    window.gravitySimulator = this;
  }

  private setupCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => this.setupCanvas());
    
    // Обработчик для кнопки случайного пресета
    const randomPresetButton = document.getElementById('random-preset');
    if (randomPresetButton) {
      randomPresetButton.addEventListener('click', () => this.loadRandomPreset());
    }
    
    // Обработчик для ползунка управления временем
    const timeScaleSlider = document.getElementById('time-scale-slider') as HTMLInputElement;
    if (timeScaleSlider) {
      timeScaleSlider.addEventListener('input', (e) => {
        const value = parseFloat((e.target as HTMLInputElement).value);
        this.setTimeScale(value);
      });
    }
    
    // Обработчик для чекбокса включения/выключения коллизий
    const collisionsCheckbox = document.getElementById('collisions-checkbox') as HTMLInputElement;
    if (collisionsCheckbox) {
      collisionsCheckbox.addEventListener('change', (e) => {
        const enabled = (e.target as HTMLInputElement).checked;
        this.setCollisionsEnabled(enabled);
      });
    }
    
    // Добавляем обработчики событий мыши для создания объектов
    this.canvas.addEventListener('mousedown', (e) => {
      this.createState.isCreating = true;
      this.createState.startX = e.clientX;
      this.createState.startY = e.clientY;
      this.createState.currentX = e.clientX;
      this.createState.currentY = e.clientY;
    });
    
    this.canvas.addEventListener('mousemove', (e) => {
      if (this.createState.isCreating) {
        this.createState.currentX = e.clientX;
        this.createState.currentY = e.clientY;
      }
    });
    
    this.canvas.addEventListener('mouseup', (e) => {
      if (this.createState.isCreating) {
        const endX = e.clientX;
        const endY = e.clientY;
        
        // Вычисляем вектор скорости на основе перемещения мыши
        const dx = endX - this.createState.startX;
        const dy = endY - this.createState.startY;
        
        // Ограничиваем максимальную скорость
        const maxSpeed = 10;
        const speedFactor = 0.05;
        const vx = Math.max(-maxSpeed, Math.min(maxSpeed, dx * speedFactor));
        const vy = Math.max(-maxSpeed, Math.min(maxSpeed, dy * speedFactor));
        
        // Создаем новый объект
        const mass = 20 + Math.random() * 80;
        
        this.objects.push({
          x: this.createState.startX,
          y: this.createState.startY,
          vx: vx,
          vy: vy,
          mass: mass,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`
        });
        
        this.createState.isCreating = false;
      }
    });
    
    // Отменяем создание объекта, если мышь покидает canvas
    this.canvas.addEventListener('mouseleave', () => {
      this.createState.isCreating = false;
    });
  }

  // Метод для установки скорости времени
  public setTimeScale(value: number): void {
    this.timeScale = Math.max(0, Math.min(5, value));
    
    // Обновляем URL с параметром скорости времени
    this.updateURLParameters();
    
    // Обновляем отображаемое значение
    const timeScaleValue = document.getElementById('time-scale-value');
    if (timeScaleValue) {
      timeScaleValue.textContent = this.timeScale.toFixed(1) + 'x';
    }
    
    // Обновляем положение ползунка
    const timeScaleSlider = document.getElementById('time-scale-slider') as HTMLInputElement;
    if (timeScaleSlider) {
      timeScaleSlider.value = this.timeScale.toString();
    }
  }
  
  // Метод для получения текущей скорости времени
  public getTimeScale(): number {
    return this.timeScale;
  }

  // Метод для включения/выключения коллизий
  public setCollisionsEnabled(enabled: boolean): void {
    this.physics.setCollisionsEnabled(enabled);
    
    // Обновляем URL с параметром коллизий
    this.updateURLParameters();
    
    // Обновляем состояние чекбокса, если он существует
    const collisionsCheckbox = document.getElementById('collisions-checkbox') as HTMLInputElement;
    if (collisionsCheckbox) {
      collisionsCheckbox.checked = enabled;
    }
  }
  
  // Метод для получения текущего состояния коллизий
  public getCollisionsEnabled(): boolean {
    return this.physics.getCollisionsEnabled();
  }
  
  // Метод для обновления параметров в URL
  private updateURLParameters(presetIndex?: number): void {
    const url = new URL(window.location.href);
    
    // Если индекс пресета передан явно, используем его
    // Иначе получаем текущий индекс пресета из URL или используем 0 по умолчанию
    if (presetIndex === undefined) {
      const presetParam = url.searchParams.get('preset');
      presetIndex = presetParam !== null ? parseInt(presetParam, 10) : 0;
    }
    
    // Обновляем параметры в URL
    url.searchParams.set('preset', presetIndex.toString());
    url.searchParams.set('timeScale', this.timeScale.toString());
    url.searchParams.set('collisions', this.getCollisionsEnabled() ? '1' : '0');
    
    // Обновляем URL без перезагрузки страницы
    window.history.replaceState({}, '', url.toString());
  }

  private loadRandomPreset(): void {
    const randomPresetData = this.presetManager.getRandomPreset();
    const preset = randomPresetData.preset;
    const presetIndex = randomPresetData.index;
    
    this.objects = preset.createObjects();
    this.updatePresetInfo(preset.name, preset.description);
    
    // Обновляем URL с индексом пресета
    this.updateURLParameters(presetIndex);
    
    console.log(`Загружен пресет: ${preset.name}`);
  }
  
  // Делаем метод публичным, чтобы он был доступен из выпадающего меню
  public loadPreset(index: number): void {
    const preset = this.presetManager.getPresetByIndex(index);
    this.objects = preset.createObjects();
    this.updatePresetInfo(preset.name, preset.description);
    
    // Обновляем URL с индексом пресета и другими параметрами
    this.updateURLParameters(index);
    
    console.log(`Загружен пресет: ${preset.name}`);
  }
  
  // Метод для получения всех пресетов
  public getAllPresets(): Preset[] {
    return this.presetManager.getPresets();
  }
  
  private updatePresetInfo(name: string, description: string): void {
    const presetNameElement = document.getElementById('preset-name');
    const presetDescriptionElement = document.getElementById('preset-description');
    
    if (presetNameElement) {
      presetNameElement.textContent = name;
    }
    
    if (presetDescriptionElement) {
      presetDescriptionElement.textContent = description;
    }
  }

  private startAnimation(): void {
    this.animate();
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.update();
    this.render();
  }

  private update(): void {
    // Используем физический движок для обновления объектов, передавая timeScale
    this.physics.updatePhysics(this.objects, this.canvas.width, this.canvas.height, this.timeScale);
  }

  private render(): void {
    // Используем рендерер для отрисовки
    this.renderer.clearCanvas(this.canvas.width, this.canvas.height);
    this.renderer.renderObjects(this.objects);
    
    // Рисуем линию при создании объекта
    if (this.createState.isCreating) {
      this.renderer.renderCreationLine(
        this.createState.startX, 
        this.createState.startY, 
        this.createState.currentX, 
        this.createState.currentY
      );
    }
  }

  private loadPresetFromURL(): void {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Загружаем пресет из URL
    const presetParam = urlParams.get('preset');
    let presetIndex = 0;
    
    if (presetParam !== null) {
      const parsedIndex = parseInt(presetParam, 10);
      if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < this.presetManager.getPresets().length) {
        presetIndex = parsedIndex;
      }
    }
    
    // Загружаем скорость времени из URL
    const timeScaleParam = urlParams.get('timeScale');
    if (timeScaleParam !== null) {
      const timeScale = parseFloat(timeScaleParam);
      if (!isNaN(timeScale) && timeScale >= 0.1 && timeScale <= 5) {
        this.setTimeScale(timeScale);
      }
    }
    
    // Загружаем состояние коллизий из URL
    const collisionsParam = urlParams.get('collisions');
    if (collisionsParam !== null) {
      const collisionsEnabled = collisionsParam === '1';
      this.setCollisionsEnabled(collisionsEnabled);
    }
    
    // Загружаем пресет (это должно быть последним, чтобы не перезаписать другие параметры)
    this.loadPreset(presetIndex);
  }
}

// Запускаем симуляцию при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  new GravitySimulator();
}); 