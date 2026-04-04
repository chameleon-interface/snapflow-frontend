import axios from 'axios';

export const downloadBlobByUrl = async (url: string) => {
  const response = await axios.get<Blob>(url, {
    responseType: 'blob',
  });

  return response.data;
};
