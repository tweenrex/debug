export declare function visualize(easing?: IEasing): ITweenRex;
export declare function visualize(opts?: IVisualizeOptions): ITweenRex;
export declare function visualize(opts?: IVisualizeOptions | IEasing): ITweenRex;

export interface IEasing {
    (n: number): number
}
export interface IVisualizeOptions {
    easing?: IEasing
    title?: string
}
