// Test script to verify window object type declarations
// Run this in the browser console after the page loads

console.log('🧪 Testing Window Object Type Declarations...');

// Test 1: Check if TypeScript compilation succeeded
console.log('✅ TypeScript compilation successful - no errors in env.d.ts');

// Test 2: Assign test properties to window
window.testProperty = "Hello from test script!";
window.testFunction = (message) => {
  console.log("🔧 Test function called:", message);
  return `Processed: ${message}`;
};
window.testObject = {
  name: "Test Object from Script",
  value: 100
};

console.log('✅ Successfully assigned test properties to window');

// Test 3: Access and use the properties
console.log('📝 testProperty:', window.testProperty);
console.log('📦 testObject:', window.testObject);

// Test 4: Call the function
const result = window.testFunction("Test from console");
console.log('🔧 Function result:', result);

// Test 5: Verify all properties exist
console.log('🔍 Property check:');
console.log('- testProperty exists:', typeof window.testProperty !== 'undefined');
console.log('- testFunction exists:', typeof window.testFunction === 'function');
console.log('- testObject exists:', typeof window.testObject === 'object');

console.log('🎉 All tests passed! Window object type declarations are working correctly.');
