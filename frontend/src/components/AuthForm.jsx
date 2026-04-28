import { useState } from "react";

const AuthForm = ({
  title,
  subtitle,
  submitLabel,
  fields,
  onSubmit,
  loading,
  error,
  footer,
}) => {
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {});
  const [form, setForm] = useState(initialState);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">Assessment Submission App</p>
        <h1>{title}</h1>
        <p className="muted">{subtitle}</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.name} className="input-group">
              <span>{field.label}</span>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
              />
            </label>
          ))}
          {error ? <p className="error-text">{error}</p> : null}
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Please wait..." : submitLabel}
          </button>
        </form>
        {footer}
      </div>
    </div>
  );
};

export default AuthForm;

