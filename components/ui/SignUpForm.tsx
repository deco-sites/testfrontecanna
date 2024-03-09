import { invoke } from "$store/runtime.ts";
import { useState } from "preact/hooks";

export interface Props {
  formTitle?: string;
}

function SignUpForm({ formTitle }: Props) {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [cpf, setCPF] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [termsAgree, setTermsAgree] = useState<boolean>(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataSignup = await invoke["deco-sites/testfrontecanna"].actions
        .cognitoSignUp(
          { email, password, name, cpf },
        );
      console.log({ dataSignup });
      setLoading(false);
      window.location.href = "/confirmar-cadastro";
    } catch (e) {
      alert(
        "Não foi possível fazer signup. Verifique as informações fornecidas e tente novamente.",
      );
      console.log({ e });
      setLoading(false);
    }
  };

  return (
    <div class="max-w-[480px]">
      <form
        class="form-control justify-start gap-2 py-8 px-10 bg-[#931C31] rounded-xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        <span class="text-sm text-white font-semibold w-[80%] mb-4">
          {formTitle}
        </span>
        <input
          placeholder="Nome completo"
          class="input input-bordered"
          name="name"
          value={name}
          onChange={(e) => e.target && setName(e.currentTarget.value)}
        />
        <input
          placeholder="Email"
          class="input input-bordered"
          name="email"
          value={email}
          onChange={(e) => e.target && setEmail(e.currentTarget.value)}
        />
        <input
          placeholder="CPF"
          class="input input-bordered"
          name="cpf"
          value={cpf}
          onChange={(e) => e.target && setCPF(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          class="input input-bordered"
          value={password}
          onChange={(e) => e.target && setPassword(e.currentTarget.value)}
          name="email"
        />
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
            Concordo com os <a href="#">Termos de Uso</a> e{" "}
            <a href="#">Políticas de Privacidade</a>
          </span>
        </label>
        <button
          type={"submit"}
          class="btn bg-[#2B2B30] text-white mt-5 disabled:loading border-none"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
