export function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-mauve-200 font-semibold text-sm mb-1">
      {children}
    </label>
  );
}