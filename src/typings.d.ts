// tipagem para o washyourmouthoutwithsoap
declare module 'washyourmouthoutwithsoap' {
    const washYourMouth: (language?: string) => {
      check: (text: string) => boolean;
      clean: (text: string, options?: { replace?: string }) => string;
    };
    export default washYourMouth;
}