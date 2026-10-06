import { useEffect, useState, type SubmitEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Button } from "../../components/Button";
import { BiTrash } from "react-icons/bi";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  textColor: string;
  backgroundColor: string;
  created_at: Date;
  updated_at: Date;
}

export function Admin() {
  const [ links, setLinks ] = useState<LinkProps[]>([]);
  const [ nameInput, setNameInput] = useState("");
  const [ urlInput, setUrlInput] = useState("");
  const [ textColorInput, setTextColorInput] = useState("#ffffff");
  const [ backgroundColorInput, setBackgroundColorInput] = useState("#000000");

  // Função para buscar os links do Firestore
  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created_at", "desc"));

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      let linksList: LinkProps[] = [];

      snapshot.forEach((doc) => {
        linksList.push({
          id: doc.id,
          ...doc.data()
        } as LinkProps);
      })

      setLinks(linksList);
    });

    return () => unsubscribe();
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
  
      // Validação para garantir que os campos obrigatórios foram preenchidos
      if (!nameInput || !urlInput) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
  
      // Lógica para lidar com o envio do formulário
      await addDoc(collection(db, "links"), {
        name: nameInput,
        url: urlInput,
        textColor: textColorInput,
        backgroundColor: backgroundColorInput,
        created_at: new Date(),
        updated_at: new Date()
      });

      // Limpar os campos do formulário após o envio bem-sucedido
      setNameInput("");
      setUrlInput("");
      setTextColorInput("#ffffff");
      setBackgroundColorInput("#000000");

      alert("Link cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar link:", error);
      alert("Ocorreu um erro ao cadastrar o link. Por favor, tente novamente.");
    }
  }

  // Função para lidar com a exclusão de um link
  const handleDelete = async (linkId: string) => {
    try {
      if (!linkId) return;
      await deleteDoc(doc(db, "links", linkId));

      alert("Link excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir link:", error);
      alert("Ocorreu um erro ao excluir o link. Por favor, tente novamente.");
    }
  }

  return (
    <div className="flex w-full min-h-screen items-center flex-col">
      <Header />

      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm space-y-3 mt-10">
        <h2 className="flex justify-center text-xl font-bold text-mauve-200">
          Cadastrar link
        </h2>

        {/* Nome */}
        <div>
          <Label isRequired>Nome do link</Label>
          <Input 
            type="text"
            placeholder="Digite o nome do link"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>

        {/* URL */}
        <div>
          <Label isRequired>URL do link</Label>
          <Input 
            type="url"
            placeholder="Digite a URL do link"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
        </div>

        {/* Cor do texto e do fundo do link */}
        <section className="grid grid-cols-2 gap-4">
          <div>
            <Label>Cor do texto do link</Label>
            <Input 
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>

          <div>
            <Label>Cor do fundo do link</Label>
            <Input 
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>

        {/* Preview do link */}
        {nameInput && urlInput && (
          <div className="flex flex-col w-full items-center justify-center border border-mauve-500 rounded-lg p-4 mt-4 mb-6">
            <Label>Preview do link:</Label>
            <article 
              className="w-full h-10 flex items-center justify-center rounded-lg mt-2"
              style={{ 
                backgroundColor: backgroundColorInput
              }}
            >
              <p style={{ color: textColorInput }}>
                {nameInput || "Nome do link"}
              </p>
            </article>
          </div>
        )}

        {/* Botão para salvar o link */}
        <Button type="submit" disabled={!nameInput || !urlInput}>
          Cadastrar
        </Button>
      </form>

      <h2 className="text-xl font-bold text-mauve-200 mt-8">
        Meus links
      </h2>
      {links.map((link) => (
        <article 
          key={link.id}
          className="flex items-center justify-between w-full max-w-sm mt-4 bg-mauve-500 rounded-lg px-2 py-1 select-none"
          style={{
            backgroundColor: link.backgroundColor,
            color: link.textColor
          }}
        >
          <p>{link.name}</p>
          <div>
            <Button onClick={() => handleDelete(link.id)}>
              <BiTrash size={18} />
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}