interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      className="bg-mauve-200 text-mauve-600 placeholder:text-mauve-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-mauve-500 transition-colors"
      {...props}
    />
  );
}