import { FormEvent, useState } from "react";

interface myProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabledCorrections?: boolean;
}
const TextMessageBox = ({
  onSendMessage,
  placeholder,
  disabledCorrections = false,
}: myProps) => {
  const [message, setmessage] = useState("");

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    onSendMessage(message);
    setmessage("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-700 p-2"
            placeholder={placeholder}
            autoComplete={disabledCorrections ? "off" : "on"}
            autoCorrect={disabledCorrections ? "off" : "on"}
            spellCheck={disabledCorrections ? "true" : "false"}
            value={message}
            onChange={(e) => setmessage(e.target.value)}
          />
        </div>
      </div>
      <div className="ml-4">
        <button className="btn-primary">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
export default TextMessageBox;
