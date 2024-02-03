import * as sjcl from "sjcl";

const secretKey = process.env.SECRET_KEY_CRYPTO!;

export const encryptionData = (dataToEncrypt: string): string => {
  const cipher = sjcl.encrypt(secretKey, dataToEncrypt);
  return btoa(JSON.stringify(cipher));
};

export const decryptionData = (encryptedData: string): string => {
  const cipher = JSON.parse(atob(encryptedData));
  return sjcl.decrypt(secretKey, cipher);
};
