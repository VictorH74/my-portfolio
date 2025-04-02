import React from 'react';

export const useAi = () => {
    const [done, setDone] = React.useState(true);
    const [responseText, setResponseText] = React.useState('');
    const [reader, setReader] =
        React.useState<ReadableStreamDefaultReader | null>(null);

    const resetResponseText = () => setResponseText('');

    const stopResponse = React.useCallback(() => {
        if (reader) {
            reader.cancel(); // Interrompe a stream
            setDone(true); // Define o estado como "feito"
        }
    }, [reader]);

    const generateContentStream = async (promptText: string) => {
        setDone(false);
        resetResponseText();

        const response = await fetch('api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ promptText }),
        });

        if (!response.body) {
            console.error('Erro: Não foi possível obter a stream da resposta');
            return;
        }

        const readerInstance = response.body.getReader();
        setReader(readerInstance); // Salva o reader no estado

        const decoder = new TextDecoder();

        let _done = false;
        let result = '';

        while (!_done) {
            const { value, done: streamDone } = await readerInstance.read();
            _done = streamDone;

            result += decoder.decode(value, { stream: true });

            setResponseText(result.trim());
        }

        setDone(_done);
        setReader(null); // Limpa o reader após o término da leitura
    };

    return {
        done,
        responseText,
        stopResponse,
        generateContentStream,
        resetResponseText,
    };
};
