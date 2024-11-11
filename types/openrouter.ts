export interface OpenRouterApi {
  choices: {
    message: {
      content: string;
      role: string;
    };
    index: number;
  }[];
}