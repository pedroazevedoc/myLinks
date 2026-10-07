import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import type { SocialProps } from "../../types";
import { SiGmail } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

// Mapeamento dos ícones das redes sociais
const networksIconsMap = {
  instagram: <FaInstagram size={24} />,
  facebook: <FaFacebook size={24} />,
  x: <FaXTwitter size={24} />,
  youtube: <FaYoutube size={24} />,
  email: <SiGmail size={24} />,
  github: <FaGithub size={24} />,
  linkedin: <FaLinkedin size={24} />,
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