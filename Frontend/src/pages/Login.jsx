import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginStore } from '../store';
import Swal from 'sweetalert2';

const Login = () => {
  const [formInput, setFormInput] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { login, loading, error, message, resetMessage } = useLoginStore(
    (state) => state
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formInput.email, formInput.password, navigate);
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
      });
    }

    if (message) {
      Swal.fire({
        title: 'Success',
        text: message,
        icon: 'success',
      }).then(() => {
        resetMessage();
      });
    }
  }, [error, message]);

  return (
    <div className="flex justify-center items-center w-3/4 min-h-screen mx-auto">
      <div className="flex justify-between gap-5 shadow-xl">
        <div className="w-1/2 p-5 flex justify-center items-center">
          <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-gray-600"
              >
                Email:
              </label>
              <div className="mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Input your email"
                  className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg py-3.5 px-4 w-[20rem] p-2.5"
                  value={formInput.email}
                  onChange={handleForm}
                />
              </div>

              <label
                htmlFor="password"
                className="block mb-2 font-medium text-gray-600"
              >
                Password:
              </label>
              <div className="mb-5">
                <input
                  type="password"
                  name="password"
                  placeholder="Input your password"
                  className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg py-3.5 px-4 w-[20rem] p-2.5"
                  value={formInput.password}
                  onChange={handleForm}
                />
              </div>
              <div className="mt-10 flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-gray-200 py-3 px-10 rounded-lg hover:bg-gray-400"
                >
                  {loading ? 'Loading...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-1/2">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="login"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
