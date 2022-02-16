interface ProgressBarOptions {
  elapsedChar?: string;
  progressChar?: string;
  emptyChar?: string;
}

interface OptionsAndFlagsObject {
  options: Record<string, string>;
  flags: string[];
  contentNoOptions: string;
  contentNoFlags: string;
}

declare class Functions {
  version: string;
  static version: string;

  toProperCase(string: string, lowerCaseBoolean?: boolean): string;
  static toProperCase(string: string, lowerCaseBoolean?: boolean): string;

  toChunks(string: string, ChunkBy: number): string[];
  static toChunks(string: string, ChunkBy: number): string[];

  scramble(string: string): string;
  static scramble(string: string): string;

  mock(string: string): string;
  static mock(string: string): string;

  emojify(string: string): string;
  static emojify(string: string): string;

  hasCustomEmoji(string: string): boolean;
  static hasCustomEmoji(string: string): boolean;

  createProgressBar(
    inTotal: number,
    Total: number,
    options?: ProgressBarOptions
  ): string;
  static createProgressBar(
    inTotal: number,
    Total: number,
    options?: ProgressBarOptions
  ): string;

  toAbbreviation(string: string): string;
  static toAbbreviation(string: string): string;

  fakeToken(): string;
  static fakeToken(): string;

  decancer(text: string): string;
  static decancer(text: string): string;

  shorten(string: string, length: number, placeholder?: string): string;
  static shorten(string: string, length: number, placeholder?: string): string;

  parseOptions(args: string[]): OptionsAndFlagsObject;
  static parseOptions(args: string[]): OptionsAndFlagsObject;
}

export default Functions;
