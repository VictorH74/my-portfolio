import React from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps {
  value: string;
  placeholder?: string;
  id?: string;
  className?: string;
  onChange(value: string): void;
}

export default function TextArea(props: TextAreaProps) {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }
  }, [props.value]);

  return (
    <textarea
      id={props.id}
      ref={ref}
      className={twMerge("shadow-lg bg-[#444444] p-2 rounded-md outline-blue-500 autofill:none resize-none overflow-hidden", props.className)}
      rows={1}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => {
        props.onChange(e.currentTarget.value);
      }}
    />
  );
}