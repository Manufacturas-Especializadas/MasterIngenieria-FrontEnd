import { useState, type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ...props }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value !== "";

  const labelShrinkClass =
    isFocused || hasValue
      ? "text-blue-600 -translate-y-4 scale-75 top2"
      : "text-gray-500 translate-y-0 scael-100 top-4";

  return (
    <div
      className="relative w-full bg-gray-50 
      border-b-2 border-gray-300 in-focus-within:border-blue-600"
    >
      Input
    </div>
  );
};
