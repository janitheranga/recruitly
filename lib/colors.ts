/**
 * Generates a random hex color
 */
export function generateRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Generates an array of unique random colors
 */
export function generateUniqueColors(count: number): string[] {
  const colors: string[] = [];
  const usedColors = new Set<string>();

  while (colors.length < count) {
    const color = generateRandomColor();
    if (!usedColors.has(color)) {
      colors.push(color);
      usedColors.add(color);
    }
  }

  return colors;
}

/**
 * Get a color from a palette for a given index
 */
export function getColorByIndex(colors: string[], index: number): string {
  return colors[index % colors.length];
}
