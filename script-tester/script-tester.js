// Function to load a script from URL
async function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.head.appendChild(script);
    });
}

// Function to extract script name from URL
function getScriptName(url) {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const fileName = pathParts[pathParts.length - 1];
    return fileName.replace('.js', '');
}

// Function to load and run tests
async function loadAndTestScript() {
    const scriptUrl = document.getElementById('scriptUrl').value;
    const loadingDiv = document.getElementById('loading');
    const resultsDiv = document.getElementById('testResults');
    
    if (!scriptUrl) {
        alert('Please enter a valid script URL');
        return;
    }

    try {
        loadingDiv.style.display = 'block';
        resultsDiv.innerHTML = '';

        // Load the script
        await loadScript(scriptUrl);
        
        // Get the script name and construct test file name
        const scriptName = getScriptName(scriptUrl);
        const testFileName = `test-${scriptName}.test.js`;
        
        // Try to load the test file
        try {
            const testModule = await import(`./${testFileName}`);
            
            // Run each test and display results
            for (const [testName, testFunction] of Object.entries(testModule)) {
                try {
                    const result = await testFunction();
                    const resultDiv = document.createElement('div');
                    resultDiv.className = `test-result test-${result.passed ? 'pass' : 'fail'}`;
                    resultDiv.textContent = `${testName}: ${result.message}`;
                    resultsDiv.appendChild(resultDiv);
                } catch (error) {
                    const resultDiv = document.createElement('div');
                    resultDiv.className = 'test-result test-fail';
                    resultDiv.textContent = `${testName}: Error - ${error.message}`;
                    resultsDiv.appendChild(resultDiv);
                }
            }
        } catch (error) {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'test-result test-fail';
            resultDiv.textContent = `Error: Could not find or load test file ${testFileName}`;
            resultsDiv.appendChild(resultDiv);
        }
    } catch (error) {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'test-result test-fail';
        resultDiv.textContent = `Error loading script: ${error.message}`;
        resultsDiv.appendChild(resultDiv);
    } finally {
        loadingDiv.style.display = 'none';
    }
} 