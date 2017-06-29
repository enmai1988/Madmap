--   Execute this file from the command line by typing:
--  * FOR LOCAL CREATION:
--  *    psql -d postgres < server/schema.sql;
--  * FOR HEROKU CREATION:
--  * heroku pg:psql --app mad-map-app-staging < server/schema.sql;
--  *  TO DELETE:
--  *  psql -U postgres < DROP DATABASE mad_map_db 

-- * FOR LOCAL DEPLOYMENT
-- drop database if exists mad_map_db;
-- drop role if exists mad_map_db;

-- create user mad_map_db createdb createrole password 'password';

-- create database mad_map_db owner mad_map_db;
-- \connect mad_map_db

-- DROP TABLE if exists mad_map_users;

-- CREATE TABLE mad_map_users
-- (
--   id SERIAL PRIMARY KEY,
--   user_name text 
-- );

-- ALTER TABLE mad_map_users OWNER TO mad_map_db;

-- INSERT INTO mad_map_users (user_name) VALUES ('billy_bob');
-- INSERT INTO mad_map_users (user_name) VALUES ('hammy_pig');
-- INSERT INTO mad_map_users (user_name) VALUES ('cool_bill');

-- * FOR Heroku DEPLOYMENT

DROP TABLE if exists mad_map_users;

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

ALTER TABLE mad_map_users OWNER TO mad_map_db;

INSERT INTO mad_map_users (user_name) VALUES ('billy_bob');
INSERT INTO mad_map_users (user_name) VALUES ('hammy_pig');
INSERT INTO mad_map_users (user_name) VALUES ('cool_bill');





