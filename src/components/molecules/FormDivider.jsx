function FormDivider({ text = 'atau' }) {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="flex-1 border-t border-gray-200" />
      <span className="text-sm text-gray-400">{text}</span>
      <div className="flex-1 border-t border-gray-200" />
    </div>
  );
}



export default FormDivider;
