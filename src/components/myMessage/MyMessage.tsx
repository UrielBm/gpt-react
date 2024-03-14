interface Myprops {
  text: string;
}
const MyMessage = ({ text }: Myprops) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-600 flex-shirink-0">
          <i className="fa fa-user" aria-hidden="true"></i>
        </div>
        <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow rounded-x-xl">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};
export default MyMessage;
