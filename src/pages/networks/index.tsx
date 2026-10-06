import { useState, type SubmitEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Button } from "../../components/Button";
import { FaLink } from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import { doc, setDoc } from "firebase/firestore";

export function Networks() {
  const [ inputs, setInputs ] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: ""
  });

  // Cria/Atualiza os links
  const handleSave = async (e: SubmitEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      // Validação para garantir que os campos obrigatórios foram preenchidos
      if (!inputs.instagram || !inputs.facebook || !inputs.twitter || !inputs.youtube) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      // Lógica para lidar com o envio do formulário
      await setDoc(doc(db, "networks", "links"), {
        instagram: inputs.instagram,
        facebook: inputs.facebook,
        twitter: inputs.twitter,
        youtube: inputs.youtube
      });

      // Limpar os campos após o envio bem-sucedido
      setInputs({
        instagram: "",
        facebook: "",
        twitter: "",
        youtube: ""
      });

      alert("Links salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar link:", error);
      alert("Ocorreu um erro ao salvar o link. Por favor, tente novamente.");
    }
  }

  return (
    <div className="flex w-full min-h-screen items-center flex-col">
      <Header />

      <form onSubmit={handleSave} className="flex flex-col w-full max-w-sm space-y-3 mt-10">
        <h2 className="flex justify-center text-xl font-bold text-mauve-200">
          Redes Sociais
        </h2>

        {/* Instagram */}
        <div>
          <Label>Instagram</Label>
          <Input 
            type="url"
            placeholder="Digite o link do seu Instagram"
            value={inputs.instagram}
            onChange={(e) => setInputs({...inputs, instagram: e.target.value})}
          />
        </div>

        {/* Facebook */}
        <div>
          <Label>Facebook</Label>
          <Input 
            type="url"
            placeholder="Digite o link do seu Facebook"
            value={inputs.facebook}
            onChange={(e) => setInputs({...inputs, facebook: e.target.value})}
          />
        </div>

        {/* Twitter */}
        <div>
          <Label>Twitter</Label>
          <Input 
            type="url"
            placeholder="Digite o link do seu Twitter"
            value={inputs.twitter}
            onChange={(e) => setInputs({...inputs, twitter: e.target.value})}
          />
        </div>

        {/* YouTube */}
        <div>
          <Label>YouTube</Label>
          <Input 
            type="url"
            placeholder="Digite o link do seu YouTube"
            value={inputs.youtube}
            onChange={(e) => setInputs({...inputs, youtube: e.target.value})}
          />
        </div>

        {/* Botão para salvar o link */}
        <Button type="submit" disabled={!inputs.instagram || !inputs.facebook || !inputs.twitter || !inputs.youtube}>
          Salvar
          <FaLink size={14} />
        </Button>
      </form>
    </div>
  );
}