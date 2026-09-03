import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CircularBtn = ({ onClick, disabled, icon }) => {
  return (
    <button
      onClick={onClick}
      className="h-10 w-10 md:h-8 md:w-8 rounded-full bg-white border border-cream-300 text-ink-700 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:border-ink-300 hover:text-ink-900 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 disabled:opacity-30 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} className="text-sm" />
    </button>
  );
};

export default CircularBtn;
