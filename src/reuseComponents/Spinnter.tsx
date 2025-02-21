const Spinnter = () => {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="w-6 h-6 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <circle
          className="text-transparent border-4 border-t-4 border-blue-500 border-solid rounded-full"
          cx="12"
          cy="12"
          r="8"
          stroke="currentColor"
          stroke-width="4"
          fill="none"
        ></circle>
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="4"
          d="M4 12a8 8 0 0 1 16 0"
          fill="none"
        ></path>
      </svg>
    </div>
  );
};

export default Spinnter;
