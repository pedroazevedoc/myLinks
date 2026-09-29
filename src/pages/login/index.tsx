import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useState, type SubmitEvent } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Preencha todos os campos!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("Usuário logado com sucesso!");
      navigate("/admin", { replace: true });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className="text-mauve-200 font-bold text-5xl">My
          <span className="bg-linear-to-r from-mauve-500 to-mauve-400 bg-clip-text text-transparent">Links</span>
        </h1>
      </Link>

      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-sm space-y-3 mt-10">
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
}