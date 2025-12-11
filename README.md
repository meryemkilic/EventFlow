# EventFlow Platform

EventFlow web platformu - Phase 0 (Skeleton Setup)

## Proje Yapısı

```
EventFlow/
  backend/              # Spring Boot Maven projesi
  frontend/
    eventflow-frontend/ # React + Vite projesi
```

## Backend (Spring Boot)

### Gereksinimler
- Java 21
- Maven 3.8+

### Çalıştırma

```bash
cd backend
mvn spring-boot:run
```

Backend `http://localhost:8080` adresinde çalışacaktır.

### Health Endpoint

```bash
curl http://localhost:8080/api/health
```

Beklenen yanıt: `"EventFlow backend is running"`

## Frontend (React + Vite)

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum ve Çalıştırma

```bash
cd frontend/eventflow-frontend
npm install
npm run dev
```

Frontend `http://localhost:5173` adresinde çalışacaktır.

## Phase 0 - Tamamlanan İşler

- ✅ Spring Boot backend iskeleti oluşturuldu
- ✅ React + Vite frontend iskeleti oluşturuldu
- ✅ Klasör yapısı hazırlandı
- ✅ Health endpoint eklendi
- ✅ Minimum dosya iskeletleri hazırlandı





