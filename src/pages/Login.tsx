import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, LogIn, Loader2, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const googleButtonRef = useRef<HTMLDivElement>(null);

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
    setSuccessMessage(null);
    const { email, password } = formData;
    try {
      await signIn(email, password);
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500);
    } catch (err: any) {
      setErrors({ submit: err.message });
    }
  };

  // Update Google login handler
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setSuccessMessage(null);
      await googleSignIn(credentialResponse.credential);
      setSuccessMessage("Google login successful! Redirecting...");
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 1500);
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

          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-green-700 font-medium">{successMessage}</p>
            </div>
          )}

          {errors.submit && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
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
                  className={`startup-form_input pl-12 ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="flex items-center text-red-600 text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Invalid email format
                </p>
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
                  className={`startup-form_input pl-12 ${errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
              </div>
              {errors.password && (
                <p id="password-error" className="flex items-center text-red-600 text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Invalid password format
                </p>
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

          <div className="flex justify-center w-full">
            <div className="w-full relative overflow-hidden">
              <button 
                type="button"
                className="startup-form_btn flex-center gap-2 bg-black text-white hover:bg-primary hover:text-black"
                onClick={() => {
                  if (googleButtonRef.current) {
                    const button = googleButtonRef.current.querySelector('div[role="button"]');
                    if (button) {
                      (button as HTMLElement).click();
                    }
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 186.69 190.5" className="text-white">
                  <g transform="translate(1184.583 765.171)">
                    <path clip-path="none" mask="none" d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" fill="#4285f4"/>
                    <path clip-path="none" mask="none" d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853"/>
                    <path clip-path="none" mask="none" d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05"/>
                    <path d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" fill="#ea4335" clip-path="none" mask="none"/>
                  </g>
                </svg>
                <span>Continue with Google</span>
              </button>
              
              <div ref={googleButtonRef} className="absolute opacity-0 pointer-events-none">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    setErrors({ submit: 'Google login failed. Please try again.' });
                  }}
                  useOneTap
                  text="continue_with"
                />
              </div>
            </div>
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