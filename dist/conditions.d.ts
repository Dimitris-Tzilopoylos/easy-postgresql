// Type for the generic filter object structure
type FilterObject = Record<string, any>;

/**
 * Merges Conditions for building the where clause
 * @param args - Arguments to be merged
 * @returns A filter object with the results of the filtered objects as a unified object
 */
declare function mergeConditions(...args: FilterObject[]): FilterObject;

/**
 * Creates a logical AND condition with the provided arguments
 * @param args - Arguments to be combined with AND logic
 * @returns A filter object with _and operator
 */
declare function and(...args: FilterObject[]): FilterObject;

/**
 * Creates a logical OR condition with the provided arguments
 * @param args - Arguments to be combined with OR logic
 * @returns A filter object with _or operator
 */
declare function or(...args: FilterObject[]): FilterObject;

/**
 * Creates an IN condition checking if a value is in the provided list
 * @param args - List of values to check against
 * @returns A filter object with _in operator
 */
declare function iN(...args: any[]): FilterObject;

/**
 * Creates a NOT IN condition checking if a value is not in the provided list
 * @param args - List of values to check against
 * @returns A filter object with _nin operator
 */
declare function notIn(...args: any[]): FilterObject;

/**
 * Creates an ALL condition checking if all provided conditions are met
 * @param args - Conditions to check
 * @returns A filter object with _all operator
 */
declare function all(...args: any[]): FilterObject;

/**
 * Creates an ANY condition checking if any of the provided conditions are met
 * @param args - Conditions to check
 * @returns A filter object with _any operator
 */
declare function any(...args: any[]): FilterObject;

/**
 * Creates a NOT ANY condition checking if none of the provided conditions are met
 * @param args - Conditions to check
 * @returns A filter object with _nany operator
 */
declare function notAny(...args: any[]): FilterObject;

/**
 * Creates a less than condition
 * @param value - Value to compare against
 * @returns A filter object with _lt operator
 */
declare function lt(value: any): FilterObject;

/**
 * Creates a less than or equal condition
 * @param value - Value to compare against
 * @returns A filter object with _lte operator
 */
declare function lte(value: any): FilterObject;

/**
 * Creates a greater than condition
 * @param value - Value to compare against
 * @returns A filter object with _gt operator
 */
declare function gt(value: any): FilterObject;

/**
 * Creates a greater than or equal condition
 * @param value - Value to compare against
 * @returns A filter object with _gte operator
 */
declare function gte(value: any): FilterObject;

/**
 * Creates an equality condition
 * @param value - Value to compare against
 * @returns A filter object with _is operator
 */
declare function is(value: any): FilterObject;

/**
 * Creates an inequality condition
 * @param value - Value to compare against
 * @returns A filter object with _is_not operator
 */
declare function isNot(value: any): FilterObject;

/**
 * Creates a LIKE condition for pattern matching
 * @param value - Pattern to match
 * @returns A filter object with _like operator
 */
declare function like(value: string): FilterObject;

/**
 * Creates a case-insensitive LIKE condition for pattern matching
 * @param value - Pattern to match
 * @returns A filter object with _ilike operator
 */
declare function ilike(value: string): FilterObject;

/**
 * Creates a NOT LIKE condition for pattern matching
 * @param value - Pattern to not match
 * @returns A filter object with _nlike operator
 */
declare function notLike(value: string): FilterObject;

/**
 * Creates a case-insensitive NOT LIKE condition for pattern matching
 * @param value - Pattern to not match
 * @returns A filter object with _nilike operator
 */
declare function notIlike(value: string): FilterObject;

/**
 * Creates a condition to check if a value is NULL
 * @returns A filter object with _is: null
 */
declare function isNull(): FilterObject;

/**
 * Creates a condition to check if a value is NOT NULL
 * @returns A filter object with _is_not: null
 */
declare function isNotNull(): FilterObject;

/**
 * Creates an equality condition
 * @param value - Value to compare against
 * @returns A filter object with _eq operator
 */
declare function eq(value: any): FilterObject;

/**
 * Creates an inequality condition
 * @param value - Value to compare against
 * @returns A filter object with _neq operator
 */
declare function neq(value: any): FilterObject;

/**
 * Creates a condition to check if an object contains the specified value
 * @param value - Value to check for containment
 * @returns A filter object with _contains operator
 */
declare function contains(value: any): FilterObject;

/**
 * Creates a condition to check if an object is contained in the specified value
 * @param value - Value to check for containment
 * @returns A filter object with _contained_in operator
 */
declare function containedIn(value: any): FilterObject;

/**
 * Creates a condition to check if a specific key exists in an object
 * @param value - Key to check for existence
 * @returns A filter object with _key_exists operator
 */
declare function keyExists(value: string): FilterObject;

/**
 * Creates a condition to check if any of the specified keys exist in an object
 * @param value - Array of keys to check for existence
 * @returns A filter object with _key_exists_any operator
 */
declare function keyExistsAny(value: string[]): FilterObject;

/**
 * Creates a condition to check if all of the specified keys exist in an object
 * @param value - Array of keys to check for existence
 * @returns A filter object with _key_exists_all operator
 */
declare function keyExistsAll(value: string[]): FilterObject;

/**
 * Creates a text search condition
 * @param value - Text to search for
 * @returns A filter object with _text_search operator
 */
declare function textSearch(value: string): FilterObject;

/**
 * Creates a condition to check if a value is in an array
 * @param value - Value to check for in array
 * @returns A filter object with _in_array operator
 */
declare function inArray(value: any): FilterObject;

/**
 * Creates a condition to check if a value is not in an array
 * @param value - Value to check for not being in array
 * @returns A filter object with _nin_array operator
 */
declare function notInArray(value: any): FilterObject;

export {
  and,
  or,
  iN,
  notIn,
  all,
  any,
  notAny,
  lt,
  lte,
  gt,
  gte,
  is,
  isNot,
  like,
  ilike,
  notLike,
  notIlike,
  isNull,
  isNotNull,
  eq,
  neq,
  contains,
  containedIn,
  keyExists,
  keyExistsAny,
  keyExistsAll,
  textSearch,
  inArray,
  notInArray,
  mergeConditions,
};
