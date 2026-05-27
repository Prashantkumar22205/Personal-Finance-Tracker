import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';

export default function Registration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  function validate(f) {
    const e = {};
    if (!f.name.trim()) e.name = 'Name is required';
    if (!f.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Invalid email';
    if (!f.password) e.password = 'Password is required';
    else if (f.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (f.password !== f.confirm) e.confirm = "Passwords don't match";
    return e;
  }

  function passwordStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);
    try {
      // Store user data in localStorage (demo mode)
      const users = JSON.parse(localStorage.getItem('pf_users') || '[]');
      
      if (users.some(u => u.email === form.email)) {
        throw new Error('Email already registered');
      }

      users.push({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem('pf_users', JSON.stringify(users));
      
      alert('Registration successful! Please log in.');
      setForm({ name: '', email: '', password: '', confirm: '' });
      
      // Redirect to login
      navigate('/');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        <div className="flex items-center justify-center mb-6 gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-semibold">Create Account</h2>
        </div>
        <p className="text-sm text-gray-500 text-center mb-6">Join us — fast and secure registration.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                errors.name ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-500'
              }`}
              placeholder="Jane Doe"
              required
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-500'
              }`}
              placeholder="you@example.com"
              required
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                errors.password ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-500'
              }`}
              placeholder="At least 8 characters"
              required
            />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}

            <div className="mt-2">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${(passwordStrength(form.password) / 4) * 100}%` }}
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Tip: use a mix of letters, numbers and symbols.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
            <input
              type="password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                errors.confirm ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:ring-blue-500'
              }`}
              placeholder="Re-enter password"
              required
            />
            {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
          </div>

          {serverError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 px-4 rounded-lg text-white font-medium transition-colors ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <a href="/" className="text-blue-600 font-medium hover:underline">
              Log in here
            </a>
          </p>
        </div>

        <div className="text-xs text-gray-400 text-center mt-4">
          By creating an account you agree to our terms and privacy policy.
        </div>
      </div>
    </div>
  );
}