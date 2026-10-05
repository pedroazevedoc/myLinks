import { useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Button } from "../../components/Button";

export function Admin() {
  const [ nameInput, setNameInput] = useState("");
  const [ urlInput, setUrlInput] = useState("");
  const [ textColorInput, setTextColorInput] = useState("#ffffff");
  const [ backgroundColorInput, setBackgroundColorInput] = useState("#000000");

  return (
    <div className="flex w-full min-h-screen items-center flex-col">
      <Header />

      <form className="flex flex-col w-full max-w-sm space-y-3 mt-10">
        {/* Nome e URL do link */}
        <div>
          <Label>Nome do link</Label>
          <Input 
            type="text"
            placeholder="Digite o nome do link"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>
        <div>
          <Label>URL do link</Label>
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
    </div>
  );
}