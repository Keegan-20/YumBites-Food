import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  const { status, statusText } = err; //destructuring from useRouteError Object
  console.log(err);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center bg-gradient-to-b from-brand-50 to-white">
      <span className="text-6xl" aria-hidden="true">🍔</span>
      <h1 className="text-4xl md:text-3xl font-extrabold tracking-tight text-ink-900">
        Oops!!
      </h1>
      <h2 className="text-lg font-semibold text-ink-700">
        Something went wrong!!
      </h2>
      <h2 className="inline-flex items-center px-4 py-1.5 rounded-full bg-white border border-ink-100 shadow-card text-sm font-bold text-brand-600">
        {status + " : " + statusText}
      </h2>
      <Link
        to="/"
        className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-brand hover:brightness-110 text-white font-bold text-sm transition-all duration-200 active:scale-95 shadow-action"
      >
        Back to Home
      </Link>
    </div>
  );
};
export default Error;
