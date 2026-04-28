import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { clearAuthError, login } from "../features/auth/authSlice";

const LoginPage = () => {
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
      title="Welcome back"
      subtitle="Sign in to manage tasks, realtime updates, and productivity insights."
      submitLabel="Login"
      fields={[
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
          placeholder: "Enter password",
        },
      ]}
      onSubmit={(values) => dispatch(login(values))}
      loading={loading}
      error={error}
      footer={
        <p className="muted">
          No account? <Link to="/register">Create one</Link>
        </p>
      }
    />
  );
};

export default LoginPage;

