export const createAction = (type, payload) => {
    return {
        type: type,
        payload: payload
    };
};

// export const createAction = (type, payload) => ({type, payload}); // achieves the same thing as above except it is shortened. Despite this difference in syntax, both functions will accomplish the same task of creating an object with "type" and "payload" properties. The second function's syntax is more concise and is often used when the property names and variable names / key-value names match.