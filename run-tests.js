const { execSync } = require('child_process');

// Получаем параметры командной строки
const args = process.argv.slice(2);
const testType = args[0] || 'unit'; // По умолчанию запускаем только модульные тесты

try {
  console.log(`Running ${testType} tests...`);
  
  // Запускаем только модульные тесты
  const command = 'npx jest --testPathIgnorePatterns=\\.integration\\.';
  
  const output = execSync(command, { encoding: 'utf8' });
  console.log(output);
  console.log(`${testType} tests completed successfully!`);
} catch (error) {
  console.error(`Error running ${testType} tests:`);
  console.error(error.stdout);
  console.error(error.stderr);
  process.exit(1);
} 