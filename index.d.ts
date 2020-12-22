declare options {
  elapsedChar?: string,
  progressChar?: string,
  emptyChar?: string
}

declare OptionsAndFlagsObject {
  options: object;
  flags: string[];
  contentNoOptions: string;
  contentNoFlags: string;
}

declare class Functions {
  constructor() {
    this.version: string;
  }
  
  toProperCase(string: string, lowerCaseBoolean: boolean): string;
  toChunks(string: string, ChunkBy: number): string[];
  scramble(string: string): string;
  mock(string: string): string;
  emojify(string: string): string;
  hasCustomEmoji(string: string): number | "No custom emoji detected";
  createProgressBar(inTotal: number, Total: number, options?: options): string;
  toAbbreviation(string: string): string;
  fakeToken(): string;
  shorten(string: string, length: number, placeholder?: string): string;
  parseOptions(args: string[]): OptionsAndFlagsObject;
}

export = Functions;