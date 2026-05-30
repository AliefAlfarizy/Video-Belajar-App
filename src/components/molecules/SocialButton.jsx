import googleIcon from '../../assets/images/google-icon-logo.svg';


function SocialButton({ provider = 'google', text, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
    >
      {provider === 'google' && <img src={googleIcon} alt="Google" className="w-5 h-5" />}
      {text}
    </button>
  );
}



export default SocialButton;
