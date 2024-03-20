import { FormEvent, useState } from "react";

interface myProps {
  onSendMessage: (message: string, option: string) => void;
  placeholder?: string;
  disabledCorrections?: boolean;
  options: Options[];
}
interface Options {
  id: string;
  value: string;
}
const TextMessageBoxWithSelect = ({
  onSendMessage,
  placeholder,
  disabledCorrections = false,
  options,
}: myProps) => {
  const [message, setmessage] = useState("");
  const [selectOption, setSelectOption] = useState<string>("");
  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    if (selectOption.trim().length === 0) return;
    onSendMessage(message, selectOption);
    setmessage("");
    setSelectOption("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow">
        <div className="flex w-full">
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
          <select
            name="select"
            className="w-2/5 ml-5 border rounded-xl text-gray-800 text-center focus:outline-none focus:border-indigo-300 pl-4 h-10"
            value={selectOption}
            onChange={(e) => setSelectOption(e.target.value)}
          >
            <option value="">--Seleccione una opción--</option>
            {...options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
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
export default TextMessageBoxWithSelect;
