import { GravityObject, Preset } from '../models/GravityObject';

// Класс для управления пресетами
export class PresetManager {
  private presets: Preset[] = [];
  
  constructor() {
    this.initPresets();
  }
  
  // Получить все пресеты
  getPresets(): Preset[] {
    return this.presets;
  }
  
  // Получить случайный пресет
  getRandomPreset(): Preset {
    const randomIndex = Math.floor(Math.random() * this.presets.length);
    return this.presets[randomIndex];
  }
  
  // Получить пресет по индексу
  getPresetByIndex(index: number): Preset {
    if (index >= 0 && index < this.presets.length) {
      return this.presets[index];
    }
    return this.presets[0]; // Возвращаем первый пресет, если индекс некорректный
  }
  
  // Инициализация пресетов
  private initPresets(): void {
    this.presets.push(this.createSolarSystemPreset());
    this.presets.push(this.createBinaryStarPreset());
    this.presets.push(this.createChaosPreset());
    this.presets.push(this.createGalaxyCollisionPreset());
    this.presets.push(this.createPlanetaryDancePreset());
    this.presets.push(this.createSpiralGalaxyPreset());
    this.presets.push(this.createPlanetaryNebulaPreset());
    this.presets.push(this.createSaturnRingsPreset());
    this.presets.push(this.createSupernovaPreset());
    this.presets.push(this.createGravitationalLensPreset());
    this.presets.push(this.createPulsarPreset());
    this.presets.push(this.createProtoplanetaryDiskPreset());
    this.presets.push(this.createGlobularClusterPreset());
    this.presets.push(this.createCelestialBalletPreset());
    this.presets.push(this.createInterstellarWandererPreset());
    this.presets.push(this.createGravitationalPendulumPreset());
    this.presets.push(this.createBlackHoleAccretionDiskPreset());
    this.presets.push(this.createCosmicFountainPreset());
    this.presets.push(this.createGravitationalWavesPreset());
    this.presets.push(this.createExoplanetarySystemPreset());
    this.presets.push(this.createCosmicFilamentsPreset());
    this.presets.push(this.createStarSwarmPreset());
    this.presets.push(this.createPlanetaryMigrationPreset());
    this.presets.push(this.createGalacticCannibalismPreset());
    this.presets.push(this.createAsteroidDancePreset());
  }

  // Пресет 1: Солнечная система
  private createSolarSystemPreset(): Preset {
    return {
      name: "Солнечная система",
      description: "Центральное солнце и планеты на орбите",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Солнце
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 2000,
          color: '#FFD700' // Золотой
        });
        
        // Планеты
        const planetColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f39c12'];
        const distances = [100, 150, 200, 250, 300];
        const speeds = [3, 2.5, 2, 1.7, 1.5];
        
