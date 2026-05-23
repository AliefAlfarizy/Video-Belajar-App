import InputField from '../atoms/InputField.jsx';

function FormGroup({ label, ...props }) {
  return (
    <div className="mb-4 w-full">
      <InputField label={label} {...props} />
    </div>
  );
}

export default FormGroup;
