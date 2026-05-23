import logoImage from '../../assets/images/Logo-videobelajar.png';

function AuthHeader() {
  return (
    <header className="w-full bg-white px-8 py-5">
      <img
        src={logoImage}
        alt="VideoBelajar"
        className="h-7 w-auto object-contain mx-auto sm:mx-0"
      />
    </header>
  );
}

export default AuthHeader;
