# ⚽ Golazo — Yetkili Alım Botu

> DM tabanlı başvuru sistemi, görsel Components V2 panelleri, ilerleme çubuklu soru akışı ve otomatik rol yönetimi — tek komutla kurulur, saniyeler içinde çalışır.

---

## ✨ Özellikler

### 📋 Otomatik Başvuru Paneli
- **Tek komut kurulum:** `/yetkili-alim-ayarla` → başvuru kanalı, log kanalı ve verilecek rolü seç, panel anında gönderilsin.
- **Şık görsel panel:** Duyuru, başvuru aşamaları, gereklilikler ve bilgilendirme bölümleri; thumbnail'lar ve ayırıcılarla özenli tasarım.
- **Tek tıkla başvuru:** Butona bas, süreç DM üzerinden otomatik başlasın.

### 💬 DM Tabanlı Mülakat Sistemi
- **Özelleştirilebilir sorular:** `modules/sorular.js` dosyasından soru ekle/çıkar; her soru kendi başlık, açıklama, placeholder, renk ve ikonuyla.
- **İlerleme çubuğu:** `████████░░ 4/10` formatında görsel ilerleme + soru başına 60 saniye süre sayacı.
- **Tam kontrol:** Her adımda "Başvuruyu İptal Et" butonu, çift başvuru engeli, DM kapalıysa net uyarı.

### 🛡️ Yönetim & Log
- **Detaylı başvuru logu:** Avatar, kullanıcı ID'si, soru-cevap formu ve tek tıkla **Kabul ✅ / Red ❌** butonları.
- **Otomatik rol verme:** Kabul edilince rol otomatik takılır; aday tebrik/ret mesajı DM ile gider, log mesajı işleme göre güncellenir.
- **Güvenlik:** Değerlendirme butonları yalnızca **Administrator** kullanıcısı, kurulum komutu yalnızca bot sahibi.
- **Kalıcı ayarlar:** Kanal/rol ID'leri `veri.json` dosyasında saklanır, bot yeniden başlasa da kaybolmaz.

### 🎨 Kullanıcı Deneyimi
- Kabul, red, iptal, tamamlanma ve zaman aşımı ekranları görsel container mesajlarla.
- Hoşgeldin ekranında önemli bilgiler ve toplam soru sayısı.
- V2 mesaj gönderimi başarısız olursa otomatik düz metin yedeği.

---

## 🚀 Kurulum

**1. Ayarları düzenleyin** — `ayarlar.js`:

```js
module.exports = {
    token: 'BOT_TOKENINIZI_BURAYA_YAPISTIRIN', // Discord Developer Portal > Bot > Reset Token
    sahipID: 'BOT_SAHIP_ID_BURAYA',            // Kurulum komutunu kullanacak kişi
    sunucuID: 'SUNUCU_ID_BURAYA',              // Komutların anında yükleneceği sunucu (opsiyonel)
};
```

**2. Soruları ayarlayın** — `modules/sorular.js`:

```js
module.exports = [
  {
    id: 1,
    baslik: 'Kişisel Bilgiler',
    soru: 'İsminiz, yaşınız?',
    aciklama: 'Lütfen kendi hakkınızda kısa bir bilgi verin.',
    placeholder: 'Örnek: Ali, 18',
    renk: 0x5865f2,
    icon: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png',
  },
  // ...istediğiniz kadar soru ekleyin
];
```

**3. Bağımlılıkları yükleyin:**

```bash
npm i
```

**4. Botu başlatın:**

```bash
node .
```

---

## 🕹️ Kullanım

1. Discord Developer Portal'dan botu **sunucunuza davet edin** (yetkiler: `bot`, `applications.commands`).
2. `/yetkili-alim-ayarla` komutunu çalıştırın:

| Seçenek | Açıklama |
| --- | --- |
| `basvuru-kanali` | Başvuru panelinin gönderileceği kanal |
| `log-kanali` | Başvuruların loglanacağı kanal |
| `rol` | Başvuru kabul edildiğinde verilecek rol |

3. Panele tıklayan herkes DM üzerinden soruları yanıtlar, başvurusu log kanalına düşer.
4. Log mesajındaki **Kabul / Red** butonlarıyla değerlendirin.

---

## 📁 Proje Yapısı

```
├── index.js                  # Ana bot dosyası (event handler'lar)
├── ayarlar.js                # Token, sahip ve sunucu ID'si
├── commands/
│   └── yetkili-alim-başlat.js  # /yetkili-alim-ayarla panel komutu
├── modules/
│   └── sorular.js            # Başvuru soruları
├── package.json
└── veri.json                 # (otomatik oluşur) kanal/rol kayıtları
```

---

## ⚠️ Notlar

- `ayarlar.js` depoda **şablon (placeholder)** olarak yer alır; gerçek token'ınızı dosyaya yapıştırdıktan sonra commit/push yapmayın.
- `veri.json` (kanal/rol kayıtları) ve `node_modules/` `.gitignore` ile paylaşım dışında tutulur.
- Bot **Message Content** ve **Direct Messages** intent'lerine sahip olmalıdır (Developer Portal > Bot > Privileged Gateway Intents).
- Global komut kaydı Discord tarafından ~1 saat içinde yayılır; `sunucuID` girildiğinde o sunucuda anında görünür.

---

## 📄 Lisans

[MIT](./LICENSE.md)
