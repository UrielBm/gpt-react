import { useState } from "react";
import GptMessage from "../../components/chat-bubbles/GptMessage";
import TypingLoader from "../../components/loaders/TypingLoader";
import TextMessageBoxWithSelect from "../../components/chat-input-boxes/TextMessageBoxWithSelect";
import MyMessage from "../../components/myMessage/MyMessage";
import { textToAudioUseCase } from "../../helpers/TextToAudioUseCase";
import GptMessageAudio from "../../components/chat-bubbles/GptMessageAudio";

interface Messages {
  message: string;
  isGpt: boolean;
  urlAudio?: string;
}
const voices = [
  { id: "nova", value: "Nova" },
  { id: "alloy", value: "Alloy" },
  { id: "echo", value: "Echo" },
  { id: "fable", value: "Fable" },
  { id: "onyx", value: "Onyx" },
  { id: "shimmer", value: "Shimmer" },
];
const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mesagges, setMesagges] = useState<Messages[]>([]);

  const handlePostMessages = async (message: string, voice = "nova") => {
    try {
      setIsLoading(true);
      setMesagges((prev) => [...prev, { message: message, isGpt: false }]);

      const response = await textToAudioUseCase(message, voice);
      if (!response.ok) return;
      setMesagges((prev) => [
        ...prev,
        { message: response.message, isGpt: true, urlAudio: response.audioUrl },
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
          <GptMessage
            text={`## ¿Con que mensaje puedo ayudarte?
              -Todos los audios son generados con IA.`}
          />
          {mesagges.map((message, index) =>
            message.isGpt ? (
              <GptMessageAudio
                key={index}
                text={message.message}
                urlAudio={message.urlAudio!}
              />
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
        onSendMessage={(message, voice) => handlePostMessages(message, voice)}
        placeholder="escribe aquí tu mensaje que deseas crear con voz."
        options={voices}
      />
    </div>
  );
};

export default TextToAudioPage;
