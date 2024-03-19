import { TranslateInterface } from "../interfaces";

const TranslateUseCase = async (prompt: string, lang: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_PATH}/gpt/translate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, lang }),
      }
    );
    if (!response.ok) throw new Error("No se pudo realizar la correción.");
    const responseData = (await response.json()) as TranslateInterface;
    return {
      ok: true,
      message: responseData.response,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo traducir.",
    };
  }
};

export default TranslateUseCase;
