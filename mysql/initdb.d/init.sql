DROP DATABASE IF EXISTS textdata;
CREATE DATABASE textdata;
USE textdata;

CREATE TABLE IF NOT EXISTS data
(
  name VARCHAR NOT NULL,
  message TEXT NOT NULL
)DEFAULT CHARACTER
  SET=utf8;