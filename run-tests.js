const { execSync } = require('child_process');

try {
  console.log('Running tests...');
  const output = execSync('npx jest', { encoding: 'utf8' });
  console.log(output);
} catch (error) {
  console.error('Error running tests:');
  console.error(error.stdout);
  console.error(error.stderr);
  process.exit(1);
} 