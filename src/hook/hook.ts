/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
interface IWebApp {
    initDataUnsafe: {
        user: {
            id: number;
            first_name: string;
            last_name: string;
            username: string;
            language_code: string;
        };
        start_param: string;
    };
    showAlert: (message: string) => void;
    close: () => void;
}

interface IUseTelegram {
    webApp: IWebApp | undefined;
    user: IWebApp['initDataUnsafe']['user'] | undefined;
    start_param: string | undefined;
    onArgumentResult: (functionName: string, argument: string, result: string | Error) => void;
    onClose: () => void;
    onResult: (functionName: string, result: string | Error) => void;
    onReceivedEvent: (event: string, data: string) => void;
    executeArgumentMethod: (methodName: string, argument: string, method: () => any, ignoreAlert: boolean) => void;
    executeMethod: (methodName: string, method: () => any, ignoreAlert: boolean) => void;
}

export function useTelegram(): IUseTelegram {
    const [webApp, setWebApp] = React.useState<IWebApp | undefined>(undefined);
    const [user, setUser] = React.useState<IWebApp['initDataUnsafe']['user'] | undefined>(undefined);
    const [startParam, setStartParam] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        const app = (window as any).Telegram?.WebApp;
        if (app) {
            setWebApp(app);
            setUser(app.initDataUnsafe.user);
            setStartParam(app.initDataUnsafe.start_param);
        }
    }, []);


    const onArgumentResult = (functionName: string, argument: string, result: string | Error) => {
        const message = result instanceof Error ? result.message : result;
        webApp?.showAlert(`${functionName}(${argument}) returned ${message}`);
    };

    const onResult = (functionName: string, result: string | Error) => {
        onArgumentResult(functionName, '', result);
    };

    const onReceivedEvent = (event: string, data: string) => {
        webApp?.showAlert(`received event(${event}) with data(${data})`);
    };

    const onClose = () => {
        webApp?.close();
    };

    const executeArgumentMethod = (methodName: string, argument: string, method: () => any, ignoreAlert: boolean) => {
        try {
            const result = method();
            if (!ignoreAlert) {
                const wrappedResult = `Result: ${result}`;
                onArgumentResult(methodName, argument, wrappedResult);
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            onArgumentResult(methodName, argument, "error");
        }
    };

    const executeMethod = (methodName: string, method: () => any, ignoreAlert: boolean) => {
        executeArgumentMethod(methodName, '', method, ignoreAlert);
    };

    return {
        webApp,
        user,
        start_param: startParam,
        onArgumentResult,
        onResult,
        onReceivedEvent,
        onClose,
        executeArgumentMethod,
        executeMethod
    };
}