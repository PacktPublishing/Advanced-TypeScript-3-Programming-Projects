FOR /f "tokens=*" %%i IN ('docker ps -q') DO docker stop %%i
CD People
CALL build.cmd
CD ..\Leads
CALL build.cmd
CD ..\Addresses
CALL build.cmd
