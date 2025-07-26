import React, { useState } from 'react';
import { Eye, EyeOff, User, GraduationCap, UserCheck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginForm {
  email: string;
  password: string;
  userType: 'student' | 'staff';
}

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  prefix: string;
  userType: 'student' | 'staff';
  dept?: string;
  rollNo?: string;
  year?: string;
  section?: string;
  phone?: string;
  accommodation?: string;
  roomNo?: string;
  block?: string;
  employeeId?: string;
  designation?: string;
}

const defaultCreds: Record<'student' | 'staff', { email: string; password: string }> = {
  student: { email: 'student@sece.ac.in', password: 'student@123' },
  staff: { email: 'staff@sece.ac.in', password: 'staff@123' }
};

function LoginPage() {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState<LoginForm>({
    ...defaultCreds.student,
    userType: 'student'
  });

  const [signupForm, setSignupForm] = useState<SignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    prefix: '',
    userType: 'student'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const validateEmail = (email: string): boolean => /^[^\s@]+@sece\.ac\.in$/.test(email);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: any = {};
    if (!validateEmail(loginForm.email)) newErrors.email = 'Email must end with @sece.ac.in';
    if (loginForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const expectedCreds = defaultCreds[loginForm.userType];
      if (loginForm.email === expectedCreds.email && loginForm.password === expectedCreds.password) {
        localStorage.setItem('authToken', 'dummy-jwt-token');
        localStorage.setItem('userData', JSON.stringify({
          name: loginForm.userType === 'student' ? 'John Doe' : 'Dr. Jane Smith',
          rollNo: loginForm.userType === 'student' ? '20CS001' : undefined,
          department: 'Computer Science Engineering',
          year: loginForm.userType === 'student' ? '3rd Year' : undefined,
          section: loginForm.userType === 'student' ? 'A' : undefined,
          email: loginForm.email,
          accommodation: loginForm.userType === 'student' ? 'Hostel' : undefined,
          block: loginForm.userType === 'student' ? 'A Block' : undefined,
          roomNo: loginForm.userType === 'student' ? 'A-201' : undefined,
          phone: '+91 9876543210',
          employeeId: loginForm.userType === 'staff' ? 'EMP001' : undefined,
          designation: loginForm.userType === 'staff' ? 'Associate Professor' : undefined
        }));

        if (loginForm.userType === 'student') {
          navigate('/student/home', { replace: true });
        } else {
          // Redirect staff to staff home page
          navigate('/staff/home', { replace: true });
        }
      } else {
        alert('Invalid credentials. Please check your email and password.');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!validateEmail(signupForm.email)) newErrors.email = 'Email must end with @sece.ac.in';
    if (signupForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (signupForm.password !== signupForm.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(res => setTimeout(res, 1500));

      localStorage.setItem('authToken', 'dummy-jwt-token');
      localStorage.setItem('userData', JSON.stringify({
        name: `${signupForm.prefix} ${signupForm.firstName} ${signupForm.lastName}`,
        rollNo: signupForm.rollNo,
        department: signupForm.dept,
        year: signupForm.year,
        section: signupForm.section,
        email: signupForm.email,
        accommodation: signupForm.accommodation,
        block: signupForm.block,
        roomNo: signupForm.roomNo,
        phone: signupForm.phone,
        employeeId: signupForm.employeeId,
        designation: signupForm.designation
      }));

      if (signupForm.userType === 'student') {
        navigate('/student/home', { replace: true });
      } else {
        // Redirect staff to staff home page
        navigate('/staff/home', { replace: true });
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleUserType = (form: 'login' | 'signup') => {
    if (form === 'login') {
      setLoginForm(prev => {
        const newType = prev.userType === 'student' ? 'staff' : 'student';
        return {
          ...defaultCreds[newType],
          userType: newType
        };
      });
    } else {
      setSignupForm(prev => ({
        ...prev,
        userType: prev.userType === 'student' ? 'staff' : 'student'
      }));
    }
  };

  return (
    <div className="app-container">
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }
        
        .app-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #FFF5E0 0%, #FFEBEB 50%, #FFF5E0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 20px 0;
        }
        
        .background-boxes {
          position: fixed;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(90deg, rgba(255,105,105,0.1) 1px, transparent 1px), linear-gradient(180deg, rgba(255,105,105,0.1) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 1;
        }
        
        .form-container {
          position: relative;
          z-index: 10;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 36px;
          width: 90%;
          max-width: ${currentView === 'signup' ? '520px' : '420px'};
          box-shadow: 0 20px 30px rgba(0,0,0,0.1);
          animation: fadeIn 0.6s ease;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .header {
          text-align: center;
          margin-bottom: 24px;
        }
        
        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          background: none;
          border: none;
          color: #BB2525;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        
        .back-button:hover {
          background: rgba(255, 105, 105, 0.1);
        }
        
        .logo {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: linear-gradient(135deg, #FF6969, #BB2525);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          color: white;
        }
        
        .title {
          color: #BB2525;
          font-weight: 700;
          font-size: 24px;
          margin-bottom: 4px;
        }
        
        .subtitle {
          font-size: 14px;
          color: #666;
        }
        
        .demo-credentials {
          background: rgba(255, 105, 105, 0.1);
          border: 1px solid rgba(255, 105, 105, 0.2);
          border-radius: 8px;
          padding: 12px;
          margin: 16px 0;
          font-size: 12px;
          text-align: center;
        }
        
        .demo-title {
          font-weight: 600;
          color: #BB2525;
          margin-bottom: 4px;
        }
        
        .demo-creds {
          color: #666;
          font-family: monospace;
        }
        
        .toggle {
          display: flex;
          margin: 20px 0 24px 0;
          background: #FFF5E0;
          border-radius: 12px;
          padding: 4px;
        }
        
        .toggle-option {
          flex: 1;
          padding: 12px;
          text-align: center;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        
        .toggle-option.active {
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
          box-shadow: 0 4px 12px rgba(255, 105, 105, 0.3);
        }
        
        .toggle-option:not(.active) {
          color: #BB2525;
        }
        
        .toggle-option:not(.active):hover {
          background: rgba(255, 105, 105, 0.1);
        }
        
        .form-group {
          margin-bottom: 16px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }
        
        .input-container {
          position: relative;
        }
        
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #ddd;
          font-size: 16px;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.8);
          box-sizing: border-box;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #FF6969;
          box-shadow: 0 0 0 3px rgba(255, 105, 105, 0.1);
          background: white;
        }
        
        .form-input.error {
          border-color: #BB2525;
          background: #FFEBEB;
        }
        
        .password-input {
          padding-right: 50px;
        }
        
        .eye-toggle {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          cursor: pointer;
          color: #666;
          background: none;
          border: none;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .eye-toggle:hover {
          background: rgba(255, 105, 105, 0.1);
          color: #FF6969;
        }
        
        .error-msg {
          color: #BB2525;
          font-size: 14px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .submit-btn {
          background: linear-gradient(135deg, #FF6969, #BB2525);
          color: white;
          padding: 14px;
          width: 100%;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 16px;
          position: relative;
        }
        
        .submit-btn:hover:not(:disabled) {
          box-shadow: 0 8px 24px rgba(255,105,105,0.4);
          transform: translateY(-2px);
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .switch-form {
          text-align: center;
          margin-top: 20px;
          color: #666;
          font-size: 14px;
        }
        
        .switch-link {
          color: #BB2525;
          cursor: pointer;
          font-weight: 600;
          text-decoration: none;
        }
        
        .switch-link:hover {
          text-decoration: underline;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .footer {
          margin-top: 24px;
          font-size: 12px;
          text-align: center;
          color: #999;
          padding-top: 16px;
          border-top: 1px solid #FFEBEB;
        }
        
        .two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        
        @media (max-width: 480px) {
          .form-container {
            margin: 10px;
            padding: 24px;
          }
          
          .title {
            font-size: 20px;
          }
          
          .two-column {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="background-boxes"></div>

      <div className="form-container">
        {currentView === 'signup' && (
          <button className="back-button" onClick={() => setCurrentView('login')}>
            <ArrowLeft size={16} />
            Back to Login
          </button>
        )}

        <div className="header">
          <div className="logo">
            <GraduationCap size={28} />
          </div>
          <h1 className="title">CampusLink</h1>
          <p className="subtitle">Centralized Student Utility Hub</p>
        </div>

        {currentView === 'login' ? (
          <>
            <div className="demo-credentials">
              <div className="demo-title">Demo Credentials</div>
              <div className="demo-creds">
                Student: student@sece.ac.in / student@123<br />
                Staff: staff@sece.ac.in / staff@123
              </div>
            </div>

            <div className="toggle">
              <div
                className={`toggle-option ${loginForm.userType === 'student' ? 'active' : ''}`}
                onClick={() => toggleUserType('login')}
              >
                <User size={16} />
                Student
              </div>
              <div
                className={`toggle-option ${loginForm.userType === 'staff' ? 'active' : ''}`}
                onClick={() => toggleUserType('login')}
              >
                <UserCheck size={16} />
                Staff
              </div>
            </div>

            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  {loginForm.userType === 'student' ? 'Student Email' : 'Staff Email'}
                </label>
                <input
                  type="email"
                  id="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="your.email@sece.ac.in"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
                {errors.email && (
                  <div className="error-msg">
                    ⚠ {errors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`form-input password-input ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                  <button
                    type="button"
                    className="eye-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <div className="error-msg">
                    ⚠ {errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading && <span className="loading-spinner"></span>}
                {isLoading
                  ? `Signing in as ${loginForm.userType}...`
                  : `Sign in as ${loginForm.userType.charAt(0).toUpperCase() + loginForm.userType.slice(1)}`
                }
              </button>
            </form>

            <div className="switch-form">
              Don't have an account? <span className="switch-link" onClick={() => setCurrentView('signup')}>Sign up here</span>
            </div>
          </>
        ) : (
          <>
            <div className="toggle">
              <div
                className={`toggle-option ${signupForm.userType === 'student' ? 'active' : ''}`}
                onClick={() => toggleUserType('signup')}
              >
                <User size={16} />
                Student
              </div>
              <div
                className={`toggle-option ${signupForm.userType === 'staff' ? 'active' : ''}`}
                onClick={() => toggleUserType('signup')}
              >
                <UserCheck size={16} />
                Staff
              </div>
            </div>

            <form onSubmit={handleSignupSubmit}>
              <div className="form-group">
                <select
                  name="prefix"
                  className="form-input"
                  value={signupForm.prefix}
                  onChange={handleSignupChange}
                  required
                >
                  <option value="">Select Prefix</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>

              <div className="two-column">
                <input
                  className="form-input"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={signupForm.firstName}
                  onChange={handleSignupChange}
                  required
                />
                <input
                  className="form-input"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={signupForm.lastName}
                  onChange={handleSignupChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  type="email"
                  name="email"
                  placeholder="Your Email (@sece.ac.in)"
                  value={signupForm.email}
                  onChange={handleSignupChange}
                  required
                />
                {errors.email && <div className="error-msg">⚠ {errors.email}</div>}
              </div>

              {signupForm.userType === 'student' && (
                <>
                  <div className="form-group">
                    <input
                      className="form-input"
                      name="dept"
                      placeholder="Department"
                      value={signupForm.dept || ''}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="two-column">
                    <input
                      className="form-input"
                      name="rollNo"
                      placeholder="Roll Number"
                      value={signupForm.rollNo || ''}
                      onChange={handleSignupChange}
                      required
                    />
                    <input
                      className="form-input"
                      name="year"
                      placeholder="Year"
                      value={signupForm.year || ''}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="two-column">
                    <input
                      className="form-input"
                      name="section"
                      placeholder="Section"
                      value={signupForm.section || ''}
                      onChange={handleSignupChange}
                      required
                    />
                    <input
                      className="form-input"
                      name="phone"
                      placeholder="Phone Number"
                      value={signupForm.phone || ''}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <select
                      name="accommodation"
                      className="form-input"
                      value={signupForm.accommodation || ''}
                      onChange={handleSignupChange}
                      required
                    >
                      <option value="">Hosteller / Day Scholar</option>
                      <option value="Hostel">Hosteller</option>
                      <option value="Day Scholar">Day Scholar</option>
                    </select>
                  </div>

                  {signupForm.accommodation === 'Hostel' && (
                    <div className="two-column">
                      <input
                        className="form-input"
                        name="block"
                        placeholder="Block"
                        value={signupForm.block || ''}
                        onChange={handleSignupChange}
                        required
                      />
                      <input
                        className="form-input"
                        name="roomNo"
                        placeholder="Room No"
                        value={signupForm.roomNo || ''}
                        onChange={handleSignupChange}
                        required
                      />
                    </div>
                  )}
                </>
              )}

              {signupForm.userType === 'staff' && (
                <>
                  <div className="two-column">
                    <input
                      className="form-input"
                      name="employeeId"
                      placeholder="Employee ID"
                      value={signupForm.employeeId || ''}
                      onChange={handleSignupChange}
                      required
                    />
                    <input
                      className="form-input"
                      name="dept"
                      placeholder="Department"
                      value={signupForm.dept || ''}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>

                  <div className="two-column">
                    <input
                      className="form-input"
                      name="phone"
                      placeholder="Phone Number"
                      value={signupForm.phone || ''}
                      onChange={handleSignupChange}
                      required
                    />
                    <input
                      className="form-input"
                      name="designation"
                      placeholder="Designation (e.g. HOD, Staff, Technician)"
                      value={signupForm.designation || ''}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <div className="input-container">
                  <input
                    className={`form-input password-input ${errors.password ? 'error' : ''}`}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                    required
                  />
                  <button
                    type="button"
                    className="eye-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <div className="error-msg">⚠ {errors.password}</div>}
              </div>

              <div className="form-group">
                <input
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={signupForm.confirmPassword}
                  onChange={handleSignupChange}
                  required
                />
                {errors.confirmPassword && <div className="error-msg">⚠ {errors.confirmPassword}</div>}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading && <span className="loading-spinner"></span>}
                {isLoading ? 'Signing Up...' : `Sign Up as ${signupForm.userType.charAt(0).toUpperCase() + signupForm.userType.slice(1)}`}
              </button>
            </form>

            <div className="switch-form">
              Already have an account? <span className="switch-link" onClick={() => setCurrentView('login')}>Sign in here</span>
            </div>
          </>
        )}

        <div className="footer">
          <p>© Sri Eshwar College of Engineering • CampusLink v1.0</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
