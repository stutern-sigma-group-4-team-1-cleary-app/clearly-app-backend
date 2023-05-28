import uniqueRandom from "unique-random";

const generateCode = uniqueRandom(0, 9);

const codeReset = `${generateCode()} ${generateCode()} ${generateCode()} ${generateCode()}`;
console.log(codeReset);

export { codeReset };
