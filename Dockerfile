FROM node:alpine as node_image

COPY frontend /app/frontend
COPY backend /app/backend
WORKDIR /app
WORKDIR /app/frontend
RUN yarn
RUN yarn build

# Backend Phase
# create the directory inside the container
WORKDIR /app/backend
# run npm install in our local machine
RUN npm install --no-audit
# our app is running on port 8000 within the container, so need to expose it
EXPOSE 8000