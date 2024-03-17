import { OrthographyInterfaces } from "../interfaces";

const orthographyCaseUse = async (prompt: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_PATH}/gpt/orthography-ckeck`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );
    if (!response.ok) throw new Error("No se pudo realizar la correción.");
    const responseData = (await response.json()) as OrthographyInterfaces;
    return {
      ok: true,
      ...responseData,
    };
  } catch (error) {
    return {
      ok: false,
      score: 0,
      errors: [],
      correctText: "¡Ups! no se pudo recuperar y corregir el texto.",
      message:
        "Lo sentimos no se pudo recuperar el texto intenta de nuevo más tarde.",
    };
  }
};

export default orthographyCaseUse;
