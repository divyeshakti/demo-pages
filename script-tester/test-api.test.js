// Example test file for checking API requests
// Each test should return an object with { passed: boolean, message: string }

export const testLoginRequest = async () => {
    try {
        // Wait a moment for any requests to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const loginRequestMade = await checkRequestMade('/api/login', 'POST');
        
        if (loginRequestMade) {
            return { 
                passed: true, 
                message: 'Login API request was made successfully' 
            };
        } else {
            return { 
                passed: false, 
                message: 'Login API request was not made' 
            };
        }
    } catch (error) {
        return { 
            passed: false, 
            message: `Login request test error: ${error.message}` 
        };
    }
};

export const testDataFetch = async () => {
    try {
        // Wait a moment for any requests to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const dataRequestMade = await checkRequestMade('/api/data', 'GET');
        
        if (dataRequestMade) {
            return { 
                passed: true, 
                message: 'Data fetch API request was made successfully' 
            };
        } else {
            return { 
                passed: false, 
                message: 'Data fetch API request was not made' 
            };
        }
    } catch (error) {
        return { 
            passed: false, 
            message: `Data fetch test error: ${error.message}` 
        };
    }
}; 