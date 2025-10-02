import React from 'react';

export function useFrozenFunction<T = unknown>(
    callback: (abortController?: AbortController) => T,
    freezeTimer: number,
    initialValue: T,
    abortController?: AbortController
) {
    const setFreeseTimerTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const freezeTimerRef = React.useRef(false);

    const [data, setData] =
        React.useState<ReturnType<typeof callback>>(initialValue);

    React.useEffect(() => {
        abortController?.signal.addEventListener('abort', () => {
            if (setFreeseTimerTimeoutRef.current) {
                clearTimeout(setFreeseTimerTimeoutRef.current);
            }
        })

        return () => {
            abortController?.abort();
        };
    }, [abortController]);


    const func = async () => {
        if (freezeTimerRef.current) return;

        if (abortController?.signal.aborted) {
            console.log('signal.aborted', abortController?.signal.aborted);
            return Promise.reject(new DOMException('Aborted', 'AbortError'));
        }

        freezeTimerRef.current = true;

        const _newData = await new Promise<ReturnType<typeof callback>>(
            (resolve, reject) => {
                const _data = callback(abortController);
                resolve(_data);

                abortController?.signal.addEventListener('abort', () => {
                    reject(new DOMException('Aborted', 'AbortError'));
                });
            }
        );

        if (_newData !== data) {
            setData(_newData);
        }

        setFreeseTimerTimeoutRef.current = setTimeout(() => {
            freezeTimerRef.current = false;
        }, freezeTimer);
    };

    return {
        data,
        func,
    };
}
