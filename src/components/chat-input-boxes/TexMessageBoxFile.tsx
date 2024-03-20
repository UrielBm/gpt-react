import { FormEvent, useRef, useState } from "react";

interface myProps {
  onSendMessage: (message: string, file: File) => void;
  placeholder?: string;
  disabledCorrections?: boolean;
  accept?: string;
}
const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  disabledCorrections = false,
  accept,
}: myProps) => {
  const [message, setmessage] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [selectFile, setSelectFile] = useState<File | null | undefined>(null);
  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (message.trim().length === 0 ) return;
    if (!selectFile) return;
    onSendMessage(message, selectFile);
    setmessage("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="mr-3">
        <button
          type="button"
          className="flex items-center justify-center text-gray-400 hover:text-gray-600"
          onClick={() => inputFileRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
        </button>
        <input
          type="file"
          ref={inputFileRef}
          accept={accept}
          onChange={(e) => setSelectFile(e.target.files?.item(0))}
          hidden
        />
      </div>
      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            placeholder={placeholder}
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-700 p-2"
            autoComplete={disabledCorrections ? "off" : "on"}
            autoCorrect={disabledCorrections ? "off" : "on"}
            spellCheck={disabledCorrections ? "true" : "false"}
            value={message}
            onChange={(e) => setmessage(e.target.value)}
          />
        </div>
      </div>
      <div className="ml-4">
        <button className="btn-primary" disabled={!selectFile}>
          {!selectFile ? (
            <span className="mr-2">Enviar</span>
          ) : (
            <span className="mr-2">{`${selectFile.name.substring(
              0,
              10
            )}...`}</span>
          )}
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
export default TextMessageBoxFile;
