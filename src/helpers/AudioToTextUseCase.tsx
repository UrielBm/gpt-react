import { AudioToTextInterface } from "../interfaces";

interface options {
  file: File;
  message?: string;
}

export const AudioToTextUseCase = async ({ file, message }: options) => {
  try {
    const formData = new FormData();
    formData.append("audio", file);
    if (message) {
      formData.append("prompt", message);
    }
    const response = await fetch(
      `${import.meta.env.VITE_API_PATH}/gpt/audio-to-text`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = (await response.json()) as AudioToTextInterface;
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
