import GptMessage from "../../components/chat-bubbles/GptMessage";
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox";
import TypingLoader from "../../components/loaders/TypingLoader";
import MyMessage from "../../components/myMessage/MyMessage";

const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola soy el Bot de este chat, un gusto ayudarte con tu ortografía." />
          <MyMessage text="Hola" />
          <TypingLoader />
        </div>
      </div>
      <TextMessageBox
        onSendMessage={(message) => console.log(message)}
        placeholder="lo que sea"
        disabledCorrections={true}
      />
    </div>
  );
};

export default OrthographyPage;
