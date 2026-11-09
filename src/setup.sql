INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES 
('BrightFuture Builders','A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org','brightfuture-logo.png'),
('GreenHarvest Growers','An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');
INSERT INTO Projects (title, description, place, thedate)
VALUES
('Outdoor Classroom Building', 'built an outdoor class, including benches and shade. perfect for learning with nature', 'South Lakeland, FL', '2027-04-24'),
('Renovation of a Community Park', 'fixed up the community park, including park benches and picnic tables', 'Brandon, FL', '2027-02-16'),
('Developed Rainwater Systems', 'installed rainwater collection systems at community buildings', 'West Valley, Utah', '2024-02-16'),
('Road Repair','helped fix the broken roads, including potholes', 'Salt Lake City, Utah', '2029-02-13'),
('Post Blizzard Repair', 'repaired damages after a pretty nasty blizzard', 'Marshall, Alaska', '2028-09-2' ),
('pollinator garden', 'created gardens that supports bees and other pollinators', 'Salt Lake City, Utah', '2040-09-20'),
('Farming Education', 'introduced people to gardening skills, and sustainable agriculture', 'Lakeland, FL', '2027-05-22'),
('Farmers Market Event', 'work with local gardeners to create a market that sells fresh produce', 'Brandon, FL', '2028-02-28'),
('Produce Donation Drive', 'work with gardeners to donate produce to those who need it', 'West Valley, Utah', '2029-12-12'),
('Greenhouse Designer', 'helped make greenhouses more resistant to cold weather', 'Salt Lake City, Utah', '2040-09-16'),
('Homeless Outreach Program', 'distributed hygine products, clothing, and other esential supplies for the homeless', 'Salt Lake City, Utah', '2028-09-16'),
('Animal Shelter Assistance','helped local animal shelters with animal care and cleaning', 'Lakeland, FL', '2027-05-22' ),
('Hurricane Cleanup','cleaned up the streets after a category 3 hurricane', 'Brandon, FL', '2028-09-22'),
('Graffiti  Removal', 'removed problematic graffiti from areas near a storefront', 'West Valley, Utah', '2029-03-27'),
('Fundrassing Assistance', 'assisted with a school fundrasser, raising money for a better education', 'Marshall, Alaska', '2027-05-22')
INSERT INTO project_orgaizations (project_id, organization_id)
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 3),
(12, 3),
(13, 3),
(13, 1),
(14, 3),
(15, 3)
INSERT INTO category (category_name)
VALUES
('Refurbishment'),
('Build'),
('Education'),
('Charity')
INSERT INTO project_category(project_id, category_id)
VALUES
(1, 2),
(2, 1),
(3, 1),
(3, 2),
(4, 1),
(5, 1),
(5, 4),
(6, 2),
(7, 3),
(8, 2),
(9, 4),
(10, 2),
(10, 1),
(11, 4),
(12, 4),
(13, 1),
(13, 4),
(14, 1),
(15, 4)
