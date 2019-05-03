docker build -t ohanlon/leads .
docker run -p 65432:3000 -d ohanlon/leads