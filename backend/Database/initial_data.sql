CREATE TABLE initial_data (
    initial_id serial primary key ,
    user_id varchar,
    username text,
    full_name text,
    caption text,
    post_created_at timestamp,
    post_taken_at timestamp,
    location_id serial REFERENCES location(location_id),
    created_at timestamp,
    created_by varchar
);