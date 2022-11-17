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