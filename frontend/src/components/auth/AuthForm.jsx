import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../utils/authStore';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
};

const MotionDiv = motion.div;

export default function AuthForm({ type = 'signin' }) {
  const navigate = useNavigate();
  const isSignup = type === 'signup';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [formError, setFormError] = useState('');
  const register = useAuthStore((state) => state.register);
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const authError = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const ui = useMemo(
    () => ({
      heading: isSignup ? 'Create your account' : 'Welcome back',
      subheading: isSignup
        ? 'Sign up to start planning your next trip'
        : 'Sign in to continue planning your trips',
      submitLabel: isSignup ? 'Sign Up' : 'Sign In',
      switchText: isSignup ? 'Already have an account?' : "Don't have an account?",
      switchLinkLabel: isSignup ? 'Sign in' : 'Get started free',
      switchLinkTo: isSignup ? '/login' : '/signup',
    }),
    [isSignup]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    clearError();

    if (isSignup && password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    try {
      if (isSignup) {
        await register({ name, email, password });
      } else {
        await login({ email, password });
      }

      navigate('/dashboard');
    } catch {
      // Errors are displayed from store state.
    }
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-125 h-125 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full bg-primary/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <MotionDiv
        className="relative z-10 w-full max-w-md"
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex items-center justify-center gap-2 mb-10"
          variants={fadeUp}
          custom={0}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow duration-200">
              <span className="text-primary-foreground font-bold text-base">F</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">FlexiTrip</span>
          </Link>
        </motion.div>

        <motion.div
          className="bg-white/4 border border-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
          variants={fadeUp}
          custom={0.1}
        >
          <motion.div className="mb-8 text-center" variants={fadeUp} custom={0.2}>
            <h1 className="text-2xl font-bold text-white mb-1.5">{ui.heading}</h1>
            <p className="text-white/50 text-sm">{ui.subheading}</p>
          </motion.div>

          {(formError || authError) && (
            <div className="mb-4 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {formError || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <motion.div variants={fadeUp} custom={0.25}>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Full name
                </label>
                <motion.input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your name"
                  required
                  animate={{
                    borderColor:
                      focusedField === 'name'
                        ? 'rgba(255, 107, 110, 0.7)'
                        : 'rgba(255,255,255,0.1)',
                    boxShadow:
                      focusedField === 'name'
                        ? '0 0 0 3px rgba(255, 107, 110, 0.15)'
                        : '0 0 0 0px rgba(255, 107, 110, 0)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-white/6 text-white placeholder-white/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
                />
              </motion.div>
            )}

            <motion.div variants={fadeUp} custom={0.3}>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Email address
              </label>
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="you@example.com"
                required
                animate={{
                  borderColor:
                    focusedField === 'email'
                      ? 'rgba(255, 107, 110, 0.7)'
                      : 'rgba(255,255,255,0.1)',
                  boxShadow:
                    focusedField === 'email'
                      ? '0 0 0 3px rgba(255, 107, 110, 0.15)'
                      : '0 0 0 0px rgba(255, 107, 110, 0)',
                }}
                transition={{ duration: 0.2 }}
                className="w-full bg-white/6 text-white placeholder-white/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={0.4}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-white/70">Password</label>
                {!isSignup && (
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary/80 hover:text-primary transition-colors duration-150"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                placeholder="admin123"
                required
                animate={{
                  borderColor:
                    focusedField === 'password'
                      ? 'rgba(255, 107, 110, 0.7)'
                      : 'rgba(255,255,255,0.1)',
                  boxShadow:
                    focusedField === 'password'
                      ? '0 0 0 3px rgba(255, 107, 110, 0.15)'
                      : '0 0 0 0px rgba(255, 107, 110, 0)',
                }}
                transition={{ duration: 0.2 }}
                className="w-full bg-white/6 text-white placeholder-white/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
              />
            </motion.div>

            {isSignup && (
              <motion.div variants={fadeUp} custom={0.45}>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Confirm password
                </label>
                <motion.input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="admin123"
                  required
                  animate={{
                    borderColor:
                      focusedField === 'confirmPassword'
                        ? 'rgba(255, 107, 110, 0.7)'
                        : 'rgba(255,255,255,0.1)',
                    boxShadow:
                      focusedField === 'confirmPassword'
                        ? '0 0 0 3px rgba(255, 107, 110, 0.15)'
                        : '0 0 0 0px rgba(255, 107, 110, 0)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-white/6 text-white placeholder-white/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
                />
              </motion.div>
            )}

            <motion.div variants={fadeUp} custom={0.5} className="pt-1">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(255,107,110,0.45)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl text-sm shadow-lg shadow-primary/25 transition-colors duration-200 hover:bg-primary/90 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Please wait...' : ui.submitLabel}
              </motion.button>
            </motion.div>
          </form>

          <motion.div
            className="flex items-center gap-3 my-6"
            variants={fadeUp}
            custom={0.6}
          >
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          <motion.p
            className="text-center text-sm text-white/40"
            variants={fadeUp}
            custom={0.65}
          >
            {ui.switchText}{' '}
            <Link
              to={ui.switchLinkTo}
              className="text-primary font-medium hover:text-primary/80 transition-colors duration-150"
            >
              {ui.switchLinkLabel}
            </Link>
          </motion.p>
        </motion.div>

        <motion.p
          className="text-center text-white/20 text-xs mt-6"
          variants={fadeUp}
          custom={0.75}
        >
          By continuing, you agree to our{' '}
          <span className="underline underline-offset-2 cursor-pointer hover:text-white/40 transition-colors">
            Terms
          </span>{' '}
          &{' '}
          <span className="underline underline-offset-2 cursor-pointer hover:text-white/40 transition-colors">
            Privacy Policy
          </span>
        </motion.p>
      </MotionDiv>
    </div>
  );
}
