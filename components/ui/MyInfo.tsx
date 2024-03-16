/**
 * This component was made to control if user is logged in to access pages
 */
// import type { SectionProps } from "deco/types.ts";
// import { useUI } from "$store/sdk/useUI.ts";
import { useEffect, useState } from "preact/hooks";
import { invoke } from "$store/runtime.ts";
import { h } from "preact";

function MyInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCids, setIsLoadingCids] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [authorization, setAuthorization] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [addressComplement, setAddressComplement] = useState("");
  const [cidSearchTerm, setCidSearchTerm] = useState("");
  const [cidSearchResponse, setCidSearchResponse] = useState<unknown[]>([]);
  const [cids, setCids] = useState<unknown[]>([]);
  const [displayCidResults, setDisplayCidResults] = useState(false);

  useEffect(() => {
    // Pega accessCode no localStorage para verificar se ainda está válida a sessão via api
    const accessToken = localStorage.getItem("AccessToken") || "";
    setAuthorization(accessToken);

    if (accessToken === "") {
      window.location.href = "/";
    }

    try {
      setIsLoading(true);
      invoke["deco-sites/testfrontecanna"].actions.getUser({
        token: accessToken,
      }).then((r) => {
        console.log({ r });
        setIsLoading(false);
      });
    } catch (e) {
      alert(
        "Não foi possível carregar dados do usuário. Tente novamente mais tarde ou contecte o suporte.",
      );
      setIsLoading(false);
    }
  }, []); // Passando um array de dependências vazio

  const handleUploadSelfie = (
    event: h.JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files && fileInput.files[0];
    console.log({ files: fileInput.files, file });
    if (file) {
      // const formData = new FormData();
      // formData.append("file", file);
      // formData.append("category", "selfie_photo");

      const data = {
        files: {
          file,
        },
        body: {
          category: "selfie_photo",
        },
      };

      console.log({ data });
      try {
        invoke["deco-sites/testfrontecanna"].actions.uploadFile({
          data,
        }).then((r) => {
          console.log({ responseUploadFile: r });
          setIsLoading(false);
        });
      } catch (e) {
        console.log({ e });
      }
    }
  };

  const handleSearchCids = (term: string) => {
    try {
      setIsLoadingCids(true);
      invoke["deco-sites/testfrontecanna"].actions.getCids({
        term,
        token: authorization,
      }).then((r) => {
        console.log({ responseGetCIDS: r });
        const getCids = r as { docs: unknown[] };
        if (getCids.docs) {
          setCidSearchResponse(getCids.docs);
        }
        setIsLoadingCids(false);
      });
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    isLoading
      ? <span class="loading loading-spinner text-green-600"></span>
      : (
        <div>
          <h3>Meus Dados</h3>
          <div>
            {/* Perosnal Info */}
            <h2>Dados Pessoais</h2>

            {/* Selfie */}
            <input
              type="file"
              class="file-input file-input-bordered file-input-xs w-full max-w-xs"
              onChange={handleUploadSelfie}
            />

            {/* Adrress */}
            <h2>Endereço Residencial - Também usado para entregas</h2>

            {/* CIDs */}
            <h2>Selecione seus CIDs</h2>
            <div class="join flex flex-col">
              <input
                placeholder="Pesquise seus CIDs"
                class="input input-bordered join-item"
                name="cids"
                value={cidSearchTerm}
                onChange={(e) => {
                  setCidSearchTerm(e.currentTarget.value);
                  handleSearchCids(e.currentTarget.value);
                }}
                // onFocus={() => setDisplayCidResults(true)}
                // onBlur={() => setDisplayCidResults(false)}
              />
              <div class={`join-item`}>
                <ul>
                  {cidSearchResponse.slice(0, 5).map((c) => {
                    const cid = c as {
                      full_code: string;
                      name: string;
                      _id: string;
                    };
                    return (cid.name != "" && (
                      <li
                        class="cursor-pointer"
                        onClick={() => {
                          setCids([...cids, cid]);
                        }}
                      >
                        {cid.full_code} - {cid.name}
                      </li>
                    ));
                  })}
                </ul>
              </div>
              <div>
                {cids.map((c) => {
                  const cid = c as { full_code: string; name: string };
                  return (
                    <div class="badge badge-success gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        class="inline-block w-4 h-4 stroke-current"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        >
                        </path>
                      </svg>
                      {cid.full_code} - {cid.name}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Responsability Agreement */}
            <label class="cursor-pointer label flex justify-start gap-2">
              <input
                type="checkbox"
                checked={termsAgree}
                class="checkbox checkbox-xs border-white"
                onChange={(e) => {
                  setTermsAgree(e.currentTarget.checked);
                }}
              />
              <span class="label-text text-xs text-white">
                Declaro, sob minha responsabilidade, que todas as informações
                inseridas neste formulário são verdadeiras
              </span>
            </label>
          </div>
        </div>
      )
  );
}

export default MyInfo;
