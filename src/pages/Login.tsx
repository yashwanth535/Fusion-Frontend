import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, LogIn, Loader2, Mail, Lock } from 'lucide-react';
import { loginSchema, type LoginFormData } from '../lib/validation';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: keyof LoginFormData, value: string) => {
    try {
      loginSchema.shape[name].parse(value);
      setErrors(prev => ({ ...prev, [name]: '' }));
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => ({ ...prev, [name]: error.message }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof LoginFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginSchema.parseAsync(formData);
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setErrors(prev => ({ ...prev, submit: error.message }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-100 flex-center py-12 px-4">
      <div className="max-w-md w-full mx-auto">
        <div className="startup-form hover:shadow-xl">
          <div className="text-center mb-8">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex-center mx-auto mb-4 shadow-md">
              <ChefHat className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-30-bold">Welcome Back</h1>
            <p className="text-16-medium text-black-100 mt-2">
              Sign in to continue to Flavour Fusion
            </p>
          </div>

          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
              <p className="text-red-700 font-medium">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="startup-form_label">
                Email Address
              </label>
              <div className="relative">
                {/* <div className="form-icon-container">
                  <Mail className="form-icon" />
                </div> */}
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="startup-form_input pl-12"
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="startup-form_error">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex-between mb-2">
                <label htmlFor="password" className="startup-form_label">
                  Password
                </label>
                <a 
                  href="#" 
                  className="text-sm text-primary hover:underline font-medium transition-colors duration-300"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                {/* <div className="form-icon-container">
                  <Lock className="form-icon" />
                </div> */}
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="startup-form_input pl-12"
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
              </div>
              {errors.password && (
                <p id="password-error" className="startup-form_error">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="startup-form_btn"
            >
              {isLoading ? (
                <span className="flex-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex-center gap-2">
                  <LogIn className="h-5 w-5" />
                  Sign In
                </span>
              )}
            </button>
          </form>

          <div className="form-divider my-8">
            <span className="form-divider-text">OR</span>
          </div>

          <button className="w-full border-[3px] border-black rounded-xl py-3 flex-center gap-2 hover:bg-gray-50 transition-colors duration-300 shadow-md">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="h-5 w-5" />
            <span className="font-medium">Continue with Google</span>
          </button>

          <div className="mt-8 text-center">
            <p className="text-16-medium text-black-100">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-primary hover:underline font-semibold transition-colors duration-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;