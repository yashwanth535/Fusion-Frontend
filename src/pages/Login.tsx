import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, LogIn, Loader2, Mail, Lock } from 'lucide-react';
import { loginSchema, type LoginFormData } from '../lib/validation';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const { signIn, isLoading, googleSignIn } = useAuth();
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
    setErrors({});
    const { email, password } = formData;
    try {
      await signIn(email, password);
      navigate('/', { replace: true });
    } catch (err: any) {
      setErrors({ submit: err.message });
    }
  };

  // Update Google login handler
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      await googleSignIn(credentialResponse.credential);
      navigate('/', { replace: true });
    } catch (err: any) {
      setErrors({ submit: err.message });
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

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setErrors({ submit: 'Google login failed. Please try again.' });
              }}
              useOneTap
              theme="outline"
              shape="rectangular"
              text="continue_with"
              width="100%"
            />
          </div>

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