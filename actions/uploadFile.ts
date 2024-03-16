export interface Props {
  data: {
    files: {
      file: File;
    };
    body: {
      category: string;
    };
  };
  token?: string;
}

const getUser = async (
  { data }: Props,
  _req: Request
): Promise<unknown | null> => {
  try {
    const response = await fetch('http://localhost:3000/files', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'multipart/form-data;',
        // Authorization: token,
      },
    });

    const res = await response.json();
    return res;
  } catch (e) {
    // console.log({ e });
    return e;
  }
};

export default getUser;
