import { SiGmail, SiInstagram } from "react-icons/si";
import { Social } from "../../components/social";

const linksMock = [
  {
    title: "Portfólio",
    url: "https://www.pedroazevedoc.vercel.app"
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/azpedroc"
  },
  {
    title: "GitHub",
    url: "https://www.github.com/pedroazevedoc"
  }
];

const socialMock = [
  {
    url: "https://www.instagram.com/azpedroc",
    icon: <SiInstagram />
  },
  {
    url: "pedroazvdo.8@gmail.com",
    icon: <SiGmail />
  }
];

export function Home() {
  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-32">Pedro Azevedo Costa</h1>
      <span className="text-gray-400 mb-5 mt-2">Veja meus links</span>

      <main className="flex flex-col w-11/12 max-w-xl space-y-3 text-center">
        {linksMock.map((link, index) => (
          <section key={index} className="bg-mauve-200 w-full py-2 rounded-md select-none transition-transform hover:scale-103 hover:bg-mauve-300 cursor-pointer">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <span className="text-base md:text-lg text-mauve-600 font-bold">{link.title}</span>
            </a>
          </section>
        ))}

        <footer className="flex justify-center gap-3 my-4">
          {socialMock.map((social, index) => (
            <Social key={index} url={social.url}>
              {social.icon}
            </Social>
          ))}
        </footer>
      </main>
    </div>
  );
}