export const findAll = (stack, arr) => arr.every((v) => stack.includes(v));
export const findOne = (stack, arr) => (arr.length ? arr.some((v) => stack.includes(v)) : true);
