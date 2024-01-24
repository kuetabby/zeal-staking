import "./style.css";

interface Props {}

const ComingSoon: React.FC<Props> = () => {
  return (
    <div className="coming-soon-container flex justify-center items-center">
      <div className="w-96 m-auto px-4 py-10 border-2 border-indigo-500 rounded-2xl coming-soon-title text-center">
        Coming Soon
      </div>
    </div>
  );
};

export default ComingSoon;
