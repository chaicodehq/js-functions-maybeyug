/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
 *   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  // Your code here
  if (color1 === null || color2 === null) return null;
  else if (color1 === undefined || color2 === undefined) return null;
  const newObj = {};
  newObj.name = `${color1.name}-${color2.name}`;
  newObj.r = Math.ceil((color1.r + color2.r) / 2);
  newObj.g = Math.ceil((color1.g + color2.g) / 2);
  newObj.b = Math.ceil((color1.b + color2.b) / 2);
  return newObj;
}

export function adjustBrightness(color, factor) {
  // Your code here
  if (color === null || Number.isNaN(factor) || typeof factor !== "number")
    return null;
  const newObj = { ...color };
  newObj.r =
    Math.round(newObj.r * factor) > 255 ? 255 : Math.round(newObj.r * factor);
  newObj.g =
    Math.round(newObj.g * factor) > 255 ? 255 : Math.round(newObj.g * factor);
  newObj.b =
    Math.round(newObj.b * factor) > 255 ? 255 : Math.round(newObj.b * factor);
  return newObj;
}

export function addToPalette(palette, color) {
  // Your code here
  if (!Array.isArray(palette)) return [color];
  else if (color === null || color === undefined) return [...palette];
  const newArr = [...palette];
  newArr.push(color);
  return newArr;
}

export function removeFromPalette(palette, colorName) {
  // Your code here
  if (!Array.isArray(palette)) return [];
  const newArr = [...palette].filter((item) => item.name !== colorName);
  return newArr;
}

export function mergePalettes(palette1, palette2) {
  // Your code here
  if (!Array.isArray(palette1) && !Array.isArray(palette2)) {
    return [];
  }
  if (!Array.isArray(palette1) && Array.isArray(palette2)) {
    return [...palette2];
  } else if (Array.isArray(palette1) && !Array.isArray(palette2)) {
    return [...palette1];
  }

  const newArr = [...palette1];
  const uniquePalette = palette2.filter(
    (item) => !newArr.find((pal) => pal.name === item.name),
  );
  newArr.push(...uniquePalette);
  return newArr;
}
