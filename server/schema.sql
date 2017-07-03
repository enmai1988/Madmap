--   Execute this file from the command line by typing:
--  * FOR LOCAL CREATION:
--  *    psql -d postgres < server/schema.sql;
--  * FOR HEROKU CREATION:
--  * heroku pg:psql --app mad-map-app-staging < server/schema.sql;
--  *  TO DELETE:
--  *  psql -U postgres < DROP DATABASE mad_map_db

-- * FOR LOCAL DEPLOYMENT
drop database if exists mad_map_db;
drop role if exists mad_map_db;

create user mad_map_db createdb createrole password 'password';

create database mad_map_db owner mad_map_db;
\connect mad_map_db

DROP TABLE if exists mad_map_users;
DROP TABLE if exists mad_map_maps;
DROP TABLE if exists mad_map_markers;

CREATE TABLE mad_map_users
(
  id SERIAL PRIMARY KEY,
  user_name text,
  password text,
  salt text 
);

CREATE TABLE mad_map_maps
(
  id SERIAL PRIMARY KEY,
  zoom int,
  current_center text,
  user_id int REFERENCES mad_map_users (id)
);

CREATE TABLE mad_map_markers
(
  id SERIAL PRIMARY KEY,
  lat double precision,
  lng double precision,
  icon_path text,
  info text,
  fill_color text,
  stroke_color text,
  map_id int REFERENCES mad_map_maps (id)
);

ALTER TABLE mad_map_users OWNER TO mad_map_db;
ALTER TABLE mad_map_maps OWNER TO mad_map_db;
ALTER TABLE mad_map_markers OWNER TO mad_map_db;

INSERT INTO mad_map_users (user_name) VALUES ('billy_bob69');
INSERT INTO mad_map_users (user_name) VALUES ('hammy_pig1337');
INSERT INTO mad_map_users (user_name) VALUES ('cool-bill9000');
-- INSERT INTO mad_map_maps (zoom, current_center, user_id) VALUES (17, 44/-122, 1);
INSERT INTO mad_map_maps (zoom, current_center, user_id) VALUES (11, '49/-110', null);
-- INSERT INTO mad_map_maps (zoom, current_center, user_id) VALUES (14, 51/-115, 3);
INSERT INTO mad_map_markers (lat, lng, icon_path, info, map_id) VALUES (50, -129, '3','some info about our pin', 1);
INSERT INTO mad_map_markers (lat, lng, icon_path, info, map_id) VALUES (42, -118, '3','random string describing pin', 1);
-- INSERT INTO mad_map_markers (lat, lng, icon, info, map_id) VALUES (40, -108, 3,'random string thats working', 3);

-- * FOR Heroku DEPLOYMENT

-- DROP TABLE if exists mad_map_users;
-- DROP TABLE if exists mad_map_maps;
-- DROP TABLE if exists mad_map_markers;

-- CREATE TABLE mad_map_users
-- (
--   id SERIAL PRIMARY KEY,
--   user_name text
-- );

-- CREATE TABLE mad_map_maps
-- (
--   id SERIAL PRIMARY KEY,
--   zoom int,
--   current_center text,
--   user_id int REFERENCES mad_map_users (id)
-- );

-- CREATE TABLE mad_map_markers
-- (
--   id SERIAL PRIMARY KEY,
--   lat double precision,
--   lng double precision,
--   icon int,
--   info text,
--   map_id int REFERENCES mad_map_maps (id)
-- );

-- ALTER TABLE mad_map_users OWNER TO mad_map_db;
-- ALTER TABLE mad_map_maps OWNER TO mad_map_db;
-- ALTER TABLE mad_map_markers OWNER TO mad_map_db;

-- INSERT INTO mad_map_users (user_name) VALUES ('billy_bob69');
-- INSERT INTO mad_map_users (user_name) VALUES ('hammy_pig1337');
-- INSERT INTO mad_map_users (user_name) VALUES ('cool-bill9000');
-- INSERT INTO mad_map_maps (zoom, current_center, user_id) VALUES (17, 44/-122, 1);
-- INSERT INTO mad_map_maps (zoom, current_center, user_id) VALUES (15, 49/-110, 2);
-- INSERT INTO mad_map_maps (zoom, current_center, user_id) VALUES (14, 51/-115, 3);
-- INSERT INTO mad_map_markers (lat, lng, icon, info, map_id) VALUES (50, -129, 3,'some info about our pin', 1);
-- INSERT INTO mad_map_markers (lat, lng, icon, info, map_id) VALUES (42, -118, 3,'random string describing pin', 2);
-- INSERT INTO mad_map_markers (lat, lng, icon, info, map_id) VALUES (40, -108, 3,'random string thats working', 3);
