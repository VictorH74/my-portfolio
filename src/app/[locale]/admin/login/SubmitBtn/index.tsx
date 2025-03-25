'use client';

import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
    onClick(): void;
}

export default function SubmitButton(props: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            onClick={props.onClick}
            className="p-2 rounded-md font-semibold hover:scale-[101%] hover:shadow-md duration-200 bg-gray-400 text-white"
            type="submit"
            disabled={pending}
        >
            {pending ? 'Submitting...' : 'Submit'}
        </button>
    );
}
