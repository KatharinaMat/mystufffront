# MyStuffLabelled 🏷️📲

MyStuffLabelled is a personal inventory application that lets you **create QR codes for your items** (such as home appliances or electronics) and link them to stored item information.

By scanning a QR code, you are redirected to the item’s detail page, where you can quickly check:
- model information  
- date of purchase  
- store/vendor  
- uploaded receipt image  

This helps avoid digging through paperwork and guessing *when you bought something* or *whether a warranty might still be valid*.
The goal is to make item ownership information easily accessible with a simple scan.
---

## Repositories
This project is split into two separate repositories:

- **Frontend (Vue)**  
  https://github.com/KatharinaMat/mystufffront

- **Backend (Java / Gradle)**  
  https://github.com/KatharinaMat/mystuffback

---

## Features
- Create and manage items (e.g. washing machine, vacuum cleaner)
- Store purchase-related information
- Upload and view receipt images
- Generate QR codes for each item, QRcode is printable
- Scan QR codes to access item detail pages
- Simple, user-friendly interface

> Warranty validity is checked manually by the user based on the stored purchase date and receipt.

---

## Tech Stack

### Backend
- Java  
- Gradle  
- PostgreSQL  
- REST API

### Frontend
- Vue.js  
- JavaScript  
- HTML  
- CSS  

---

## How it works (high level)
1. User creates an item in the application  
2. Item data is stored in the PostgreSQL database  
3. Generate printable QR codes for each item  
4. The QR code links to a frontend route containing the item ID  
5. Scanning the QR code opens the item’s detail page with all stored information

---

## Local development

### Backend setup (Java / Gradle)
```bash
git clone https://github.com/KatharinaMat/mystuffback
cd mystuffback
./gradlew bootRun
```

Backend runs by default on:
```
http://localhost:8080
```

### Database
- PostgreSQL is required
- Create a database for the project
- Configure connection details via environment variables or `application.properties`

Example:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mystuff
spring.datasource.username=your_username
spring.datasource.password=your_password
```

---

### Frontend setup (Vue)
```bash
git clone https://github.com/KatharinaMat/mystufffront
cd mystufffront
npm install
npm run dev
```

Frontend runs by default on:
```
http://localhost:5173
```

Configure the backend API URL (example):
```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## Project status
🚧 The project is currently **not live** and under active development.

---

## Example use cases
- Label home appliances with QR codes
- Quickly access purchase dates and receipts
- Keep digital records without physical paperwork
- Reduce time spent searching for warranty-related information

---

## Future improvements
- Warranty expiration indicator
- Authentication / multi-user support
- Item categories and search
- Receipt and manual management

---

## License
This project is currently for learning and portfolio purposes.  
Add a license (e.g. MIT) if you plan to make it open-source.
