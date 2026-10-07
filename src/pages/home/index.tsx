import { Social } from "../../components/Social";
import { db } from "../../services/firebaseConnection";
import { useEffect, useState } from "react";
import type { LinkProps, NetworkProps } from "../../types";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { FaSpinner } from "react-icons/fa";

export function Home() {
  const [ isLoading, setIsLoading ] = useState({
    links: false,
    networks: false
  });
  const [ links, setLinks ] = useState<LinkProps[]>([]);
  const [ networks, setNetworks ] = useState<NetworkProps>();

  useEffect(() => {
    setIsLoading({
      links: true,
      networks: true
    });

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
      } finally {
        setIsLoading((prev) => ({ ...prev, links: false }));
      }
    }

    const fetchNetworks = async () => {
      try {
        const networksRef = doc(db, "networks", "links");
        const networksCollection = await getDoc(networksRef);

        if (!networksCollection.exists()) {
          console.log("Nenhum documento de redes sociais encontrado!");
        }

        setNetworks(networksCollection.data() as NetworkProps);
      } catch (error) {
        console.error("Erro ao buscar redes sociais:", error);
      } finally {
        setIsLoading((prev) => ({ ...prev, networks: false }));
      }
    }

    fetchLinks();
    fetchNetworks();
  }, []);

  if (isLoading.links && isLoading.networks) {
    return (
      <div className="flex flex-col h-screen space-y-2 items-center justify-center">
        <FaSpinner size={24} className="animate-spin text-mauve-200" />
        <span className="text-mauve-200 text-lg">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-mauve-200 mt-32">Pedro Azevedo Costa</h1>
      <span className="text-mauve-400 mb-5 mt-2">Veja meus links</span>

      <main className="flex flex-col w-11/12 max-w-xl space-y-3 text-center">
        {/* Links */}
        {isLoading.links ? (
          <span className="text-mauve-200 text-lg">Carregando links...</span>
        ) : (
          links.length === 0 ? (
            <span className="text-mauve-200 text-lg">Nenhum link encontrado!</span>
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

        {/* Redes Sociais */}
        {isLoading.networks ? (
          <span className="text-mauve-200 text-lg">Carregando redes sociais...</span>
        ) : (
          networks && Object.entries(networks).length === 0 ? (
            <span className="text-mauve-200 text-lg">Nenhuma rede social encontrada!</span>
          ) : (
            <footer className="flex justify-center gap-3 my-4">
              {Object.entries(networks || {}).map(([key, value]) => (
                <Social name={key} url={value} />
              ))}
            </footer>
          )
        )}
      </main>
    </div>
  );
}