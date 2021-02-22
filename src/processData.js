export function processData(size) {
    const obj = {};
  
    for (let i = 0; i < size + 1_000_000; i++) {
      obj[i] = i;
    }
  
    return Object.keys(obj).length;
  }