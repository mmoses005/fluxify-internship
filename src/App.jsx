import React, { useState } from 'react';
import './app.css';

// Helper: Validate email format
const isValidEmail = (email) => {
  return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
};

// ----- TASK 1: Registration Form Component -----
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (successMsg) setSuccessMsg('');
  };

  const validateForm = () => {
    const newErrors = {};
    const { fullName, email, password, confirmPassword, role } = formData;

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) newErrors.email = 'Email address is required';
    else if (!isValidEmail(email)) newErrors.email = 'Enter a valid email (e.g., name@domain.com)';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMsg('');
      return;
    }
    // Success: clear form, show green message
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student'
    });
    setErrors({});
    setSuccessMsg('Account created successfully!');
    setSubmitted(false);
  };

  const renderError = (fieldName) => {
    if (errors[fieldName]) {
      return <p className={`error-message ${errors[fieldName] ? 'visible' : ''}`}>{errors[fieldName]}</p>;
    }
    return null;
  };

  return (
    <div className="registration-container">
      <div className="form-card">
        <h2 className="form-title">📝 Register</h2>
        {successMsg && <div className="success-alert">{successMsg}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`form-input ${errors.fullName ? 'input-error' : ''}`}
              placeholder="John Doe"
            />
            {renderError('fullName')}
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="you@example.com"
            />
            {renderError('email')}
          </div>

          <div className="form-group">
            <label className="form-label">Password * (min. 8 chars)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              placeholder="••••••••"
            />
            {renderError('password')}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="confirm password"
            />
            {renderError('confirmPassword')}
          </div>

          <div className="form-group">
            <label className="form-label">Role *</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-select"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
              <option value="guest">Guest</option>
            </select>
            {renderError('role')}
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>
        <p className="form-hint">All fields required • passwords must match & ≥8 chars</p>
      </div>
    </div>
  );
};

// ----- TASK 2: Dynamic Profile Builder (Live Preview) -----
const ProfileBuilder = () => {
  const [profile, setProfile] = useState({
    name: '',
    jobTitle: '',
    bio: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const previewName = profile.name.trim() || "Anonymous";
  const previewJob = profile.jobTitle.trim() || "No title specified";
  const previewBio = profile.bio.trim() || "✨ This user hasn't added a bio yet. Fill the form to see live changes.";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-grid">
          {/* Left side: Form */}
          <div className="profile-form-side">
            <h2 className="profile-title">✏️ Edit Your Profile</h2>
            <div className="profile-form-fields">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., Taylor Swift"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={profile.jobTitle}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., Frontend Developer"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Short Bio</label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="form-textarea"
                  placeholder="Tell something about yourself..."
                ></textarea>
                <p className="live-hint">Live preview updates with every keystroke →</p>
              </div>
            </div>
          </div>

          {/* Right side: Live Preview Card */}
          <div className="preview-side">
            <div className="preview-card-wrapper">
              <div className="preview-card">
                <div className="preview-header-bg"></div>
                <div className="preview-content">
                  <div className="preview-avatar">
                    <div className="avatar-inner">
                      {previewName.charAt(0).toUpperCase() || '?'}
                    </div>
                  </div>
                  <div className="preview-text">
                    <h3 className="preview-name">{previewName}</h3>
                    <p className="preview-job">{previewJob}</p>
                    <div className="preview-bio">
                      <p>{previewBio}</p>
                    </div>
                  </div>
                  <div className="preview-footer">
                    <span>⚡ live preview</span>
                  </div>
                </div>
              </div>
              <p className="preview-note">Updates as you type — no button needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----- Main App Component -----
const App = () => {
  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">📋 React Forms Workshop</h1>
        <p className="app-subtitle">Task 1: Registration with Validation • Task 2: Dynamic Live Preview Profile</p>
      </div>
      
      <div className="tasks-grid">
        <RegistrationForm />
        <ProfileBuilder />
      </div>
      
      <footer className="app-footer">
        ✅ Day 4 Tasks: Controlled forms • Validation • Live sync • Clear success + error messages
      </footer>
    </div>
  );
};

export default App;