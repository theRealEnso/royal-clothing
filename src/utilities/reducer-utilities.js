export const createAction = (type, payload) => {
    return {
        type: type,
        payload: payload
    };
};

// export const createAction = (type, payload) => ({type, payload}); // achieves the same thing as above (?) except its shortened