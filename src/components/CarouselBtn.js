import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CircularBtn = ({ onClick, disabled, icon }) => {
  return (
    <button
      onClick={onClick}
      className="h-10 w-10 md:h-8 md:w-8 rounded-full bg-white border border-ink-200 text-ink-700 flex items-center justify-center cursor-pointer shadow-card transition-all duration-200 hover:bg-ink-50 hover:shadow-card-hover active:scale-90 focus:outline-none focus:ring-4 focus:ring-brand-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:shadow-card"
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} className="text-sm" />
    </button>
  );
};

export default CircularBtn;
