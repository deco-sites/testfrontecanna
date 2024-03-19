export interface Props {
  token: string;
  avatar_photo: string;
  name: string;
  cpf: string;
  cids: string[];
  address: {
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    addressType: "BILLING" | "SHIPPING";
  };
}

const updateUserData = async (
  props: Props,
  _req: Request,
): Promise<unknown | null> => {
  const { token, avatar_photo, name, cpf, address, cids } = props;

  const updateCognitoUserBody = {
    name,
    "custom:cpfcnpj": cpf,
  };

  const updateProfileBody = {
    avatar_photo,
    cids,
    address,
  };

  try {
    const responseUpdateCognito = await fetch("http://localhost:3000/auth/me", {
      method: "PUT",
      body: JSON.stringify(updateCognitoUserBody),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const resCognito = await responseUpdateCognito.json();

    console.log({ resCognito });

    const responseUpdateProfile = await fetch("http://localhost:3000/profile", {
      method: "PUT",
      body: JSON.stringify(updateProfileBody),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const resProfile = await responseUpdateProfile.json();

    console.log({ resProfile });

    return { resProfile, resCognito };
  } catch (e) {
    console.log({ e });
    return e;
  }
};

export default updateUserData;
