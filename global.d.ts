export {};
declare global {
    function loading(timeoutCallback?: Function): void;

    function loadingTime(message?: string, time?: number, timeoutCallback?: Function): void;

    function loadingDismiss(): void;

    function toast(message: string): void;

    var device: {} | Readonly<{}>;
}
