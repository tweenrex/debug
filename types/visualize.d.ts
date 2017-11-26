export declare function visualize(easing?: IEasing): IEasing;
export declare function visualize(opts?: IVisualizeOptions): IEasing;
export declare function visualize(opts?: IVisualizeOptions | IEasing): IEasing;

export interface IEasing {
    (n: number): number
}
export interface IVisualizeOptions {
    easing?: IEasing
    title?: string
}
