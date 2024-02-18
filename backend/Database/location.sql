CREATE TABLE location (
    location_id serial primary key ,
    location_name varchar,
    ig_location text[],
    created_at timestamp not null ,
    created_by varchar not null ,
    updated_at timestamp,
    updated_by varchar
);

Insert into location(location_name, ig_location, created_at, created_by)
VALUES ('Chiang Mai Grand Canyon' ,Array ['632463043626278', '1028305381'], now(), 'System'),
('Doi Inthanon', Array['236812658', '352088355491037'], now(), 'System'),
('Mae Taeng Elephant Park', Array['291752084203684', '1527799243987966'], now(), 'System'),
('Wat Phra Singh' , Array['112222267011408', '349345216', '248305621'], now(), 'System'),
('Wat Gate Garam' , Array['904134436338401', '419245734893599'], now(), 'System'),
('Wat Umong' , Array['223846157', '1030948912', '487995489'], now(), 'System'),
('Three Kings Monument' , Array['305046242995484', '893971733980858', '113055166899502'], now(), 'System'),
('Wat Chiang Man' , Array['662626057506904', '100502908417645'], now(), 'System'),
('Tha Phae Gate' , Array['100492914914971'], now(), 'System'),
('MAYA' , Array['213590035'], now(), 'System'),
('Chiang Mai Night Bazaar' , Array['1764651450309580'], now(), 'System'),
('Chiang Mai Night Safari' , Array['195304697182096'], now(), 'System');