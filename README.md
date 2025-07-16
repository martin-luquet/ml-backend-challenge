# Backend Nodejs/AWS Challenge - Node.js + TypeScript + Express on AWS Lambda

---

##  Tecnologías utilizadas

- **Node.js + TypeScript**
- **Express.js**
- **AWS Lambda (via Serverless Framework v4)**
- **MySQL (RDS MySQL Community v8.0.41)**
- **AWS ElastiCache - Memcached**
- **JWT** (para autenticación)
- **Jest** (para pruebas unitarias)
- **dotenv** (manejo de variables de entorno)

---

## 📁 Estructura del proyecto

```
my-rest-api/
│
├── src/
│   ├── config/              # Configuración de bases de datos y entorno
│   ├── controllers/         # Lógica de los controladores (Endpoints)
│   ├── routes/              # Definición de rutas Express
│   ├── services/            # Lógica de negocio
│   ├── middlewares/         # Middlewares personalizados (ej. autenticación)
│   ├── utils/               # Funciones utilitarias
│   ├── app.ts               # Configuración de la app Express
│   └── handler.ts           # Adaptador para AWS Lambda
│
├── tests/                   # Pruebas con Jest
├── serverless.yml           # Configuración de despliegue Serverless
├── .env                     # Variables de entorno
├── tsconfig.json            # Configuración de TypeScript
├── jest.config.ts           # Configuración de Jest
├── package.json
└── README.md
```

---

## 🧪 Scripts útiles

| Script           | Descripción                                 |
|------------------|---------------------------------------------|
| `npm run dev`    | Inicia el servidor en modo desarrollo       |
| `npm run build`  | Compila el código TypeScript a JavaScript  |
| `npm run test`   | Ejecuta las pruebas unitarias con Jest      |
| `npm run test:unit`   | Ejecuta las pruebas unitarias con Jest      |
| `npm run test:integration`   | Ejecuta las pruebas unitarias con Jest      |
| `npm run deploy` | Despliega la API en AWS Lambda              |

---

## 🧰 Requisitos

- Node.js >= 20.x
- Cuenta de AWS configurada
- Serverless Framework instalado globalmente  
  ```bash
  npm install -g serverless
  ```

---

## 🔐 Variables de entorno (`.env`)

Ejemplo de `.env`:

```env


MYSQL_HOST=XXXXXXXXXXXX
MYSQL_PORT=3306
MYSQL_USER=admin
MYSQL_PASSWORD=XXXXXXXXXXXXXXX
MYSQL_DATABASE=db_backend_challenge

JWT_SECRET=backendchallengebackendchallenge
JWT_EXPIRES_IN=1h

MEMCACHED_URL=memcached-api-cache.xxxx.cfg.use1.cache.amazonaws.com:11211

```

---

## 🧪 Pruebas

Las pruebas están desarrolladas con **Jest**.

```bash
npm run test
npm run test:unit
npm run test:integration
```

---

## ☁️ Despliegue

Asegúrate de tener tu CLI de AWS configurado con `aws configure`, luego:

```bash
npm run deploy
serverless deploy --stage dev
```

---

## 📌 Notas

- El proyecto usa `serverless-http` para adaptar Express a Lambda.
- Está preparado para funcionar tanto en entorno local como cloud (AWS).
- Puedes extender fácilmente las rutas, servicios y controladores para escalar el sistema.

---

# challenge

**Puntos mínimos-obligatorios del MVP**
- Pruebas unitarias y de integración usando Jest o similar. ✅
- Uso de TypeScript para tipado estático y mayor seguridad en el código. ✅
- Un GET que combine y muestre datos de las dos APIsexternas. ✅
- POST para almacenar recursos propios en la base de datos. ✅
- Un GET para consultar el historial de datos almacenados. ✅
- Cacheo de resultadospara evitar múltiples llamadas a las APIsdentro de un intervalo de 30 minutos. ❌
  (Falta configurar NAT Gateway de lambda para consumir APIS EXTERNAS y el servicio Elasticache Memcached)
- Despliegue en AWS usando ServerlessFramework o CDK. ✅
- Almacenamiento en DynamoDBo MySQL. ✅
- Uso de AWS Lambday API Gateway. ✅

**Puntos Bonus:**
- Autenticaciónpara proteger los endpointsPOST y GET /historial (puede ser con JWTo AWS Cognito).. ✅
- Implementar un sistema de rate-limiting para evitar abuso de los endpoints que consumen las APIs externas (configuración en API Gateway). ✅


## 🤝 Contribuciones

¿Quieres contribuir? ¡Perfecto! Haz un fork del proyecto, crea una rama con tu feature o fix y abre un Pull Request.

---

## 🧑‍💻 Autor

Desarrollado por [Martín Luque](https://github.com/martin-luquet)

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT.