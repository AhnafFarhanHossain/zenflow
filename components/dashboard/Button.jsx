const Button = ({ title }) => {
  return (
    <button className="text-white bg-blue-500 px-6 py-2 rounded-sm w-full cursor-pointer hover:bg-blue-600">
      {title}
    </button>
  );
};

export default Button;
