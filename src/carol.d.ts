/*!-------------------------------------------------------------------------

MIT License

Copyright (c) 2023 marihachi <marihachi0620@gmail.com>

See: https://github.com/marihachi/carol-js/blob/4f314365ba991c1fad963a249fc82e8051a261cb/LICENSE

---------------------------------------------------------------------------*/

declare module 'carol-js' {
  /**
   * Creates a new pattern from a RegExp or regex string.
  */
  function carol(source: string | RegExp): carol.Pattern;

  namespace carol {
    export {
      carol,
      Flag,
      seq,
      alt,
      Pattern,
    };
  }

  /**
   * RegExp flag
  */
  type Flag = 'g' | 'i' | 'd' | 'm' | 's' | 'u' | 'y';

  /**
   * Creates a new pattern from a pattern sequence.
   * @param patterns pattern sequence
  */
  function seq(patterns: Pattern[]): Pattern;

  /**
   * Creates a new pattern that tests for a match to one of the patterns.
   * @param patterns patterns
  */
  function alt(patterns: Pattern[]): Pattern;

  /**
   * Pattern Model
  */
  class Pattern {
    source: string;

    /**
     * Constructor
    */
    constructor(source: string);

    /**
     * Creates a new pattern that repeats the pattern.
    */
    many(min?: number, max?: number): Pattern;

    /**
     * Creates a new pattern that repeats the pattern.
    */
    many(opts: { min?: number, max?: number, length?: number, greedy?: boolean }): Pattern;

    /**
     * Create a new pattern that is allowed to not match the pattern.
    */
    option(opts?: { greedy?: boolean }): Pattern;

    /**
     * Capture the pattern.
    */
    capture(): Pattern;

    /**
     * Build a RegExp from the pattern.
     * @param flags regex flags
    */
    toRegex(flags?: Flag | Flag[]): RegExp;
  }

  export default carol;

  export {
    carol,
    Flag,
    seq,
    alt,
    Pattern,
  };
}
