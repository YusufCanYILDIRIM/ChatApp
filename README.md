## Proje Açıklaması
ChatApp, modern ve kullanıcı dostu bir mesajlaşma uygulamasıdır. React ve Node.js kullanılarak geliştirilmiş tam stack bir web uygulamasıdır. Güvenli kimlik doğrulama, gerçek zamanlı mesajlaşma ve sezgisel kullanıcı arayüzü sunar.

## Özellikler
- 🔐 **Güvenli Kimlik Doğrulama**: JWT tabanlı kimlik doğrulama sistemi
- 👤 **Kullanıcı Yönetimi**: Kayıt olma, giriş yapma ve çıkış yapma işlevleri
- 💬 **Sohbet Arayüzü**: Sezgisel ve modern mesajlaşma deneyimi
- 📋 **Sohbet Listesi**: Tüm konuşmaları görüntüleme ve yönetme
- 🔒 **Güvenlik**: Bcrypt ile şifre hashleme ve güvenli depolama

## Teknolojiler
### Frontend
- **React**: Kullanıcı arayüzü bileşenleri için
- **CSS**: Modern ve duyarlı tasarım için özel stiller
- **LocalStorage**: Kullanıcı oturumu ve token saklama
- **Fetch API**: Backend ile iletişim için

### Backend
- **Node.js**: Sunucu tarafı runtime
- **Express**: Web API framework
- **JWT (JSON Web Tokens)**: Kimlik doğrulama için
- **Bcrypt**: Şifre hashleme için
- **CORS**: Cross-Origin isteklere izin vermek için

## Proje Yapısı
```
ChatApp/
  ├── chatapp/                 # Frontend (React)
  │   ├── public/
  │   │   └── index.html       # HTML ana şablon ve Font Awesome
  │   ├── src/
  │   │   ├── components/      # React bileşenleri
  │   │   │   ├── Login.js     # Giriş/kayıt formu
  │   │   │   ├── Login.css    # Giriş stili
  │   │   │   ├── ChatList.js  # Sohbet listesi
  │   │   │   ├── ChatList.css # Sohbet listesi stili
  │   │   │   ├── ChatWindow.js # Mesajlaşma penceresi
  │   │   │   └── ChatWindow.css # Mesajlaşma stili
  │   │   ├── App.js          # Ana uygulama bileşeni
  │   │   ├── App.css         # Ana uygulama stili
  │   │   └── index.js        # React giriş noktası
  │   └── package.json        # Frontend bağımlılıkları
  │
  └── backend/                # Backend (Node.js)
      ├── data/               # Mock veritabanı dosyaları
      │   ├── users.js        # Kullanıcı verileri
      │   └── chats.js        # Sohbet verileri
      ├── middleware/         # Express middleware
      │   └── auth.js         # JWT doğrulama middleware
      ├── routes/             # API rotaları
      │   ├── auth.js         # Kimlik doğrulama rotaları
      │   ├── users.js        # Kullanıcı rotaları
      │   └── chats.js        # Sohbet rotaları
      ├── .env                # Çevre değişkenleri
      ├── server.js           # Ana sunucu dosyası
      └── package.json        # Backend bağımlılıkları
```

## Kurulum ve Başlatma

### Gereksinimler
- Node.js (v14+ önerilir)
- npm veya yarn

### Backend Kurulumu
```bash
# Backend dizinine git
cd backend

# Bağımlılıkları yükle
npm install

# Sunucuyu başlat
node server.js
```

### Frontend Kurulumu
```bash
# Frontend dizinine git
cd chatapp

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm start
```

## Kullanım
1. Uygulamaya http://localhost:3000 adresinden erişebilirsiniz
2. Test kullanıcıları:
   - Email: `demo@example.com` / Şifre: `demo123`
   - Email: `test@example.com` / Şifre: `password123`
3. Ya da "Hesap Oluştur" seçeneği ile yeni bir hesap oluşturun

## Uygulama Özellikleri

### Giriş/Kayıt Ekranı
- Modern ve responsive tasarım
- Email ve şifre ile giriş
- Yeni hesap oluşturma
- Şifre gösterme/gizleme seçeneği
- Sosyal medya ile giriş butonları (demo)
- Hata mesajı gösterimi

### Sohbet Listesi
- Aktif ve geçmiş sohbetleri listeleme
- Sohbet arama özelliği
- Her sohbetin son mesajını gösterme
- Okunmamış mesaj sayacı
- Kullanıcı avatarları

### Sohbet Penceresi
- Mesaj gönderme ve alma
- Mesajları zaman damgalı gösterme
- Gönderilen ve alınan mesajları farklı stillerle ayırma
- Emoji ekleme seçeneği (demo)
- Dosya gönderme seçeneği (demo)
- Otomatik kaydırma ve yeni mesaj bildirimi

## Güvenlik Özellikleri
- JWT ile kimlik doğrulama
- Şifrelerin bcrypt ile hashlenip saklanması
- Token süresi sınırlaması (24 saat)
- CORS koruması
- Hata ayıklama logları

## İleriki Geliştirmeler
- WebSocket ile gerçek zamanlı mesajlaşma
- Dosya paylaşımı ve medya desteği
- Çevrimiçi durum gösterimi
- Grup sohbetleri
- Sesli ve görüntülü arama
- Mesaj arama
- Mobil uygulama geliştirme

## Lisans
MIT License - Özgürce kullanabilir, değiştirebilir ve dağıtabilirsiniz.

## Katkıda Bulunanlar
- GitHub Copilot - Geliştirme Asistanı

---

Bu proje, modern web teknolojilerini öğrenmek ve uygulamak amacıyla geliştirilmiştir. Her türlü geri bildirim ve katkıya açıktır.