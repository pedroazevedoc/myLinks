import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";

export function Admin() {
  return (
    <div className="flex w-full min-h-screen items-center flex-col">
      <Header />

      <form className="flex flex-col w-full max-w-sm space-y-3 mt-10">
        <div>
          <Label>Nome do link</Label>
          <Input 
            type="text"
            placeholder="Digite o nome do link"
          />
        </div>
        <div>
          <Label>URL do link</Label>
          <Input 
            type="url"
            placeholder="Digite a URL do link"
          />
        </div>

      </form>
    </div>
  );
}