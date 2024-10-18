function logError(error:any, page:any) {
    // Add code to log the error along with page information
    console.error(`Error on ${page}:`, error);
}

// Inside your code where the error occurs
try {
    // Code where the error might occur
} catch (error) {
    // Log the error along with the current page information
    logError(error, window.location.href); // For web applications
}

export default logError;