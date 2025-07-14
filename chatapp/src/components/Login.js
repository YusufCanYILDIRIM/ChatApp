import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // handleSubmit fonksiyonunu güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegistering 
        ? { name: email.split('@')[0], email, password }
        : { email, password };
      
      console.log('Giriş denemesi:', email);
      console.log('Endpoint:', `http://localhost:5000${endpoint}`);
        
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      console.log('Yanıt durumu:', response.status);
      const data = await response.json();
      console.log('Yanıt verisi:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Bir hata oluştu');
      }
      
      // Token'ı localStorage'a kaydet
      localStorage.setItem('chatAppToken', data.token);
      localStorage.setItem('chatAppUser', JSON.stringify(data.user));
      
      console.log('Token ve kullanıcı bilgisi kaydedildi');
      console.log('Giriş yapılıyor:', data.user);
      
      // Ana uygulamaya yönlendir
      onLogin(data.user);
      
    } catch (error) {
      console.error('Giriş hatası detayları:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
        
        {error && <div className="error-message">{error}</div>}
        
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
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              isRegistering ? 'Hesap Oluştur' : 'Giriş Yap'
            )}
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