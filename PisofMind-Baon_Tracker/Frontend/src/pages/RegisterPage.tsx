import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('18');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (parseInt(age) < 12 || parseInt(age) > 35) {
      setError('Age must be between 12 and 35');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, gender, parseInt(age));
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>PisofMind</h1>
          <p className="subtitle">Student Expense Tracker</p>

          <form onSubmit={handleSubmit}>
            <h2>Create Account</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="12"
                    max="35"
                    required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Creating Account...' : 'Register'}
            </button>
          </form>

          <p className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
  );
};

export default RegisterPage;