import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { clearAuthError, register } from "../features/auth/authSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <AuthForm
      title="Create your workspace"
      subtitle="Register and start tracking tasks with realtime team updates."
      submitLabel="Register"
      fields={[
        {
          name: "name",
          label: "Full name",
          type: "text",
          placeholder: "Name",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Create password",
        },
      ]}
      onSubmit={(values) => dispatch(register(values))}
      loading={loading}
      error={error}
      footer={
        <p className="muted">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      }
    />
  );
};

export default RegisterPage;
