/**
 * RegExp flag
 * @typedef {'g' | 'i' | 'd' | 'm' | 's' | 'u' | 'y'} Flag
*/

/**
 * Pattern Model
*/
export class Pattern {
  /**
   * Constructor
   * @param { string } source
  */
  constructor(source) {
    if (typeof source !== 'string') {
      throw new TypeError('invalid argument');
    }
    this.source = source;
  }

  /**
   * Creates a new pattern that repeats the pattern with `*`.
   * @param { boolean | undefined } greedy
   * @returns { Pattern }
  */
  many0(greedy) {
    if (greedy != null && typeof greedy !== 'boolean') {
      throw new TypeError('invalid argument');
    }
    let quantifier = '*';
    // non-greedy
    if (greedy === false) {
      quantifier += '?';
    }
    return new Pattern('(?:' + this.source + ')' + quantifier);
  }

  /**
   * Creates a new pattern that repeats the pattern with `+`.
   * @param { boolean | undefined } greedy
   * @returns { Pattern }
  */
  many1(greedy) {
    if (greedy != null && typeof greedy !== 'boolean') {
      throw new TypeError('invalid argument');
    }
    let quantifier = '+';
    // non-greedy
    if (greedy === false) {
      quantifier += '?';
    }
    return new Pattern('(?:' + this.source + ')' + quantifier);
  }

  /**
   * Creates a new pattern that repeats the pattern with `{count}`.
   * @param { number } count
   * @returns { Pattern }
  */
  manyJust(count) {
    if (typeof count !== 'number') {
      throw new TypeError('invalid argument');
    }
    return new Pattern('(?:' + this.source + '){' + count + '}');
  }

  /**
   * Creates a new pattern that repeats the pattern with `{min,}`.
   * @overload
   * @param { number } min
   * @param { boolean | undefined } greedy
   * @returns { Pattern }
  */
  /**
   * Creates a new pattern that repeats the pattern with `{min,max}`.
   * @overload
   * @param { number } min
   * @param { number } max
   * @param { boolean | undefined } greedy
   * @returns { Pattern }
  */
  /** @param { unknown[] } args */
  many(...args) {
    let min, max, greedy;
    if (typeof args[0] !== 'number') {
      throw new TypeError('invalid argument');
    }
    min = args[0];
    if (typeof args[1] === 'number') {
      max = undefined;
      greedy = args[1];
    } else {
      if (typeof args[1] !== 'number') {
        throw new TypeError('invalid argument');
      }
      max = args[1];
      greedy = args[2];
    }
    if (greedy != null && typeof greedy !== 'boolean') {
      throw new TypeError('invalid argument');
    }
    let quantifier = '{' + min + ',' + (max ?? '') + '}';
    // non-greedy
    if (greedy === false) {
      quantifier += '?';
    }
    return new Pattern('(?:' + this.source + ')' + quantifier);
  }

  /**
   * Capture the pattern.
   * @returns { Pattern }
  */
  capture() {
    return new Pattern('(' + this.source + ')');
  }

  /**
   * Build a RegExp from the pattern.
   * @param { Flag | Flag[] | undefined } flags regex flags
   * @returns { RegExp }
  */
  toRegex(flags) {
    if (flags == null || typeof flags === 'string') {
      return new RegExp(this.source, flags);
    }
    if (Array.isArray(flags)) {
      return new RegExp(this.source, flags.join(''));
    }
    throw new TypeError('invalid argument');
  }
}

/**
 * Creates a new pattern from a RegExp or regex string.
 * @param { string | RegExp } source 
 * @returns { Pattern }
*/
export function pattern(source) {
  let patternSource;
  if (typeof source === 'string') {
    patternSource = source;
  } else if (source instanceof RegExp) {
    patternSource = source.source;
  } else {
    throw new TypeError('invalid argument');
  }
  return new Pattern(patternSource);
}

/**
 * Creates a new pattern from a pattern sequence.
 * @param { Pattern[] } patterns pattern sequence
 * @returns { Pattern }
*/
export function seq(patterns) {
  if (!Array.isArray(patterns)) {
    throw new TypeError('invalid argument');
  }
  const source = patterns.map(x => {
    if (!(x instanceof Pattern)) {
      throw new TypeError('invalid argument');
    }
    return x.source;
  }).join('');
  return new Pattern(source);
}
