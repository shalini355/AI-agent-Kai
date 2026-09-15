FROM node:20-alpine AS frontend-build
WORKDIR /app/kai-frontend
COPY kai-frontend/package*.json ./
RUN npm ci
COPY kai-frontend/ ./
ARG REACT_APP_API_URL=/api
ARG REACT_APP_AUTH_REQUIRED=true
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_AUTH_REQUIRED=$REACT_APP_AUTH_REQUIRED
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app/kai-backend
ENV NODE_ENV=production
COPY kai-backend/package*.json ./
RUN npm ci --omit=dev
COPY kai-backend/ ./
COPY --from=frontend-build /app/kai-frontend/build ./build
EXPOSE 5000
USER node
CMD ["node", "server.js"]