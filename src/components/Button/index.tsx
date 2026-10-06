type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="flex items-center justify-center gap-2 bg-mauve-500 text-mauve-200 font-bold py-2 rounded-md transition-colors hover:bg-mauve-600 cursor-pointer disabled:cursor-not-allowed disabled:text-mauve-200"
    >
      {children}
    </button>
  );
}