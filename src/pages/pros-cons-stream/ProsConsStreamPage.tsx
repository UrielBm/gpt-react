import { useRef, useState } from "react";
import GptMessage from "../../components/chat-bubbles/GptMessage";
import TypingLoader from "../../components/loaders/TypingLoader";
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox";
import MyMessage from "../../components/myMessage/MyMessage";
import ProsConsStreamUseCase from "../../helpers/ProsConsStreamUseCase";

interface Messages {
  message: string;
  isGpt: boolean;
}
const ProsConsStreamPage = () => {
  const abortController = useRef(new AbortController());
  const isRunning = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mesagges, setMesagges] = useState<Messages[]>([]);

  const handlePostMessages = async (message: string) => {
    try {
      if (isRunning.current) {
        abortController.current.abort();
        abortController.current = new AbortController();
      }
      setIsLoading(true);
      setMesagges((prev) => [...prev, { message: message, isGpt: false }]);

      const stream = ProsConsStreamUseCase(
        message,
        abortController.current.signal
      );
      setIsLoading(false);

      setMesagges((prev) => [...prev, { message: "", isGpt: true }]);
      for await (const streamMessage of stream) {
        setMesagges((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].message = streamMessage;
          return newMessages;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola,¿qué comparación puedo ayudarte hoy?" />
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
      <TextMessageBox
        onSendMessage={(message) => handlePostMessages(message)}
        placeholder="escribe aquí tu mensaje"
        disabledCorrections={true}
      />
    </div>
  );
};

export default ProsConsStreamPage;
