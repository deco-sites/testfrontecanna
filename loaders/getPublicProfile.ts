import type { RequestURLParam } from 'apps/website/functions/requestToParam.ts';

export interface Props {
  slug: RequestURLParam;
}

export interface Cid {
  _id: string;
  name: string;
  description: string;
}

export interface Document {
  title: string;
  file_url: string;
  category: string;
}

export interface PublicProfile {
  cpf: string;
  name: string;
  cids: Cid[];
  plan: string;
  documents: Document[];
}

const getPublicProfile = async (
  { slug }: Props,
  _req: Request
): Promise<PublicProfile> => {
  console.log({ idLoader: slug });
  try {
    const response = await fetch('http://localhost:3000/auth/public/' + slug, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = await response.json();
    return res;
  } catch (e) {
    // console.log({ e });
    return e;
  }
};

export default getPublicProfile;
