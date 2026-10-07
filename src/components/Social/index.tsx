import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import type { SocialProps } from "../../types";

// Mapeamento dos ícones das redes sociais
const networksIconsMap = {
  instagram: <FaInstagram size={24} />,
  facebook: <FaFacebook size={24} />,
  twitter: <FaTwitter size={24} />,
  youtube: <FaYoutube size={24} />
};

export function Social({ ...props }: SocialProps) {
  if (!props.name || !props.url) {
    return null; // Retorna null se name ou url não estiverem definidos
  }

  return (
    <a 
      key={props.name}
      href={props.name === "email" ? `mailto:${props.url}` : props.url}
      target={props.name === "email" ? undefined : "_blank"}
      rel={props.name === "email" ? undefined : "noreferrer"}
      className="text-mauve-200 transition-transform hover:scale-120 hover:text-mauve-300"
    >
      {networksIconsMap[props.name as keyof typeof networksIconsMap] || null}
    </a>
  )
}