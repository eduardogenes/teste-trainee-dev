// src/badwords.d.ts
declare module 'bad-words' {
  export class Filter {
    constructor(options?: any);
    isProfane(text: string): boolean;
    clean(text: string): string;
  }
}