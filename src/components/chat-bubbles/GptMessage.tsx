import Markdown from "react-markdown";

interface Myprops {
  text: string;
}

const GptMessage = ({ text }: Myprops) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shirink-0">
          <i className="fa fa-cubes" aria-hidden="true"></i>
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-x-xl">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  );
};
export default GptMessage;
