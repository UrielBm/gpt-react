import { useState } from "react";
import GptMessage from "../../components/chat-bubbles/GptMessage";
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox";
import TypingLoader from "../../components/loaders/TypingLoader";
import MyMessage from "../../components/myMessage/MyMessage";

interface Messages {
  message: string;
  isGpt: boolean;
}

const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mesagges, setMesagges] = useState<Messages[]>([]);

  const handlePostMessages = async (message: string) => {
    try {
      setIsLoading(true);
      setMesagges((prev) => [...prev, { message: message, isGpt: false }]);

      //TODO: Usecase
      setIsLoading(false);

      //TODO: añadir el mensaje de backend de gpt
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
              <GptMessage key={index} text="mensaje que viene de back" />
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
      <TextMessageBox
        onSendMessage={(message) => handlePostMessages(message)}
        placeholder="escribe aquí tu mensaje"
        disabledCorrections={true}
      />
    </div>
  );
};

export default OrthographyPage;
