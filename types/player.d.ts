export declare function player(animator: IAnimator): void;
export declare function player(opts: IPlayerOptions): void;
export declare function player(opts: IPlayerOptions | IAnimator): void;

export interface IObserver {
    (n: number): void
}

export interface IAnimator {
    currentTime: number;
    duration: number;
    isPlaying: boolean;
    playbackRate: number;
    play(): any
    pause(): any
    subscribe(obs: IObserver): any
}

export interface IPlayerOptions {
    IAnimator?: IAnimator
    title?: string
}
