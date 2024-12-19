function isObject (origin) {
    return origin && origin !== null && typeof origin === "object" && !Array.isArray(origin);
}

function isArray (origin) {
    return origin && origin !== null && typeof origin === "object" && Array.isArray(origin);
}

export function deepCopy (origin) {
    let destination = null;
    if (!origin || origin === null || typeof origin !== "object") return destination;
    
    if (Array.isArray(origin)) {
        destination = [];
        if (!origin.length) return destination;
        
        for (let i = 0; i < origin.length; i++) {
            const temp = deepCopy(origin[i]);
            destination.push(temp);
        }
    }
    else {
        destination = {};
        for (const key in origin) {
            const temp = origin[key];
            if (isArray(temp) || isObject(temp)) {
                const copy = deepCopy(temp);
                destination[key] = copy;
            }
            else {
                destination[key] = temp;
            }
        }
    }

    return destination;
}