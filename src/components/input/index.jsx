import "./index.css";

function Input(basement) {
  const {
    className,
    type = "text",
    placeholder = "Enter any text",
    value,
    onChange,
    disabled = false,
    label = "Name",
    danger = false,
  } = basement;

  const classes = `${className} my-input my-input--${type} my-input--${
    disabled ? "disabled" : "enabled"
  } my-input--${danger ? "danger" : "safe"}`;

  const labelClasses = `my-input-label ${danger ? "my-input-label--danger" : "my-input-label--safe"}`;

  return (
    <div className="my-input-container">
      {label && <label className={labelClasses}>{label}</label>}
      <input
        type={type}
        className={classes}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
