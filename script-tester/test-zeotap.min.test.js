// import { RequestTracker } from './request-tracker.js';

// // const requestTracker = new RequestTracker();
// // requestTracker.setupRequestTracking(); 

const init = ()=>{
    zeotap.init("test-write-key")
}


export const testZeotapExists = async () => {
    try {
        if (typeof window.zeotap === 'undefined') {
            return { passed: false, message: 'zeotap object not found on window' };
        }
        return { passed: true, message: `Zeotap is set on the page` };
    } catch (error) {
        return { passed: false, message: `Test error: ${error.message}` };
    }
};

export const testWriteKey = async () => {
    try {
        init();
        const writeKey = zeotap.getWriteKey();
        if (writeKey !== "test-write-key") {
            return { passed: false, message: `Write key test failed. Expected "test-write-key", got "${writeKey}"` };
        }
        return { passed: true, message: `Write key is correctly set` };
    } catch (error) {
        return { passed: false, message: `Test error: ${error.message}` };
    }
};

export const testSetEventProperties = async () => {
    try {
        // Clear any previous requests
        // Initialize request tracking
        let _event = null
        const eventHandler = (event)=>{
            _event = event
        }
       
        zeotap.getEventTarget().addEventListener('testEvent', eventHandler);

        // Wait a moment for any requests to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const testEvent = 'test_event';
        const testProperties = {
            property1: 'value1',
            property2: 'value2'
        };
        
        zeotap.setEventProperties(testEvent, testProperties);
        await new Promise(resolve => setTimeout(resolve, 500));

        if(_event?.type === 'test_event'){
            return {
                passed : true,
                message: 'Event Target called with the event '
            }
        }
        return { 
            passed: false, 
            message: `Event target Not Called: ${error.message}` 
        };
       
    } catch (error) {
        return { 
            passed: false, 
            message: `Event properties test error: ${error.message}` 
        };
    }
};



