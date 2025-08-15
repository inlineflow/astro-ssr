// Window object type extensions
declare global {
  interface Window {
    // Test properties to verify type declarations work
    testProperty: string;
    testFunction: (message: string) => void;
    testObject: {
      name: string;
      value: number;
    };
  }
}

export {};
