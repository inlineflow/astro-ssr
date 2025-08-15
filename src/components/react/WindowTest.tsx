/// <reference path="../../types/window.d.ts" />
import { useEffect, useState } from 'react';

export default function WindowTest() {
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    const results: string[] = [];

    try {
      // Test 1: Assign values to window properties
      window.testProperty = "Hello from window!";
      window.testFunction = (message: string) => {
        console.log("Window test function called:", message);
        results.push(`Function called with: ${message}`);
      };
      window.testObject = {
        name: "Test Object",
        value: 42
      };

      results.push("✅ Successfully assigned test properties to window");

      // Test 2: Access the properties
      results.push(`📝 testProperty: ${window.testProperty}`);
      results.push(`📦 testObject: ${JSON.stringify(window.testObject)}`);

      // Test 3: Call the function
      window.testFunction("Test message from component");
      results.push("🔧 Called testFunction successfully");

      // Test 4: Verify TypeScript types are working
      // This should show no TypeScript errors in the editor
      const _property: string = window.testProperty;
      const _func: (message: string) => void = window.testFunction;
      const _obj: { name: string; value: number } = window.testObject;

      results.push("✅ TypeScript types are working correctly");

    } catch (error) {
      results.push(`❌ Error: ${error}`);
    }

    setTestResults(results);
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Window Object Type Test</h2>
      <div className="space-y-2">
        {testResults.map((result, index) => (
          <div key={index} className="p-2 bg-gray-100 rounded">
            {result}
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">What this test verifies:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>TypeScript recognizes custom window properties</li>
          <li>Properties can be assigned and accessed</li>
          <li>Functions can be called with proper typing</li>
          <li>Objects maintain their type structure</li>
        </ul>
      </div>
    </div>
  );
}
