/**
 * The returned object of the algorithm.
 * @typedef {Object} DamerauLevenshteinResult
 * @property {number} steps - How many steps it took to change the string.
 * @property {number} relative - Relative distance.
 * @property {number} similarity - Similarity. If you want to do fuzzy matching you could pick anything over 0.5. But adjust as needed.
 */

/**
 * Damerau-Levenshtein algorithm. Returns correct results unlike many of the
 * "performance optimized" versions.
 *
 * @param {string} str1 First string to compare.
 * @param {string} str2 Second string to compare.
 * @returns DamerauLevenshteinResult
 */
function dam(str1, str2) {

  const da = new Uint32Array(0x10000);
  const getIndex = (rowWidth, x, y) => {
    return (y + 1) * rowWidth + (x + 1);
  };
  const initializeDPMatrix = (a, b) => {
    const maxDistance = a.length + b.length;
    const ROW_WIDTH = a.length + 2;
    const COL_WIDTH = b.length + 2;
    const d = new Uint32Array(ROW_WIDTH * COL_WIDTH);
    d[getIndex(ROW_WIDTH, -1, -1)] = maxDistance;
    for (let i = 0; i <= a.length; i++) {
      d[getIndex(ROW_WIDTH, i, -1)] = maxDistance;
      d[getIndex(ROW_WIDTH, i, 0)] = i;
    }
    for (let i = 0; i <= b.length; i++) {
      d[getIndex(ROW_WIDTH, -1, i)] = maxDistance;
      d[getIndex(ROW_WIDTH, 0, i)] = i;
    }
    return [ROW_WIDTH, d];
  };
  const calculateStringDistance = (a, b, maxLenght = Math.max(a.length, b.length)) => {
    if (a.length + b.length === 0 || maxLenght === 0) {
      return 0;
    }
    a = a.length > maxLenght ? a.substring(0, maxLenght) : a;
    b = b.length > maxLenght ? b.substring(0, maxLenght) : b;
    const [ROW_WIDTH, d] = initializeDPMatrix(a, b);
    da.fill(0);
    for (let i = 1; i <= a.length; i++) {
      let db = 0;
      for (let j = 1; j <= b.length; j++) {
        const k = da[b.charCodeAt(j - 1)];
        const l = db;
        let cost = 1;
        if (a.charCodeAt(i - 1) === b.charCodeAt(j - 1)) {
          cost = 0;
          db = j;
        }
        d[getIndex(ROW_WIDTH, i, j)] = Math.min(d[getIndex(ROW_WIDTH, i - 1, j - 1)] + cost, d[getIndex(ROW_WIDTH, i, j - 1)] + 1, d[getIndex(ROW_WIDTH, i - 1, j)] + 1, d[getIndex(ROW_WIDTH, k - 1, l - 1)] + (i - k - 1) + (j - l - 1) + 1);
        da[a.charCodeAt(i - 1)] = i;
      }
    }
    return d[getIndex(ROW_WIDTH, a.length, b.length)];
  };
  const steps = calculateStringDistance(str1, str2)
  const length = Math.max(str1.length, str2.length)
  const relative = length === 0 ? 0 : (steps / length);
  const similarity = 1 - relative
  return { steps, relative, similarity }
}

module.exports = dam
