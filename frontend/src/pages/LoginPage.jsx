import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call your API here, then:
    // const { token } = await yourApiCall({ email, password });
    // login(token);
    console.log('Submit:', { email, password });
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center relative overflow-hidden px-4">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-10"
          variants={fadeUp}
          custom={0}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow duration-200">
              <span className="text-primary-foreground font-bold text-base">F</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              FlexiTrip
            </span>
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-white/[0.04] border border-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
          variants={fadeUp}
          custom={0.1}
        >
          {/* Heading */}
          <motion.div className="mb-8 text-center" variants={fadeUp} custom={0.2}>
            <h1 className="text-2xl font-bold text-white mb-1.5">Welcome back</h1>
            <p className="text-white/50 text-sm">Sign in to continue planning your trips</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <motion.div variants={fadeUp} custom={0.3}>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Email address
              </label>
              <div className="relative">
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
                  className="w-full bg-white/[0.06] text-white placeholder-white/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeUp} custom={0.4}>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-white/70">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary/80 hover:text-primary transition-colors duration-150"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <motion.input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="••••••••"
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
                  className="w-full bg-white/[0.06] text-white placeholder-white/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none transition-colors duration-200"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={fadeUp} custom={0.5} className="pt-1">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(255,107,110,0.45)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl text-sm shadow-lg shadow-primary/25 transition-colors duration-200 hover:bg-primary/90 cursor-pointer"
              >
                Sign In
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div
            className="flex items-center gap-3 my-6"
            variants={fadeUp}
            custom={0.6}
          >
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </motion.div>

          {/* Sign up link */}
          <motion.p
            className="text-center text-sm text-white/40"
            variants={fadeUp}
            custom={0.65}
          >
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary font-medium hover:text-primary/80 transition-colors duration-150"
            >
              Get started free
            </Link>
          </motion.p>
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="text-center text-white/20 text-xs mt-6"
          variants={fadeUp}
          custom={0.75}
        >
          By signing in, you agree to our{' '}
          <span className="underline underline-offset-2 cursor-pointer hover:text-white/40 transition-colors">
            Terms
          </span>{' '}
          &{' '}
          <span className="underline underline-offset-2 cursor-pointer hover:text-white/40 transition-colors">
            Privacy Policy
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}
