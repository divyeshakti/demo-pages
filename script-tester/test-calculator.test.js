// Example test file for calculator.js
// Each test should return an object with { passed: boolean, message: string }

export const testAddition = async () => {
    try {
        if (typeof Calculator === 'undefined') {
            return { passed: false, message: 'Calculator object not found' };
        }
        
        const result = Calculator.add(2, 3);
        if (result === 5) {
            return { passed: true, message: 'Addition test passed' };
        } else {
            return { passed: false, message: `Addition test failed. Expected 5, got ${result}` };
        }
    } catch (error) {
        return { passed: false, message: `Addition test error: ${error.message}` };
    }
};

export const testSubtraction = async () => {
    try {
        if (typeof Calculator === 'undefined') {
            return { passed: false, message: 'Calculator object not found' };
        }
        
        const result = Calculator.subtract(5, 3);
        if (result === 2) {
            return { passed: true, message: 'Subtraction test passed' };
        } else {
            return { passed: false, message: `Subtraction test failed. Expected 2, got ${result}` };
        }
    } catch (error) {
        return { passed: false, message: `Subtraction test error: ${error.message}` };
    }
}; 