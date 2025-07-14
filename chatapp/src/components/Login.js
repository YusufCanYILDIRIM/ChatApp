import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password, isRegistering });
    onLogin();
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-shape"></div>
        <div className="login-shape"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="app-logo">
            <i className="fa fa-comments"></i>
          </div>
          <h1>ChatApp</h1>
          <p className="tagline">Güvenli ve Hızlı İletişim</p>
        </div>
        
        <h2 className="form-title">{isRegistering ? 'Hesap Oluştur' : 'Hoş Geldiniz'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-icon">
              <i className="fa fa-envelope"></i>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email adresiniz"
                required 
              />
            </div>
          </div>
          
          <div className="input-group">
            <div className="input-icon">
              <i className="fa fa-lock"></i>
              <input 
                type={showPassword ? "text" : "password"}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Şifreniz"
                required 
              />
              <i 
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} show-password`} 
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>
          
          {!isRegistering && (
            <div className="extra-options">
              <label className="remember-me">
                <input type="checkbox" /> Beni hatırla
              </label>
              <a href="#" className="forgot-password">Şifremi unuttum</a>
            </div>
          )}
          
          <button type="submit" className="submit-button">
            {isRegistering ? 'Hesap Oluştur' : 'Giriş Yap'}
          </button>
          
          <div className="social-login">
            <p>veya</p>
            <div className="social-buttons">
              <button type="button" className="social-button google">
                <i className="fa fa-google"></i>
              </button>
              <button type="button" className="social-button facebook">
                <i className="fa fa-facebook"></i>
              </button>
              <button type="button" className="social-button twitter">
                <i className="fa fa-twitter"></i>
              </button>
            </div>
          </div>
        </form>
        
        <p className="toggle-form" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering 
            ? 'Zaten hesabınız var mı? Giriş yapın' 
            : 'Hesabınız yok mu? Hemen oluşturun'}
        </p>
      </div>
    </div>
  );
}

export default Login;