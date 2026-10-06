interface LabelProps {
  children: React.ReactNode;
  isRequired?: boolean;
}

export function Label({ children, isRequired }: LabelProps) {
  return (
    <label className="text-mauve-200 font-semibold text-sm mb-1">
      {children} {isRequired && <span className="text-red-500">*</span>}
    </label>
  );
}