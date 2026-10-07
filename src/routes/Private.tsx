import { useEffect, useState, type ReactNode } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

interface PrivateProps {
  children: ReactNode;
}

export function Private(props: PrivateProps): any {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Se não houver usuário logado, redireciona para a página de login
      if (!user) {
        setLoading(false);
        setSigned(false);
        navigate("/login");
      }

      const userData = {
        uid: user?.uid,
        email: user?.email,
      }

      localStorage.setItem("@detailUser", JSON.stringify(userData));
      setSigned(true);
      setLoading(false);

      return () => unsubscribe();
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-screen space-y-2 items-center justify-center">
        <FaSpinner size={24} className="animate-spin text-mauve-200" />
        <span className="text-mauve-200 text-lg">Carregando...</span>
      </div>
    );
  }

  if (!signed) {
    return (
      <div className="flex w-full h-screen items-center justify-center flex-col">
        <h1 className="text-mauve-200 font-bold text-5xl">Você precisa estar logado!</h1>
      </div>
    );
  }

  return (
    <>{props.children}</>
  );
}