import uniqueRandom from "unique-random";

const generateCode = uniqueRandom(0, 9);

const codeReset = () => {
  const value = [];
  for (let i = 0; i < 4; i++) {
    const code = generateCode();
    value.push(code);
  }
  let newCode = "";
  for (let i = 0; i < 4; i++) {
    newCode = newCode + value[i];
  }
  return newCode
};

export { codeReset };
