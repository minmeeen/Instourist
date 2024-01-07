CREATE TABLE initial_data (
    initial_id serial primary key ,
    user_id varchar,
    username text,
    full_name text,
    caption text,
    create_at timestamp,
    taken_at timestamp,
    location_id serial REFERENCES location(location_id)
);