export = dam;
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
declare function dam(str1: string, str2: string): {
    steps: any;
    relative: number;
    similarity: number;
};
declare namespace dam {
    export { DamerauLevenshteinResult };
}
/**
 * The returned object of the algorithm.
 */
type DamerauLevenshteinResult = {
    /**
     * - How many steps it took to change the string.
     */
    steps: number;
    /**
     * - Relative distance.
     */
    relative: number;
    /**
     * - Similarity. If you want to do fuzzy matching you could pick anything over 0.5. But adjust as needed.
     */
    similarity: number;
};
//# sourceMappingURL=index.d.ts.map