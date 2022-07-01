npm run build
docker build -t gms-img .
docker run -dp 3000:80 --name gms-front gms-img