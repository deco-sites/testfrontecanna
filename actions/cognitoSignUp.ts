export interface Props {
  email: string;
  password: string;
  name?: string;
  cpf?: string;
}

const signUpCognito = async (
  props: Props,
  _req: Request
): Promise<unknown | null> => {
  try {
    const response = await fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: props.email,
        password: props.password,
        cpf: props.cpf,
        name: props.name,
      }),
    });

    const res = await response.json();
    return res;
  } catch (e) {
    // console.log({ e });
    return e;
  }
};

export default signUpCognito;