        for (let i = 0; i < 5; i++) {
          const distance = distances[i];
          const speed = speeds[i];
          objects.push({
            x: centerX + distance,
            y: centerY,
            vx: 0,
            vy: speed,
            mass: 10 + Math.random() * 20,
            color: planetColors[i]
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 2: Двойная звезда
  private createBinaryStarPreset(): Preset {
    return {
      name: "Двойная звезда",
      description: "Две звезды вращаются вокруг общего центра масс",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Первая звезда
        objects.push({
          x: centerX - 100,
          y: centerY,
          vx: 0,
          vy: -1.5,
          mass: 1000,
          color: '#FF5733' // Оранжевый
        });
        
        // Вторая звезда
        objects.push({
          x: centerX + 100,
          y: centerY,
          vx: 0,
          vy: 1.5,
          mass: 1000,
          color: '#33A8FF' // Голубой
        });
        
        // Несколько планет
        for (let i = 0; i < 3; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 300 + Math.random() * 100;
          objects.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            vx: Math.sin(angle) * 1.2,
            vy: -Math.cos(angle) * 1.2,
            mass: 5 + Math.random() * 15,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 3: Хаос
  private createChaosPreset(): Preset {
    return {
      name: "Хаос",
      description: "Множество объектов разной массы в хаотичном движении",
      createObjects: () => {
        const objects: GravityObject[] = [];
        
        for (let i = 0; i < 30; i++) {
          objects.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            mass: 10 + Math.random() * 40,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 4: Столкновение галактик
  private createGalaxyCollisionPreset(): Preset {
    return {
      name: "Столкновение галактик",
      description: "Две группы объектов движутся навстречу друг другу",
      createObjects: () => {
        const objects: GravityObject[] = [];
        
        // Первая галактика
        const center1X = window.innerWidth / 4;
        const center1Y = window.innerHeight / 2;
        
        objects.push({
          x: center1X,
          y: center1Y,
          vx: 1,
          vy: 0,
          mass: 1000,
          color: '#FF5733' // Оранжевый
        });
        
        for (let i = 0; i < 15; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 50 + Math.random() * 100;
          objects.push({
            x: center1X + Math.cos(angle) * distance,
            y: center1Y + Math.sin(angle) * distance,
            vx: 1 + Math.sin(angle) * 0.5,
            vy: Math.cos(angle) * 0.5,
            mass: 5 + Math.random() * 10,
            color: `hsl(${30 + Math.random() * 60}, 70%, 50%)`
          });
        }
        
        // Вторая галактика
        const center2X = (window.innerWidth / 4) * 3;
        const center2Y = window.innerHeight / 2;
        
        objects.push({
          x: center2X,
          y: center2Y,
          vx: -1,
          vy: 0,
          mass: 1000,
          color: '#3498DB' // Синий
        });
        
        for (let i = 0; i < 15; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 50 + Math.random() * 100;
          objects.push({
            x: center2X + Math.cos(angle) * distance,
            y: center2Y + Math.sin(angle) * distance,
            vx: -1 + Math.sin(angle) * 0.5,
            vy: Math.cos(angle) * 0.5,
            mass: 5 + Math.random() * 10,
            color: `hsl(${200 + Math.random() * 60}, 70%, 50%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 5: Танец планет
  private createPlanetaryDancePreset(): Preset {
    return {
      name: "Танец планет",
      description: "Сложная система с несколькими центрами притяжения",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Три центра притяжения в треугольнике
        const radius = 150;
        const centerColors = ['#e74c3c', '#2ecc71', '#3498db'];
        
        for (let i = 0; i < 3; i++) {
          const angle = (i * Math.PI * 2) / 3;
          objects.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            vx: Math.sin(angle) * 1,
            vy: -Math.cos(angle) * 1,
            mass: 500,
            color: centerColors[i]
          });
        }
        
        // Добавляем планеты
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 250 + Math.random() * 150;
          objects.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            vx: Math.sin(angle) * (0.8 + Math.random() * 0.5),
            vy: -Math.cos(angle) * (0.8 + Math.random() * 0.5),
            mass: 2 + Math.random() * 8,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 6: Спиральная галактика
  private createSpiralGalaxyPreset(): Preset {
    return {
      name: "Спиральная галактика",
      description: "Объекты, расположенные по спирали с вращением вокруг центра",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Центральная черная дыра
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 5000,
          color: '#000000'
        });
        
        // Создаем спиральные рукава
        const numArms = 2;
        const numStarsPerArm = 25;
        
        for (let arm = 0; arm < numArms; arm++) {
          const armOffset = (arm * Math.PI * 2) / numArms;
          
          for (let i = 0; i < numStarsPerArm; i++) {
            const distance = 50 + i * 10;
            const angle = armOffset + i * 0.2;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            // Вычисляем скорость для стабильной орбиты
            const speed = Math.sqrt(0.5 * 5000 / distance) * 0.8;
            const vx = -Math.sin(angle) * speed;
            const vy = Math.cos(angle) * speed;
            
            objects.push({
              x: x,
              y: y,
              vx: vx,
              vy: vy,
              mass: 5 + Math.random() * 15,
              color: `hsl(${(i * 5) % 360}, 70%, 50%)`
            });
          }
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 7: Планетарная туманность
  private createPlanetaryNebulaPreset(): Preset {
    return {
      name: "Планетарная туманность",
      description: "Расширяющееся облако частиц вокруг центральной звезды",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Центральная звезда
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 1000,
          color: '#FFFFFF'
        });
        
        // Частицы туманности
        const numParticles = 50;
        
        for (let i = 0; i < numParticles; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 50 + Math.random() * 150;
          
          // Скорость направлена от центра
          const speed = 0.5 + Math.random() * 1.5;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;
          
          objects.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            vx: vx,
            vy: vy,
            mass: 1 + Math.random() * 5,
            color: `hsl(${180 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 8: Кольца Сатурна
  private createSaturnRingsPreset(): Preset {
    return {
      name: "Кольца Сатурна",
      description: "Планета с системой колец из мелких частиц",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Планета
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 2000,
          color: '#F4A460' // Песочный цвет
        });
        
        // Частицы колец
        const numRings = 4;
        const particlesPerRing = 40;
        
        for (let ring = 0; ring < numRings; ring++) {
          const ringRadius = 100 + ring * 20;
          
          for (let i = 0; i < particlesPerRing; i++) {
            const angle = (i * Math.PI * 2) / particlesPerRing;
            
            // Вычисляем скорость для стабильной орбиты
            const speed = Math.sqrt(0.5 * 2000 / ringRadius);
            const vx = -Math.sin(angle) * speed;
            const vy = Math.cos(angle) * speed;
            
            objects.push({
              x: centerX + Math.cos(angle) * ringRadius,
              y: centerY + Math.sin(angle) * ringRadius,
              vx: vx,
              vy: vy,
              mass: 1 + Math.random() * 3,
              color: `hsl(${40 + Math.random() * 20}, ${50 + Math.random() * 30}%, ${70 + Math.random() * 20}%)`
            });
          }
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 9: Взрыв сверхновой
  private createSupernovaPreset(): Preset {
    return {
      name: "Взрыв сверхновой",
      description: "Мощный взрыв звезды, разбрасывающий материю во все стороны",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Остаток сверхновой (нейтронная звезда)
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 3000,
          color: '#00FFFF' // Голубой
        });
        
        // Выброшенное вещество
        const numParticles = 100;
        
        for (let i = 0; i < numParticles; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 50;
          
          // Высокая скорость от центра
          const speed = 5 + Math.random() * 10;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;
          
          objects.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            vx: vx,
            vy: vy,
            mass: 2 + Math.random() * 8,
            color: `hsl(${Math.random() * 60}, 100%, ${50 + Math.random() * 50}%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 10: Гравитационная линза
  private createGravitationalLensPreset(): Preset {
    return {
      name: "Гравитационная линза",
      description: "Массивный объект искривляет траектории движения других тел",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Сверхмассивная черная дыра в центре
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 10000,
          color: '#000000' // Чёрный
        });
        
        // Поток частиц, проходящий мимо черной дыры
        const numParticles = 30;
        const startX = 0;
        const startY = centerY - 200;
        
        for (let i = 0; i < numParticles; i++) {
          const offsetY = -150 + i * 10;
          
          objects.push({
            x: startX,
            y: startY + offsetY,
            vx: 3,
            vy: 0,
            mass: 1,
            color: `hsl(${200 + i * 5}, 80%, 60%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 11: Пульсар
  private createPulsarPreset(): Preset {
    return {
      name: "Пульсар",
      description: "Быстро вращающаяся нейтронная звезда, испускающая регулярные импульсы частиц",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Нейтронная звезда (пульсар)
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 2000,
          color: '#00FFFF' // Голубой цвет
        });
        
        // Создание пульсаций (лучей) частиц
        const numRays = 2; // Два противоположных луча
        const particlesPerRay = 15;
        
        for (let ray = 0; ray < numRays; ray++) {
          const rayAngle = (ray * Math.PI);
          
          for (let i = 0; i < particlesPerRay; i++) {
            const distance = 80 + i * 30;
            const speed = 2 + i * 0.2;
            
            objects.push({
              x: centerX + Math.cos(rayAngle) * distance,
              y: centerY + Math.sin(rayAngle) * distance,
              vx: Math.cos(rayAngle) * speed,
              vy: Math.sin(rayAngle) * speed,
              mass: 1,
              color: `hsl(180, 100%, ${70 - i * 2}%)`
            });
          }
        }
        
        // Добавление окружающих объектов для взаимодействия
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 250 + Math.random() * 150;
          
          // Скорость для стабильной орбиты
          const speed = Math.sqrt(0.5 * 2000 / distance);
          const vx = -Math.sin(angle) * speed;
          const vy = Math.cos(angle) * speed;
          
          objects.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            vx: vx,
            vy: vy,
            mass: 2 + Math.random() * 5,
            color: `hsl(${200 + Math.random() * 40}, 80%, 60%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 12: Протопланетный диск
  private createProtoplanetaryDiskPreset(): Preset {
    return {
      name: "Протопланетный диск",
      description: "Вращающийся диск газа и пыли вокруг молодой звезды, формирующий планеты",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Молодая звезда в центре
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 1500,
          color: '#F9D71C' // Ярко-жёлтый
        });
        
        // Создание диска из частиц пыли и газа
        const numRings = 5;
        const particlesPerRing = 30;
        
        for (let ring = 0; ring < numRings; ring++) {
          const ringRadius = 80 + ring * 40;
          
          for (let i = 0; i < particlesPerRing; i++) {
            const angle = (i * Math.PI * 2) / particlesPerRing + (Math.random() * 0.2);
            
            // Скорость для стабильной орбиты с небольшими отклонениями
            const baseSpeed = Math.sqrt(0.5 * 1500 / ringRadius);
            const speed = baseSpeed * (0.9 + Math.random() * 0.2);
            const vx = -Math.sin(angle) * speed;
            const vy = Math.cos(angle) * speed;
            
            // Масса уменьшается с увеличением расстояния от центра
            const mass = 3 + Math.random() * 4 - ring * 0.5;
            
            objects.push({
              x: centerX + Math.cos(angle) * ringRadius * (0.95 + Math.random() * 0.1),
              y: centerY + Math.sin(angle) * ringRadius * (0.95 + Math.random() * 0.1),
              vx: vx,
              vy: vy,
              mass: Math.max(0.5, mass),
              color: `hsl(${30 + Math.random() * 30}, ${70 + Math.random() * 30}%, ${50 + Math.random() * 30}%)`
            });
          }
        }
        
        // Добавление нескольких протопланет (более крупных скоплений)
        for (let i = 0; i < 4; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 120 + i * 60;
          
          // Скорость для стабильной орбиты
          const speed = Math.sqrt(0.5 * 1500 / distance);
          const vx = -Math.sin(angle) * speed;
          const vy = Math.cos(angle) * speed;
          
          objects.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            vx: vx,
            vy: vy,
            mass: 15 + Math.random() * 15,
            color: `hsl(${40 + i * 20}, 80%, 50%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 13: Шаровое звёздное скопление
  private createGlobularClusterPreset(): Preset {
    return {
      name: "Шаровое звёздное скопление",
      description: "Плотная группа старых звёзд, удерживаемых общей гравитацией",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Параметры скопления
        const clusterRadius = 200;
        const numStars = 100;
        
        // Массивное ядро в центре скопления
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 1000,
          color: '#FFEC8B' // Светло-золотистый
        });
        
        // Создание звёзд с распределением плотности, уменьшающимся от центра
        for (let i = 0; i < numStars; i++) {
          // Используем распределение плотности, при котором больше звёзд ближе к центру
          const radius = clusterRadius * Math.pow(Math.random(), 2);
          const angle = Math.random() * Math.PI * 2;
          
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          // Скорость задаём так, чтобы звёзды двигались в случайных направлениях
          // Но при этом звёзды ближе к центру должны двигаться быстрее
          const speed = 0.5 + Math.random() * 1.5 * (1 - radius / clusterRadius);
          const moveAngle = Math.random() * Math.PI * 2;
          const vx = Math.cos(moveAngle) * speed;
          const vy = Math.sin(moveAngle) * speed;
          
          // Более старые звёзды имеют различные оттенки от желтого до красного
          const hue = 30 + Math.random() * 30;
          const saturation = 70 + Math.random() * 30;
          const lightness = 70 + Math.random() * 20;
          
          objects.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            mass: 3 + Math.random() * 7,
            color: `hsl(${hue}, ${saturation}%, ${lightness}%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 14: Небесный балет
  private createCelestialBalletPreset(): Preset {
    return {
      name: "Небесный балет",
      description: "Три массивных тела вращаются по сложным орбитам друг вокруг друга",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Три массивных объекта, образующих треугольник
        const radius = 120;
        const starColors = ['#FF5E5E', '#5EFFAD', '#5EA1FF']; // Красный, зеленый, синий
        const starMasses = [800, 800, 800];
        
        for (let i = 0; i < 3; i++) {
          const angle = (i * Math.PI * 2) / 3;
          
          // Скорость перпендикулярна радиусу для создания вращения
          const speed = 1.3;
          const vx = -Math.sin(angle) * speed;
          const vy = Math.cos(angle) * speed;
          
          objects.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            vx: vx,
            vy: vy,
            mass: starMasses[i],
            color: starColors[i]
          });
        }
        
        // Добавление малых тел, сопровождающих основные звёзды
        for (let star = 0; star < 3; star++) {
          const starAngle = (star * Math.PI * 2) / 3;
          const starX = centerX + Math.cos(starAngle) * radius;
          const starY = centerY + Math.sin(starAngle) * radius;
          const starVx = -Math.sin(starAngle) * 1.3;
          const starVy = Math.cos(starAngle) * 1.3;
          
          // Добавляем 5 малых тел вокруг каждой звезды
          for (let i = 0; i < 5; i++) {
            const satelliteRadius = 20 + i * 10;
            const satelliteAngle = Math.random() * Math.PI * 2;
            
            // Вычисляем скорость для стабильной орбиты вокруг звезды
            const satelliteSpeed = Math.sqrt(0.5 * starMasses[star] / satelliteRadius) * 0.8;
            
            // Суммируем скорость звезды и орбитальную скорость спутника
            const satelliteVx = starVx - Math.sin(satelliteAngle) * satelliteSpeed;
            const satelliteVy = starVy + Math.cos(satelliteAngle) * satelliteSpeed;
            
            objects.push({
              x: starX + Math.cos(satelliteAngle) * satelliteRadius,
              y: starY + Math.sin(satelliteAngle) * satelliteRadius,
              vx: satelliteVx,
              vy: satelliteVy,
              mass: 2 + Math.random() * 5,
              color: `hsl(${(star * 120) + Math.random() * 30}, 80%, 70%)`
            });
          }
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 15: Межзвёздный странник
  private createInterstellarWandererPreset(): Preset {
    return {
      name: "Межзвёздный странник",
      description: "Массивный объект пролетает через систему и нарушает орбиты других тел",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Центральная звезда
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 1500,
          color: '#FFD700' // Золотой
        });
        
        // Стабильная система планет
        const numPlanets = 6;
        const planetColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f39c12', '#1abc9c'];
        
        for (let i = 0; i < numPlanets; i++) {
          const distance = 100 + i * 40;
          const angle = Math.random() * Math.PI * 2;
          
          // Скорость для стабильной орбиты
          const speed = Math.sqrt(0.5 * 1500 / distance);
          const vx = -Math.sin(angle) * speed;
          const vy = Math.cos(angle) * speed;
          
          objects.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            vx: vx,
            vy: vy,
            mass: 10 + Math.random() * 20,
            color: planetColors[i]
          });
        }
        
        // Добавление межзвёздного странника - массивного объекта с большой скоростью
        const intruderDistance = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)) / 2;
        const intruderAngle = Math.PI / 4; // Направление из левого нижнего угла в правый верхний
        const intruderX = centerX - Math.cos(intruderAngle) * intruderDistance;
        const intruderY = centerY - Math.sin(intruderAngle) * intruderDistance;
        
        objects.push({
          x: intruderX,
          y: intruderY,
          vx: Math.cos(intruderAngle) * 3,
          vy: Math.sin(intruderAngle) * 3,
          mass: 2000,
          color: '#34495e' // Тёмно-синий
        });
        
        // Облако пыли, сопровождающее странника
        for (let i = 0; i < 15; i++) {
          const dustAngle = Math.random() * Math.PI * 2;
          const dustDistance = 20 + Math.random() * 30;
          const dustX = intruderX + Math.cos(dustAngle) * dustDistance;
          const dustY = intruderY + Math.sin(dustAngle) * dustDistance;
          
          objects.push({
            x: dustX,
            y: dustY,
            vx: Math.cos(intruderAngle) * 3 + (Math.random() - 0.5) * 0.5,
            vy: Math.sin(intruderAngle) * 3 + (Math.random() - 0.5) * 0.5,
            mass: 1 + Math.random() * 3,
            color: `hsl(220, 30%, ${50 + Math.random() * 30}%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 16: Гравитационный маятник
  private createGravitationalPendulumPreset(): Preset {
    return {
      name: "Гравитационный маятник",
      description: "Объекты, совершающие колебательные движения под действием гравитации",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Два массивных неподвижных центра гравитации на одинаковом расстоянии от центра экрана
        const anchorDistance = 200;
        const anchorMass = 1500;
        
        // Первый якорь (слева)
        objects.push({
          x: centerX - anchorDistance,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: anchorMass,
          color: '#FF5555' // Красный
        });
        
        // Второй якорь (справа)
        objects.push({
          x: centerX + anchorDistance,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: anchorMass,
          color: '#5555FF' // Синий
        });
        
        // Маятники между якорями
        const numPendulums = 5;
        
        for (let i = 0; i < numPendulums; i++) {
          // Размещаем маятники между двумя центрами с небольшими отклонениями
          const pendulumX = centerX + (Math.random() - 0.5) * 50;
          const pendulumY = centerY - 150 + i * 75;
          
          // Начальная скорость перпендикулярна линии между якорями
          const initialSpeed = 0.5 + i * 0.3;
          
          objects.push({
            x: pendulumX,
            y: pendulumY,
            vx: 0,
            vy: initialSpeed,
            mass: 15 + i * 5,
            color: `hsl(${(i * 60) % 360}, 80%, 60%)`
          });
          
          // Добавляем "хвост" из мелких частиц для визуального эффекта
          for (let j = 0; j < 8; j++) {
            const trailDistance = 5 + j * 3;
            const trailX = pendulumX;
            const trailY = pendulumY - trailDistance;
            
            objects.push({
              x: trailX,
              y: trailY,
              vx: 0,
              vy: initialSpeed * 0.8,
              mass: 1,
              color: `hsl(${(i * 60) % 360}, ${80 - j * 8}%, ${60 + j * 4}%)`
            });
          }
        }
        
        // Создаем систему маятников в вертикальном положении
        const verticalPendulums = 3;
        const verticalDistance = 120;
        
        for (let i = 0; i < verticalPendulums; i++) {
          const pendulumX = centerX - verticalDistance + i * verticalDistance;
          const pendulumY = centerY + 150;
          
          // Направление начальной скорости чередуется
          const direction = i % 2 === 0 ? 1 : -1;
          const initialSpeed = 1.2 * direction;
          
          objects.push({
            x: pendulumX,
            y: pendulumY,
            vx: initialSpeed,
            vy: 0,
            mass: 20,
            color: `hsl(${180 + i * 40}, 80%, 60%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 17: Аккреционный диск чёрной дыры
  private createBlackHoleAccretionDiskPreset(): Preset {
    return {
      name: "Аккреционный диск чёрной дыры",
      description: "Сверхмассивная чёрная дыра с вращающимся вокруг неё диском материи",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Чёрная дыра в центре
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 5000,
          color: '#000000' // Чёрный
        });
        
        // Создаем аккреционный диск
        const numRings = 8;
        const particlesPerRing = 30;
        const minRadius = 60;
        const maxRadius = 250;
        
        for (let ring = 0; ring < numRings; ring++) {
          const radius = minRadius + (maxRadius - minRadius) * (ring / (numRings - 1));
          
          // Скорость частиц увеличивается ближе к чёрной дыре
          const baseSpeed = Math.sqrt(0.5 * 5000 / radius) * 0.9;
          
          // Температура (цвет) увеличивается ближе к чёрной дыре
          const temperature = 60 - Math.floor(50 * (ring / (numRings - 1)));
          
          for (let i = 0; i < particlesPerRing; i++) {
            const angle = (i * Math.PI * 2) / particlesPerRing;
            
            // Добавляем небольшие случайные отклонения для более реалистичного вида
            const radiusVariation = radius * (1 + (Math.random() - 0.5) * 0.1);
            const x = centerX + Math.cos(angle) * radiusVariation;
            const y = centerY + Math.sin(angle) * radiusVariation;
            
            // Скорость перпендикулярна радиусу для создания вращения
            const speedVariation = baseSpeed * (1 + (Math.random() - 0.5) * 0.2);
            const vx = -Math.sin(angle) * speedVariation;
            const vy = Math.cos(angle) * speedVariation;
            
            // Масса частиц уменьшается с увеличением радиуса
            const particleMass = 5 + (numRings - ring) * 2;
            
            // Цвет меняется от белого/голубого (горячего) ближе к центру до красного (холодного) дальше от центра
            const hue = temperature;
            const saturation = 100;
            const lightness = 70 - ring * 3;
            
            objects.push({
              x: x,
              y: y,
              vx: vx,
              vy: vy,
              mass: particleMass,
              color: `hsl(${hue}, ${saturation}%, ${lightness}%)`
            });
          }
        }
        
        // Добавляем джеты - струи частиц, вылетающие перпендикулярно диску
        const jetLength = 400;
        const jetParticles = 20;
        
        for (let direction = -1; direction <= 1; direction += 2) {
          for (let i = 0; i < jetParticles; i++) {
            const distance = 20 + (i / jetParticles) * jetLength;
            const spread = 10 + (i / jetParticles) * 15;
            const offsetX = (Math.random() - 0.5) * spread;
            const offsetY = (Math.random() - 0.5) * spread;
            
            // Скорость увеличивается с расстоянием от центра
            const speed = 1 + (i / jetParticles) * 3;
            
            objects.push({
              x: centerX + offsetX,
              y: centerY + offsetY + direction * distance,
              vx: offsetX * 0.01,
              vy: direction * speed,
              mass: 2,
              color: `hsl(240, 80%, ${70 + i}%)`
            });
          }
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 18: Космический фонтан
  private createCosmicFountainPreset(): Preset {
    return {
      name: "Космический фонтан",
      description: "Частицы выбрасываются из центра и падают обратно под действием гравитации",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Массивный центральный объект
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 2000,
          color: '#FFFFFF' // Белый
        });
        
        // Создаем "фонтан" частиц
        const numParticles = 100;
        const maxInitialSpeed = 5;
        const minInitialSpeed = 2;
        
        for (let i = 0; i < numParticles; i++) {
          // Случайный угол выброса
          const angle = Math.random() * Math.PI * 2;
          
          // Начальное расстояние от центра
          const initialDistance = 30 + Math.random() * 20;
          const x = centerX + Math.cos(angle) * initialDistance;
          const y = centerY + Math.sin(angle) * initialDistance;
          
          // Начальная скорость - от центра
          const initialSpeed = minInitialSpeed + Math.random() * (maxInitialSpeed - minInitialSpeed);
          const vx = Math.cos(angle) * initialSpeed;
          const vy = Math.sin(angle) * initialSpeed;
          
          // Масса частиц
          const mass = 1 + Math.random() * 5;
          
          // Цвет зависит от скорости и угла
          const hue = (angle * 180 / Math.PI) % 360;
          const saturation = 80 + Math.random() * 20;
          const lightness = 50 + Math.random() * 30;
          
          objects.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            mass: mass,
            color: `hsl(${hue}, ${saturation}%, ${lightness}%)`
          });
        }
        
        // Добавляем несколько "коллекторов" - объектов, которые будут притягивать частицы
        const numCollectors = 4;
        const collectorDistance = 200;
        
        for (let i = 0; i < numCollectors; i++) {
          const angle = (i * Math.PI * 2) / numCollectors;
          const x = centerX + Math.cos(angle) * collectorDistance;
          const y = centerY + Math.sin(angle) * collectorDistance;
          
          objects.push({
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            mass: 300,
            color: `hsl(${i * 90}, 100%, 70%)`
          });
          
          // Добавляем орбитальные частицы вокруг коллекторов
          const numOrbitalParticles = 5;
          
          for (let j = 0; j < numOrbitalParticles; j++) {
            const orbitalRadius = 20 + j * 5;
            const orbitalAngle = Math.random() * Math.PI * 2;
            const orbitalX = x + Math.cos(orbitalAngle) * orbitalRadius;
            const orbitalY = y + Math.sin(orbitalAngle) * orbitalRadius;
            
            // Скорость для стабильной орбиты
            const orbitalSpeed = Math.sqrt(0.5 * 300 / orbitalRadius);
            const orbitalVx = -Math.sin(orbitalAngle) * orbitalSpeed;
            const orbitalVy = Math.cos(orbitalAngle) * orbitalSpeed;
            
            objects.push({
              x: orbitalX,
              y: orbitalY,
              vx: orbitalVx,
              vy: orbitalVy,
              mass: 2,
              color: `hsl(${i * 90}, 80%, 85%)`
            });
          }
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 19: Гравитационные волны
  private createGravitationalWavesPreset(): Preset {
    return {
      name: "Гравитационные волны",
      description: "Визуализация гравитационных волн от слияния двух массивных объектов",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Два массивных объекта, сближающиеся по спирали
        const initialDistance = 100;
        const initialSpeed = 1.5;
        
        // Первый объект
        objects.push({
          x: centerX - initialDistance / 2,
          y: centerY,
          vx: 0,
          vy: -initialSpeed,
          mass: 1000,
          color: '#3498db' // Синий
        });
        
        // Второй объект
        objects.push({
          x: centerX + initialDistance / 2,
          y: centerY,
          vx: 0,
          vy: initialSpeed,
          mass: 1000,
          color: '#e74c3c' // Красный
        });
        
        // Создаем "волны" частиц в виде концентрических кругов
        const numWaves = 5;
        const particlesPerWave = 40;
        const waveSpacing = 50;
        
        for (let wave = 0; wave < numWaves; wave++) {
          const radius = 150 + wave * waveSpacing;
          
          for (let i = 0; i < particlesPerWave; i++) {
            const angle = (i * Math.PI * 2) / particlesPerWave;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Радиальная скорость - частицы медленно движутся от центра
            const radialSpeed = 0.2 + wave * 0.1;
            const vx = Math.cos(angle) * radialSpeed;
            const vy = Math.sin(angle) * radialSpeed;
            
            // Масса частиц уменьшается с увеличением радиуса
            const mass = 3 - wave * 0.5;
            
            // Цвет меняется от волны к волне
            const hue = (wave * 30) % 360;
            const saturation = 70;
            const lightness = 60;
            
            objects.push({
              x: x,
              y: y,
              vx: vx,
              vy: vy,
              mass: Math.max(1, mass),
              color: `hsl(${hue}, ${saturation}%, ${lightness}%)`
            });
          }
        }
        
        // Добавляем "детекторы" гравитационных волн - неподвижные объекты на периферии
        const numDetectors = 6;
        const detectorDistance = 350;
        
        for (let i = 0; i < numDetectors; i++) {
          const angle = (i * Math.PI * 2) / numDetectors;
          const x = centerX + Math.cos(angle) * detectorDistance;
          const y = centerY + Math.sin(angle) * detectorDistance;
          
          objects.push({
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            mass: 50,
            color: '#9b59b6' // Фиолетовый
          });
          
          // Добавляем "измерительные" частицы вокруг детекторов
          const measurementParticles = 8;
          const measurementRadius = 20;
          
          for (let j = 0; j < measurementParticles; j++) {
            const measurementAngle = (j * Math.PI * 2) / measurementParticles;
            const measurementX = x + Math.cos(measurementAngle) * measurementRadius;
            const measurementY = y + Math.sin(measurementAngle) * measurementRadius;
            
            objects.push({
              x: measurementX,
              y: measurementY,
              vx: 0,
              vy: 0,
              mass: 1,
              color: '#ecf0f1' // Светло-серый
            });
          }
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 20: Экзопланетная система
  private createExoplanetarySystemPreset(): Preset {
    return {
      name: "Экзопланетная система",
      description: "Необычная планетная система с двумя звёздами и экзотическими планетами",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Две звезды в центре системы
        const starDistance = 80;
        const starMass1 = 1200;
        const starMass2 = 800;
        
        // Первая звезда (оранжевая)
        objects.push({
          x: centerX - starDistance / 2,
          y: centerY,
          vx: 0,
          vy: -Math.sqrt(0.5 * starMass2 / starDistance) * 0.8,
          mass: starMass1,
          color: '#FF7F00' // Оранжевый
        });
        
        // Вторая звезда (голубая)
        objects.push({
          x: centerX + starDistance / 2,
          y: centerY,
          vx: 0,
          vy: Math.sqrt(0.5 * starMass1 / starDistance) * 0.8,
          mass: starMass2,
          color: '#00BFFF' // Голубой
        });
        
        // Создаем экзотические планеты
        const numPlanets = 7;
        const planetColors = [
          '#9C27B0', // Фиолетовый
          '#4CAF50', // Зеленый
          '#F44336', // Красный
          '#FFEB3B', // Желтый
          '#607D8B', // Серо-голубой
          '#FF5722', // Оранжево-красный
          '#2196F3'  // Синий
        ];
        
        const planetNames = [
          "Кристаллис", // Планета с кристаллической поверхностью
          "Аквария",    // Водный мир
          "Вулканус",   // Вулканическая планета
          "Аурея",      // Планета с золотыми облаками
          "Нибулон",    // Газовый гигант с туманностями
          "Игнис",      // Огненная планета
          "Гелиос"      // Планета с вечным днем
        ];
        
        for (let i = 0; i < numPlanets; i++) {
          // Расстояние от центра системы (между звездами)
          const distance = 150 + i * 60;
          
          // Случайный угол для начального положения
          const angle = Math.random() * Math.PI * 2;
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          
          // Скорость для стабильной орбиты вокруг центра масс двух звезд
          const totalMass = starMass1 + starMass2;
          const speed = Math.sqrt(0.5 * totalMass / distance) * 0.9;
          const vx = -Math.sin(angle) * speed;
          const vy = Math.cos(angle) * speed;
          
          // Масса планеты
          const planetMass = 10 + Math.random() * 40;
          
          objects.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            mass: planetMass,
            color: planetColors[i]
          });
          
          // Добавляем спутники для некоторых планет
          if (i % 2 === 0) {
            const numMoons = 1 + Math.floor(Math.random() * 3);
            
            for (let j = 0; j < numMoons; j++) {
              const moonDistance = 15 + j * 10;
              const moonAngle = Math.random() * Math.PI * 2;
              const moonX = x + Math.cos(moonAngle) * moonDistance;
              const moonY = y + Math.sin(moonAngle) * moonDistance;
              
              // Скорость для стабильной орбиты вокруг планеты
              const moonSpeed = Math.sqrt(0.5 * planetMass / moonDistance) * 0.9;
              const moonVx = vx - Math.sin(moonAngle) * moonSpeed;
              const moonVy = vy + Math.cos(moonAngle) * moonSpeed;
              
              objects.push({
                x: moonX,
                y: moonY,
                vx: moonVx,
                vy: moonVy,
                mass: 2 + Math.random() * 3,
                color: `hsl(${parseInt(planetColors[i].slice(1), 16) % 360}, 70%, 85%)`
              });
            }
          }
        }
        
        // Добавляем пояс астероидов
        const numAsteroids = 30;
        const asteroidBeltRadius = 400;
        const asteroidBeltWidth = 50;
        
        for (let i = 0; i < numAsteroids; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = asteroidBeltRadius + (Math.random() - 0.5) * asteroidBeltWidth;
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          
          // Скорость для почти стабильной орбиты с небольшими вариациями
          const baseSpeed = Math.sqrt(0.5 * (starMass1 + starMass2) / distance);
          const speed = baseSpeed * (0.9 + Math.random() * 0.2);
          const vx = -Math.sin(angle) * speed;
          const vy = Math.cos(angle) * speed;
          
          objects.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            mass: 1 + Math.random() * 2,
            color: `hsl(${30 + Math.random() * 30}, 80%, 60%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 21: Космические нити
  private createCosmicFilamentsPreset(): Preset {
    return {
      name: "Космические нити",
      description: "Нитевидные структуры из материи, соединяющие галактические скопления",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Создаем несколько галактических скоплений, соединенных нитями
        const numClusters = 4;
        const clusterRadius = 300;
        
        // Массивы для хранения центров скоплений
        const clusterCentersX = [];
        const clusterCentersY = [];
        const clusterMasses = [];
        
        // Создаем центры скоплений
        for (let i = 0; i < numClusters; i++) {
          const angle = (i * Math.PI * 2) / numClusters;
          const x = centerX + Math.cos(angle) * clusterRadius;
          const y = centerY + Math.sin(angle) * clusterRadius;
          const mass = 2000 + Math.random() * 1000;
          
          clusterCentersX.push(x);
          clusterCentersY.push(y);
          clusterMasses.push(mass);
          
          // Добавляем центральный объект скопления
          objects.push({
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            mass: mass,
            color: `hsl(${i * 90}, 100%, 70%)`
          });
          
          // Добавляем галактики вокруг центра скопления
          const numGalaxies = 8 + Math.floor(Math.random() * 5);
          
          for (let j = 0; j < numGalaxies; j++) {
            const galaxyDistance = 50 + Math.random() * 80;
            const galaxyAngle = Math.random() * Math.PI * 2;
            const galaxyX = x + Math.cos(galaxyAngle) * galaxyDistance;
            const galaxyY = y + Math.sin(galaxyAngle) * galaxyDistance;
            
            // Скорость для орбиты вокруг центра скопления
            const galaxySpeed = Math.sqrt(0.5 * mass / galaxyDistance) * 0.8;
            const galaxyVx = -Math.sin(galaxyAngle) * galaxySpeed;
            const galaxyVy = Math.cos(galaxyAngle) * galaxySpeed;
            
            objects.push({
              x: galaxyX,
              y: galaxyY,
              vx: galaxyVx,
              vy: galaxyVy,
              mass: 50 + Math.random() * 100,
              color: `hsl(${i * 90 + Math.random() * 30}, 80%, 60%)`
            });
          }
        }
        
        // Создаем нити между скоплениями
        for (let i = 0; i < numClusters; i++) {
          const nextCluster = (i + 1) % numClusters;
          
          // Координаты начала и конца нити
          const x1 = clusterCentersX[i];
          const y1 = clusterCentersY[i];
          const x2 = clusterCentersX[nextCluster];
          const y2 = clusterCentersY[nextCluster];
          
          // Длина нити
          const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          
          // Угол нити
          const angle = Math.atan2(y2 - y1, x2 - x1);
          
          // Создаем частицы вдоль нити
          const numParticles = Math.floor(length / 15);
          
          for (let j = 0; j < numParticles; j++) {
            // Позиция вдоль нити с небольшим случайным отклонением
            const ratio = j / (numParticles - 1);
            const offsetX = (Math.random() - 0.5) * 30;
            const offsetY = (Math.random() - 0.5) * 30;
            
            const x = x1 + (x2 - x1) * ratio + offsetX;
            const y = y1 + (y2 - y1) * ratio + offsetY;
            
            // Скорость - небольшое движение перпендикулярно нити
            const perpAngle = angle + Math.PI / 2;
            const speed = (Math.random() - 0.5) * 0.3;
            const vx = Math.cos(perpAngle) * speed;
            const vy = Math.sin(perpAngle) * speed;
            
            objects.push({
              x: x,
              y: y,
              vx: vx,
              vy: vy,
              mass: 5 + Math.random() * 10,
              color: `hsl(${(i * 90 + 45) % 360}, 70%, 70%)`
            });
          }
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 22: Звёздный рой
  private createStarSwarmPreset(): Preset {
    return {
      name: "Звёздный рой",
      description: "Плотное скопление звёзд, движущихся как единый организм",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Параметры роя
        const numStars = 100;
        const swarmRadius = 200;
        const swarmCohesion = 0.8; // Насколько сильно звёзды стремятся к центру роя
        
        // Направление движения роя
        const swarmAngle = Math.PI / 4; // Направление движения роя (45 градусов)
        const swarmSpeed = 1.0; // Базовая скорость роя
        const swarmVx = Math.cos(swarmAngle) * swarmSpeed;
        const swarmVy = Math.sin(swarmAngle) * swarmSpeed;
        
        // Создаем звёзды роя
        for (let i = 0; i < numStars; i++) {
          // Распределяем звёзды в форме эллипса, вытянутого в направлении движения
          const angle = Math.random() * Math.PI * 2;
          const distanceFromCenter = Math.random() * swarmRadius;
          
          // Создаем эффект вытянутости в направлении движения
          const stretchFactor = 1.5;
          const stretchedX = Math.cos(angle) * distanceFromCenter * 
                            (Math.abs(Math.cos(angle - swarmAngle)) * (stretchFactor - 1) + 1);
          const stretchedY = Math.sin(angle) * distanceFromCenter * 
                            (Math.abs(Math.sin(angle - swarmAngle)) * (stretchFactor - 1) + 1);
          
          const x = centerX + stretchedX;
          const y = centerY + stretchedY;
          
          // Скорость звезды - базовая скорость роя плюс случайные вариации
          // Звёзды ближе к центру движутся более согласованно
          const cohesionFactor = 1 - (distanceFromCenter / swarmRadius) * (1 - swarmCohesion);
          const randomFactor = 1 - cohesionFactor;
          
          const vx = swarmVx * cohesionFactor + (Math.random() - 0.5) * randomFactor;
          const vy = swarmVy * cohesionFactor + (Math.random() - 0.5) * randomFactor;
          
          // Масса и цвет звезды
          const mass = 5 + Math.random() * 15;
          
          // Цвет зависит от положения в рое - центральные звёзды более яркие
          const brightness = 50 + (1 - distanceFromCenter / swarmRadius) * 40;
          const hue = 200 + Math.random() * 40; // Оттенки синего
          
          objects.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            mass: mass,
            color: `hsl(${hue}, 80%, ${brightness}%)`
          });
        }
        
        // Добавляем "королеву роя" - массивную звезду в центре
        objects.push({
          x: centerX,
          y: centerY,
          vx: swarmVx * 1.2, // Королева движется немного быстрее
          vy: swarmVy * 1.2,
          mass: 200,
          color: '#FFFFFF' // Белая звезда
        });
        
        // Добавляем "охотников" - звёзды, которые следуют за роем
        const numHunters = 5;
        const hunterDistance = 300;
        
        for (let i = 0; i < numHunters; i++) {
          // Размещаем охотников позади роя
          const hunterAngle = swarmAngle + Math.PI + (Math.random() - 0.5) * Math.PI / 2;
          const x = centerX + Math.cos(hunterAngle) * hunterDistance;
          const y = centerY + Math.sin(hunterAngle) * hunterDistance;
          
          // Скорость охотников - в направлении роя, но быстрее
          const hunterSpeed = swarmSpeed * 1.5;
          const vx = Math.cos(swarmAngle) * hunterSpeed;
          const vy = Math.sin(swarmAngle) * hunterSpeed;
          
          objects.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            mass: 100,
            color: '#FF4500' // Оранжево-красный
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 23: Планетарная миграция
  private createPlanetaryMigrationPreset(): Preset {
    return {
      name: "Планетарная миграция",
      description: "Планеты меняют свои орбиты под влиянием гравитационных взаимодействий",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Центральная звезда
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 2000,
          color: '#FFCC00' // Жёлтая звезда
        });
        
        // Создаем планеты на нестабильных орбитах
        const numPlanets = 8;
        const planetColors = [
          '#3498db', // Синий
          '#2ecc71', // Зеленый
          '#e74c3c', // Красный
          '#9b59b6', // Фиолетовый
          '#f39c12', // Оранжевый
          '#1abc9c', // Бирюзовый
          '#d35400', // Темно-оранжевый
          '#8e44ad'  // Темно-фиолетовый
        ];
        
        // Создаем планеты с близкими орбитами, что приведет к миграции
        for (let i = 0; i < numPlanets; i++) {
          // Расстояние от звезды - планеты расположены близко друг к другу
          const baseDistance = 100;
          const distance = baseDistance + i * 30;
          
          // Начальный угол
          const angle = (i * Math.PI * 2) / numPlanets;
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          
          // Скорость для почти круговой орбиты
          // Добавляем небольшие вариации для создания нестабильности
          const baseSpeed = Math.sqrt(0.5 * 2000 / distance);
          const speedVariation = 1 + (Math.random() - 0.5) * 0.1;
          const speed = baseSpeed * speedVariation;
          
          // Добавляем небольшую радиальную составляющую скорости
          const radialFactor = (Math.random() - 0.5) * 0.1;
          const vx = -Math.sin(angle) * speed + Math.cos(angle) * radialFactor;
          const vy = Math.cos(angle) * speed + Math.sin(angle) * radialFactor;
          
          // Масса планеты - чередуем массивные и легкие планеты
          const planetMass = (i % 2 === 0) ? 50 + Math.random() * 30 : 10 + Math.random() * 10;
          
          objects.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            mass: planetMass,
            color: planetColors[i]
          });
          
          // Добавляем спутники для некоторых планет
          if (i % 3 === 0) {
            const numMoons = 1 + Math.floor(Math.random() * 2);
            
            for (let j = 0; j < numMoons; j++) {
              const moonDistance = 15 + j * 8;
              const moonAngle = Math.random() * Math.PI * 2;
              const moonX = x + Math.cos(moonAngle) * moonDistance;
              const moonY = y + Math.sin(moonAngle) * moonDistance;
              
              // Скорость для орбиты вокруг планеты
              const moonSpeed = Math.sqrt(0.5 * planetMass / moonDistance);
              const moonVx = vx - Math.sin(moonAngle) * moonSpeed;
              const moonVy = vy + Math.cos(moonAngle) * moonSpeed;
              
              objects.push({
                x: moonX,
                y: moonY,
                vx: moonVx,
                vy: moonVy,
                mass: 1 + Math.random() * 2,
                color: `hsl(${parseInt(planetColors[i].slice(1), 16) % 360}, 50%, 80%)`
              });
            }
          }
        }
        
        // Добавляем массивную внешнюю планету, которая будет влиять на миграцию
        const outerPlanetDistance = 400;
        const outerPlanetAngle = Math.random() * Math.PI * 2;
        const outerPlanetX = centerX + Math.cos(outerPlanetAngle) * outerPlanetDistance;
        const outerPlanetY = centerY + Math.sin(outerPlanetAngle) * outerPlanetDistance;
        
        // Скорость для стабильной орбиты
        const outerPlanetSpeed = Math.sqrt(0.5 * 2000 / outerPlanetDistance) * 0.95;
        const outerPlanetVx = -Math.sin(outerPlanetAngle) * outerPlanetSpeed;
        const outerPlanetVy = Math.cos(outerPlanetAngle) * outerPlanetSpeed;
        
        objects.push({
          x: outerPlanetX,
          y: outerPlanetY,
          vx: outerPlanetVx,
          vy: outerPlanetVy,
          mass: 300,
          color: '#FF5722' // Оранжево-красный
        });
        
        return objects;
      }
    };
  }
  
  // Пресет 24: Галактический каннибализм
  private createGalacticCannibalismPreset(): Preset {
    return {
      name: "Галактический каннибализм",
      description: "Большая галактика поглощает меньшую в космическом столкновении",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Параметры для большой галактики
        const mainGalaxyX = centerX - 150;
        const mainGalaxyY = centerY;
        const mainGalaxyMass = 5000;
        const mainGalaxyRadius = 200;
        const mainGalaxyColor = '#FFCC00'; // Жёлтый
        
        // Параметры для малой галактики
        const smallGalaxyX = centerX + 300;
        const smallGalaxyY = centerY + 100;
        const smallGalaxyMass = 1500;
        const smallGalaxyRadius = 100;
        const smallGalaxyColor = '#3498DB'; // Синий
        
        // Скорость малой галактики - движется к большой
        const smallGalaxyVx = -1.0;
        const smallGalaxyVy = -0.3;
        
        // Создаем центр большой галактики
        objects.push({
          x: mainGalaxyX,
          y: mainGalaxyY,
          vx: 0,
          vy: 0,
          mass: mainGalaxyMass,
          color: mainGalaxyColor
        });
        
        // Создаем звезды большой галактики
        const mainGalaxyStars = 120;
        
        for (let i = 0; i < mainGalaxyStars; i++) {
          // Распределяем звезды по спирали
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * mainGalaxyRadius;
          
          // Добавляем спиральную структуру
          const spiralFactor = 0.5;
          const spiralAngle = angle + distance * spiralFactor / mainGalaxyRadius;
          
          const x = mainGalaxyX + Math.cos(spiralAngle) * distance;
          const y = mainGalaxyY + Math.sin(spiralAngle) * distance;
          
          // Скорость для вращения галактики
          const speed = Math.sqrt(0.5 * mainGalaxyMass / distance) * 0.3;
          const vx = -Math.sin(spiralAngle) * speed;
          const vy = Math.cos(spiralAngle) * speed;
          
          // Масса звезды
          const starMass = 2 + Math.random() * 8;
          
          // Цвет зависит от расстояния до центра
          const brightness = 70 + (distance / mainGalaxyRadius) * 20;
          const hue = 50 - (distance / mainGalaxyRadius) * 30;
          
          objects.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            mass: starMass,
            color: `hsl(${hue}, 100%, ${brightness}%)`
          });
        }
        
        // Создаем центр малой галактики
        objects.push({
          x: smallGalaxyX,
          y: smallGalaxyY,
          vx: smallGalaxyVx,
          vy: smallGalaxyVy,
          mass: smallGalaxyMass,
          color: smallGalaxyColor
        });
        
        // Создаем звезды малой галактики
        const smallGalaxyStars = 60;
        
        for (let i = 0; i < smallGalaxyStars; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * smallGalaxyRadius;
          
          // Добавляем эллиптическую структуру
          const ellipseFactor = 1.2;
          const x = smallGalaxyX + Math.cos(angle) * distance;
          const y = smallGalaxyY + Math.sin(angle) * distance * ellipseFactor;
          
          // Скорость для вращения галактики + общее движение галактики
          const speed = Math.sqrt(0.5 * smallGalaxyMass / distance) * 0.3;
          const vx = smallGalaxyVx - Math.sin(angle) * speed;
          const vy = smallGalaxyVy + Math.cos(angle) * speed * ellipseFactor;
          
          // Масса звезды
          const starMass = 1 + Math.random() * 5;
          
          // Цвет зависит от расстояния до центра
          const brightness = 70 + (distance / smallGalaxyRadius) * 20;
          const hue = 210 - (distance / smallGalaxyRadius) * 30;
          
          objects.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            mass: starMass,
            color: `hsl(${hue}, 80%, ${brightness}%)`
          });
        }
        
        // Добавляем "мост" из материи между галактиками (приливной хвост)
        const bridgeParticles = 30;
        
        for (let i = 0; i < bridgeParticles; i++) {
          const ratio = i / (bridgeParticles - 1);
          
          // Позиция вдоль моста с небольшим отклонением
          const bridgeX = mainGalaxyX + (smallGalaxyX - mainGalaxyX) * ratio + (Math.random() - 0.5) * 50;
          const bridgeY = mainGalaxyY + (smallGalaxyY - mainGalaxyY) * ratio + (Math.random() - 0.5) * 50;
          
          // Скорость - интерполяция между скоростями галактик
          const bridgeVx = ratio * smallGalaxyVx;
          const bridgeVy = ratio * smallGalaxyVy;
          
          objects.push({
            x: bridgeX,
            y: bridgeY,
            vx: bridgeVx,
            vy: bridgeVy,
            mass: 1 + Math.random() * 3,
            color: `hsl(${120 + ratio * 90}, 70%, 70%)`
          });
        }
        
        return objects;
      }
    };
  }
  
  // Пресет 25: Танец астероидов
  private createAsteroidDancePreset(): Preset {
    return {
      name: "Танец астероидов",
      description: "Группы астероидов, движущиеся в сложных орбитальных резонансах",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const objects: GravityObject[] = [];
        
        // Центральная звезда
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 2000,
          color: '#FFFFFF' // Белая звезда
        });
        
        // Создаем несколько групп астероидов в резонансах
        const numGroups = 5;
        const asteroidsPerGroup = 15;
        
        // Резонансы - отношения периодов обращения
        const resonances = [
          { inner: 1, outer: 2 },  // 1:2 резонанс
          { inner: 2, outer: 3 },  // 2:3 резонанс
          { inner: 3, outer: 5 },  // 3:5 резонанс
          { inner: 1, outer: 3 },  // 1:3 резонанс
          { inner: 4, outer: 7 }   // 4:7 резонанс
        ];
        
        for (let group = 0; group < numGroups; group++) {
          // Базовый радиус для группы
          const baseRadius = 100 + group * 70;
          
          // Цветовая схема для группы
          const groupHue = (group * 70) % 360;
          
          // Создаем внутреннюю и внешнюю группы астероидов в резонансе
          const innerRadius = baseRadius;
          const outerRadius = baseRadius * Math.pow(resonances[group].outer / resonances[group].inner, 2/3);
          
          // Внутренняя группа
          for (let i = 0; i < asteroidsPerGroup; i++) {
            const angle = (i * Math.PI * 2) / asteroidsPerGroup + Math.random() * 0.2;
            const distance = innerRadius * (0.95 + Math.random() * 0.1);
            
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            // Скорость для круговой орбиты
            const speed = Math.sqrt(0.5 * 2000 / distance);
            const vx = -Math.sin(angle) * speed;
            const vy = Math.cos(angle) * speed;
            
            objects.push({
              x: x,
              y: y,
              vx: vx,
              vy: vy,
              mass: 3 + Math.random() * 5,
              color: `hsl(${groupHue}, 80%, 60%)`
            });
          }
          
          // Внешняя группа
          for (let i = 0; i < asteroidsPerGroup; i++) {
            const angle = (i * Math.PI * 2) / asteroidsPerGroup + Math.random() * 0.2;
            const distance = outerRadius * (0.95 + Math.random() * 0.1);
            
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            // Скорость для круговой орбиты
            const speed = Math.sqrt(0.5 * 2000 / distance);
            const vx = -Math.sin(angle) * speed;
            const vy = Math.cos(angle) * speed;
            
            objects.push({
              x: x,
              y: y,
              vx: vx,
              vy: vy,
              mass: 3 + Math.random() * 5,
              color: `hsl(${groupHue + 20}, 80%, 70%)`
            });
          }
        }
        
        // Добавляем несколько крупных астероидов, которые будут нарушать резонансы
        const numDisruptors = 3;
        
        for (let i = 0; i < numDisruptors; i++) {
          const angle = (i * Math.PI * 2) / numDisruptors;
          const distance = 250 + Math.random() * 150;
          
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          
          // Скорость с небольшим эксцентриситетом
          const baseSpeed = Math.sqrt(0.5 * 2000 / distance);
          const eccentricity = 0.1 + Math.random() * 0.1;
          const speed = baseSpeed * (1 + eccentricity);
          
          const vx = -Math.sin(angle) * speed;
          const vy = Math.cos(angle) * speed * (1 - eccentricity);
          
          objects.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            mass: 30 + Math.random() * 20,
            color: '#FF5722' // Оранжево-красный
          });
        }
        
        return objects;
      }
    };
  }
}