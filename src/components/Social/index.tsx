interface SocialProps {
  url: string;
  children: React.ReactNode;
}

export function Social({ ...props }: SocialProps) {
  return (
    <a 
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-mauve-200 transition-transform hover:scale-120 hover:text-mauve-300"
    >
      {props.children}
    </a>
  )
}