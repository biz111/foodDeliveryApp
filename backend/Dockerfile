FROM node:14 AS backend-build
WORKDIR /usr/src/app
COPY ./ ./backend/
RUN cd backend && npm install

FROM node:14
WORKDIR /usr/src/app/
COPY --from=backend-build /usr/src/app/backend/ ./
RUN ls
EXPOSE 3000
CMD ["/bin/sh", "-c", "cd /usr/src/app/ && node app.js"]