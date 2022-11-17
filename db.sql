CREATE TABLE "Posts" (
	id SERIAL NOT NULL,
	title VARCHAR(256) NOT NULL,
	url VARCHAR(256) NOT NULL,
	author VARCHAR(256) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now(),
	PRIMARY KEY (id)
);

INSERT INTO "Posts" (title, url, author) VALUES
('post 1', 'www.post.com/1', 'myauthor15'),
('post 2', 'www.post.com/2', 'myauthor15'),
('post 3', 'www.post.com/3', 'myauthor15'),
('post 4', 'www.post.com/4', 'myauthor3'),
('post 5', 'www.post.com/5', 'myauthor4'),
('post 6', 'www.post.com/6', 'myauthor9');

CREATE TABLE "Tags" (
	id SERIAL NOT NULL,
	tag VARCHAR(256) NOT NULL,
	post_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (post_id) REFERENCES "Posts"(id)
);

INSERT INTO "Tags" (tag, post_id) VALUES
('comment', 1),('author_myauthor1', 1),('story_1', 1),
('comment', 2),('author_myauthor2', 2),('story_2', 2),
('comment', 3),('author_myauthor3', 3),('story_3', 3),
('comment', 4),('author_myauthor4', 4),('story_4', 4),
('comment', 5),('author_myauthor5', 5),('story_5', 5);


