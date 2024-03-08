/**
 * This component was made to control if user is logged in to access pages
 */
// import type { SectionProps } from "deco/types.ts";
// import { useUI } from "$store/sdk/useUI.ts";
import { useEffect } from "preact/hooks";

export interface Props {
  redirectTo?: string;
}

function PrivatePageControl(props: Props) {
  async function isLogged({ accessToken }: { accessToken: string }) {
    // if (accessToken === "") {
    //   window.location.href = "/";
    // }
    try {
      const response = await fetch("http://localhost:3000/auth/get-me", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          Authorization: accessToken,
        },
      }).then((r) => r.json());

      console.log({ response });
      console.log({ response: response.data });

      if (!response.data) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  useEffect(() => {
    // Pega accessCode no localStorage para verificar se ainda está válida a sessão via api
    const accessToken = localStorage.getItem("AccessToken") || "";

    if (accessToken === "") {
      window.location.href = "/";
    }

    isLogged({ accessToken });
  }, []); // Passando um array de dependências vazio

  return null;
}

export default PrivatePageControl;
