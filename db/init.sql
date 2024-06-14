-- CREATE DATABASE IF NOT EXISTS codrrdb
SELECT 'CREATE DATABASE group-backend-db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'group-backend-db')\gexec