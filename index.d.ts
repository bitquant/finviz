declare module 'finviz' {
    export function getStockData(input: string): Promise<{ [id: string]: string }>;
}