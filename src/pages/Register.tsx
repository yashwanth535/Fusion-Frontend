import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, UserPlus, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { registerSchema, type RegisterFormData } from '../lib/validation';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

const Register = () => {
  const navigate = useNavigate();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const {signUp, isLoading, googleSignIn} = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateField = (name: keyof RegisterFormData, value: string) => {
    try {
      if (name === 'confirmPassword') {
        registerSchema.refine(
          (data) => data.password === value,
          { message: "Passwords don't match", path: ["confirmPassword"] }
        ).parse({ ...formData, confirmPassword: value });
      } else {
        registerSchema.shape[name].parse(value);
      }
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
    validateField(name as keyof RegisterFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage(null);
    
    if (!acceptedTerms) {
      setErrors({ terms: 'You must accept the Terms of Service and Privacy Policy' });
      return;
    }
    
    const { name, email, password } = formData;
    try {
      await signUp(name, email, password);
      setSuccessMessage("Account created successfully! You can now sign in.");
      setTimeout(() => {
        navigate('/sign-in', { replace: true });
      }, 2000);
    } catch (err: any) {
      setErrors({ submit: err.message });
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setSuccessMessage(null);
        await googleSignIn(tokenResponse.access_token);
        setSuccessMessage("Google sign-up successful!");
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1500);
      } catch (err: any) {
        setErrors({ submit: err.message });
      }
    },
    onError: (error) => {
      setErrors({ submit: 'Google login failed. Please try again.' });
      console.error('Google login error:', error);
    }
  });

  return (
    <div className="min-h-screen bg-white-100 flex-center py-12 px-4">
      <div className="max-w-md w-full mx-auto">
        <div className="startup-form hover:shadow-xl">
          <div className="text-center mb-8">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex-center mx-auto mb-4 shadow-md">
              <ChefHat className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-30-bold">Create Account</h1>
            <p className="text-16-medium text-black-100 mt-2">
              Join Flavour Fusion and start creating amazing recipes
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
              <label htmlFor="name" className="startup-form_label">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`startup-form_input pl-12 ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="flex items-center text-red-600 text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Invalid name
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="startup-form_label">
                Email Address
              </label>
              <div className="relative">
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
            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <label htmlFor="password" className="startup-form_label">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
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
              <div>
                <label htmlFor="confirmPassword" className="startup-form_label">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className={`startup-form_input pl-12 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                  />
                </div>
                {errors.confirmPassword && (
                  <p id="confirm-password-error" className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Invalid confirm password format
                  </p>
                )}
              </div>
            </div>
            {formData.password && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Password strength:</p>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      formData.password.length < 6 
                        ? 'w-1/4 bg-red-500' 
                        : formData.password.length < 8 
                          ? 'w-2/4 bg-yellow-500' 
                          : formData.password.length < 10 
                            ? 'w-3/4 bg-blue-500' 
                            : 'w-full bg-green-500'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Weak</span>
                  <span>Strong</span>
                </div>
              </div>
            )}
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={() => setAcceptedTerms(!acceptedTerms)}
                  className="h-4 w-4 border-2 border-black rounded focus:ring-primary"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </label>
                {errors.terms && (
                  <p className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.terms}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="startup-form_btn mt-6"
            >
              {isLoading ? (
                <span className="flex-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <span className="flex-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Create Account
                </span>
              )}
            </button>
          </form>
          {/* <div className="form-divider my-8">
            <span className="form-divider-text">OR</span>
          </div>
          <button 
            type="button"
            onClick={() => handleGoogleLogin()}
            className="w-full border-[3px] border-black rounded-xl py-3 flex-center gap-2 hover:bg-gray-50 transition-colors duration-300 shadow-md"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="h-5 w-5" />
            <span className="font-medium">Continue with Google</span>
          </button> */}
          <div className="mt-8 text-center">
            <p className="text-16-medium text-black-100">
              Already have an account?{' '}
              <Link to="/sign-in" className="text-primary hover:underline font-semibold transition-colors duration-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;