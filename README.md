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

## 🚀 Características

- Desarrollo en **TypeScript**
- Framework **Express**
- Autenticación con **JWT**
- Cifrado de contraseñas con **bcryptjs**
- Cache con **Memcached** (vía `memjs`)
- Documentación interactiva con **Swagger UI**
- Pruebas unitarias y de integración con **Jest**
- Deploy automático con **Serverless Framework**
- Logs estructurados con **Pino**
- Soporte para múltiples entornos usando **dotenv**



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
| `npm run test:integration`   | Ejecuta las pruebas de integración con Jest      |
| `npm run deploy:dev` | Despliega la API en AWS Lambda  en desarrollo            |
| `npm run deploy` | Despliega la API en AWS Lambda  en producción            |



## 🧰 Requisitos

- Node.js >= 20.x
- NPM o Yarn
- AWS CLI configurado
- Serverless Framework instalado globalmente:
  ```bash
  npm install -g serverless
  ```

## Clona el repositorio
git clone https://github.com/tuusuario/ml-backend-challenge.git
cd ml-backend-challenge

## Instala dependencias
npm install


## 🔐 Variables de entorno (`.env`)

Ejemplo de `.env`:

```env

MYSQL_HOST=XXXXXXXXXXXX
MYSQL_PORT=3306
MYSQL_USER=admin
MYSQL_PASSWORD=XXXXXXXXXXXXXXX
MYSQL_DATABASE=db_backend_challenge

JWT_SECRET=backendchallenge
JWT_EXPIRES_IN=1h

MEMCACHED_URL=memcached-challenge.vvassdd.cfg.use1.cache.amazonaws.com:11211

LOG_LEVEL=debug

SWAPI_BASE_URL=https://swapi.info/api
OPENMETEO_BASE_URL=https://api.open-meteo.com/v1/forecast
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
npm run deploy:dev
serverless deploy --stage dev
```

---

## 📌 Notas

- El proyecto usa `serverless-http` para adaptar Express a Lambda.
- Está preparado para funcionar tanto en entorno local como cloud (AWS).
- Puedes extender fácilmente las rutas, servicios y controladores para escalar el sistema.

---

# Challenge

**Puntos mínimos-obligatorios del MVP**
- Pruebas unitarias y de integración usando Jest o similar. ✅
- Uso de TypeScript para tipado estático y mayor seguridad en el código. ✅
- Un GET que combine y muestre datos de las dos APIsexternas. ✅
- POST para almacenar recursos propios en la base de datos. ✅
- Un GET para consultar el historial de datos almacenados. ✅
- Cacheo de resultadospara evitar múltiples llamadas a las APIsdentro de un intervalo de 30 minutos. ✅
- Despliegue en AWS usando ServerlessFramework o CDK. ✅
- Almacenamiento en DynamoDBo MySQL. ✅
- Uso de AWS Lambday API Gateway. ✅

**Puntos Bonus:**
- Autenticación para proteger los endpoints POST y GET /historial (puede ser con JWTo AWS Cognito).. ✅
- Implementar un sistema de rate-limiting para evitar abuso de los endpoints que consumen las APIs externas (configuración en API Gateway). ✅
- Uso de logging avanzado con AWS CloudWatch para rastrear errores y rendimiento. ✅


## 🤝 Contribuciones

¿Quieres contribuir? ¡Perfecto! Haz un fork del proyecto, crea una rama con tu feature o fix y abre un Pull Request.

---

## 🧑‍💻 Autor

Desarrollado por [Martín Luque](https://github.com/martin-luquet)

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT.