import { useState } from "react";
import GptMessage from "../../components/chat-bubbles/GptMessage";
import TypingLoader from "../../components/loaders/TypingLoader";
import TextMessageBoxWithSelect from "../../components/chat-input-boxes/TextMessageBoxWithSelect";
import MyMessage from "../../components/myMessage/MyMessage";
import TranslateUseCase from "../../helpers/TranslateUseCase";

interface Messages {
  message: string;
  isGpt: boolean;
}
const languages = [
  { id: "alemán", value: "Alemán" },
  { id: "árabe", value: "Árabe" },
  { id: "bengalí", value: "Bengalí" },
  { id: "francés", value: "Francés" },
  { id: "hindi", value: "Hindi" },
  { id: "inglés", value: "Inglés" },
  { id: "japonés", value: "Japonés" },
  { id: "mandarín", value: "Mandarín" },
  { id: "portugués", value: "Portugués" },
  { id: "ruso", value: "Ruso" },
];

const TrasnlatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mesagges, setMesagges] = useState<Messages[]>([]);

  const handlePostMessages = async (message: string, lang: string) => {
    try {
      setIsLoading(true);
      setMesagges((prev) => [
        ...prev,
        {
          message: `Traduce este texto: ${message}. Al ${lang}.`,
          isGpt: false,
        },
      ]);
      const response = await TranslateUseCase(message, lang);
      if (!response.ok) throw new Error("error no se pudo traducir el texto.");
      setMesagges((prev) => [
        ...prev,
        { message: response.message, isGpt: true },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola soy el Bot de este chat, un gusto ayudarte con tu ortografía." />
          {mesagges.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.message} />
            ) : (
              <MyMessage key={index} text={message.message} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>
      <TextMessageBoxWithSelect
        onSendMessage={(message, lang) => handlePostMessages(message, lang)}
        placeholder="escribe el texto a traducir aquí."
        options={languages}
      />
    </div>
  );
};

export default TrasnlatePage;
