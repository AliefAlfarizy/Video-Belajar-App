import Button from '../atoms/Button.jsx';

function SocialLoginGroup({ mode = "login", onClickGoogle }) {
  const labelText = mode === "login" ? "Masuk dengan Google" : "Daftar dengan Google";

  return (
    <div className="flex flex-col items-center w-full gap-4 mt-2">
      <div className="flex items-center w-full my-1">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-3 text-xs text-gray-400 font-medium uppercase tracking-wider select-none">atau</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>


      <Button variant="google" onClick={onClickGoogle}>
        {labelText}
      </Button>
    </div>
  );
}



export default SocialLoginGroup;
