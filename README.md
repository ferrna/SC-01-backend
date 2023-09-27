# SC-01-backend

## Generate seed
cd src/db
npx sequelize-cli seed:generate --name demo-product

## Run a single seed
npx sequelize-cli db:seed --seed seed-file-name.js