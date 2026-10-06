import { SiGmail, SiInstagram } from "react-icons/si";
import { Social } from "../../components/Social";
import { db } from "../../services/firebaseConnection";
import { useEffect, useState } from "react";
import type { LinkProps, NetworkProps } from "../../types";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";

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
  const [ isLoading, setIsLoading ] = useState(false);
  const [ links, setLinks ] = useState<LinkProps[]>([]);
  const [ networks, setNetworks ] = useState<NetworkProps[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchLinks = async () => {
      try {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created_at", "desc"));

        const linksCollection = await getDocs(queryRef);

        let linksData: LinkProps[] = linksCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        } as LinkProps));
        setLinks(linksData);
      } catch (error) {
        console.error("Erro ao buscar links:", error);
      }
    }

    const fetchNetworks = async () => {
      try {
        const networksRef = doc(db, "networks", "links");
        const networksCollection = await getDoc(networksRef);

        if (!networksCollection.exists()) {
          console.log("Nenhum documento de redes sociais encontrado!");
        }

        setNetworks([networksCollection.data() as NetworkProps]);
      } catch (error) {
        console.error("Erro ao buscar redes sociais:", error);
      }
    }

    setIsLoading(false);

    fetchLinks();
    fetchNetworks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-32">Pedro Azevedo Costa</h1>
      <span className="text-gray-400 mb-5 mt-2">Veja meus links</span>

      <main className="flex flex-col w-11/12 max-w-xl space-y-3 text-center">
        {isLoading ? (
          <span className="text-white text-lg">Carregando links...</span>
        ) : (
          links.length === 0 ? (
            <span className="text-white text-lg">Nenhum link encontrado!</span>
          ) : (
            links.map((link) => (
              <section 
                key={link.id} 
                className="bg-mauve-200 w-full py-2 rounded-md select-none transition-transform hover:scale-103 hover:bg-mauve-300 cursor-pointer"
                style={{ backgroundColor: link.backgroundColor }}
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <span 
                    className="text-base md:text-lg text-mauve-600 font-bold"
                    style={{ color: link.textColor }}
                  >
                    {link.name}
                  </span>
                </a>
              </section>
            ))
          )
        )}

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