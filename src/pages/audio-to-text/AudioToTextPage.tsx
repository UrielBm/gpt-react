import { useState } from "react";
import GptMessage from "../../components/chat-bubbles/GptMessage";
import TextMessageBoxFile from "../../components/chat-input-boxes/TexMessageBoxFile";
import TypingLoader from "../../components/loaders/TypingLoader";
import MyMessage from "../../components/myMessage/MyMessage";
import { AudioToTextUseCase } from "../../helpers/AudioToTextUseCase";

interface Messages {
  message: string;
  isGpt: boolean;
}

const AudioToTextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mesagges, setMesagges] = useState<Messages[]>([]);

  const handlePostMessages = async (message: string, file: File) => {
    try {
      setIsLoading(true);
      setMesagges((prev) => [...prev, { message: message, isGpt: false }]);
      const response = await AudioToTextUseCase({ file, message });
      if (!response) return;
      setMesagges((prev) => [
        ...prev,
        {
          message: `La transcripción del audio a texto es: ${response.text}`,
          isGpt: true,
        },
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
          <GptMessage text="Hola soy el Bot de este chat, con que trascripción del audio a texto puedo ayudarte." />
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
      <TextMessageBoxFile
        onSendMessage={(message, file) => handlePostMessages(message, file)}
        placeholder="escribre alguna instruccion para el generador."
        accept="audio/*"
      />
    </div>
  );
};

export default AudioToTextPage;
