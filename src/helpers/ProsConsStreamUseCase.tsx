async function* ProsConsStreamUseCase(
  prompt: string,
  Abortsignal: AbortSignal
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_PATH}/gpt/pros-cons-disscusser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        signal: Abortsignal,
      }
    );

    if (!response.ok)
      throw new Error("Lo sentimos no se pudo hacer la comparación");
    const reader = response.body?.getReader();
    if (!reader) {
      console.error("No se pudo generar el reader");
      return null;
    }
    const decoder = new TextDecoder();
    let text = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      yield text;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default ProsConsStreamUseCase;
