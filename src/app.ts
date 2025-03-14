class CanvasApp {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private text: string = "Привет, мир!";
  private animationId: number = 0;
  private angle: number = 0;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.init();
  }

  private init(): void {
    this.setupCanvas();
    this.animate();
    window.addEventListener('resize', () => this.setupCanvas());
  }

  private setupCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private drawText(): void {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const fontSize = Math.min(this.canvas.width / 10, 120);
    
    // Очищаем canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Настройка текста
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `bold ${fontSize}px 'Montserrat', 'Arial', sans-serif`;
    
    // Создаем легкое движение текста
    const offsetX = Math.sin(this.angle) * 5;
    const offsetY = Math.cos(this.angle) * 5;
    
    // Рисуем тени для объемного эффекта
    for (let i = 10; i >= 1; i--) {
      // Цвет тени зависит от глубины
      const alpha = i / 20;
      const offsetFactor = i / 2;
      
      this.ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      this.ctx.fillText(
        this.text, 
        centerX + offsetX + offsetFactor, 
        centerY + offsetY + offsetFactor
      );
    }
    
    // Градиент для основного текста
    const gradient = this.ctx.createLinearGradient(
      centerX - fontSize * 2,
      centerY - fontSize / 2,
      centerX + fontSize * 2,
      centerY + fontSize / 2
    );
    
    gradient.addColorStop(0, '#8a2be2'); // Фиолетовый
    gradient.addColorStop(0.5, '#4169e1'); // Синий
    gradient.addColorStop(1, '#00bfff'); // Голубой
    
    // Рисуем основной текст
    this.ctx.fillStyle = gradient;
    this.ctx.fillText(this.text, centerX + offsetX, centerY + offsetY);
    
    // Добавляем блик
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.font = `bold ${fontSize * 0.99}px 'Montserrat', 'Arial', sans-serif`;
    this.ctx.fillText(this.text, centerX + offsetX - 2, centerY + offsetY - 2);
  }

  private animate(): void {
    // Обновляем угол для анимации
    this.angle += 0.01;
    
    // Рисуем текст
    this.drawText();
    
    // Продолжаем анимацию
    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// Запускаем приложение
window.addEventListener('DOMContentLoaded', () => {
  new CanvasApp();
}); 