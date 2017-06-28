-- drop database if exists mad_map_db;
-- drop role if exists mad_map_db;


--   Execute this file from the command line by typing:
--  *    psql -U postgres < server/schema.sql;
--  *  sudo -u postgres psql < server/schema.sql
--  *  to create the database and the tables.
--  *  TO DELETE:
--  *  psql -U postgres < DROP DATABASE mad_map_db 

-- create user mad_map_db createdb createrole password 'password';

-- create database mad_map_db owner mad_map_db;
-- \connect mad_map_db

-- DROP TABLE if exists mad_map_users;

CREATE TABLE mad_map_users
(
  id SERIAL PRIMARY KEY,
  user_name text 
);

-- CREATE TABLE mad_map_maps
-- (
--   id SERIAL PRIMARY KEY,
--   user_id text refrences mad_map_maps (id)
-- );

-- ALTER TABLE mad_map_users OWNER TO mad_map_db;

INSERT INTO mad_map_users (user_name) VALUES ('billy_bob');
INSERT INTO mad_map_users (user_name) VALUES ('hammy_pig');
INSERT INTO mad_map_users (user_name) VALUES ('cool_bill');



-- postgres://orbianvgjyjicm:4c93cb2db932844cfc1312d7bd25d6b1970cb479f7243baeff3d0dedf6788b49@ec2-50-19-83-146.compute-1.amazonaws.com:5432/d9fqglp27gjsds
-- postgres://orbianvgjyjicm:4c93cb2db932844cfc1312d7bd25d6b1970cb479f7243baeff3d0dedf6788b49@ec2-50-19-83-146.compute-1.amazonaws.com:5432/d9fqglp27gjsds 

