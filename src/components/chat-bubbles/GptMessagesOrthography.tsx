interface Myprops {
  score: number;
  errors: any[];
  correctText: string;
  message: string;
}
interface arrayErrors {
  error: string;
}

const GptMessageOrthography = ({
  score,
  correctText,
  message,
  errors,
}: Myprops) => {
  console.log(errors);
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shirink-0">
          <i className="fa fa-cubes" aria-hidden="true"></i>
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-x-xl">
          <h2 className="text-3xl">score:{score} %</h2>
          <div>
            <p>{message}</p>
            <div>
              <h3 className="text-2xl">Errores encontrados:</h3>
              <ul>
                {errors.length === 0 ? (
                  <li>No hay errores</li>
                ) : (
                  errors.map((error, index) => <li key={index}>{error}</li>)
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl">Texto corregido</h3>
              <p>{correctText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GptMessageOrthography;
