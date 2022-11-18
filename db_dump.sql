--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-11-18 15:40:09

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3328 (class 1262 OID 91036)
-- Name: posts; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE posts WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE posts OWNER TO postgres;

\connect posts

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 91088)
-- Name: Posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Posts" (
    id integer NOT NULL,
    title character varying(256) NOT NULL,
    url character varying(256) NOT NULL,
    author character varying(256) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Posts" OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 91087)
-- Name: Posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Posts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Posts_id_seq" OWNER TO postgres;

--
-- TOC entry 3329 (class 0 OID 0)
-- Dependencies: 209
-- Name: Posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Posts_id_seq" OWNED BY public."Posts".id;


--
-- TOC entry 212 (class 1259 OID 91137)
-- Name: Tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tags" (
    id integer NOT NULL,
    tag character varying(256) NOT NULL,
    post_id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now()
);


ALTER TABLE public."Tags" OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 91136)
-- Name: Tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Tags_id_seq" OWNER TO postgres;

--
-- TOC entry 3330 (class 0 OID 0)
-- Dependencies: 211
-- Name: Tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tags_id_seq" OWNED BY public."Tags".id;


--
-- TOC entry 3169 (class 2604 OID 91091)
-- Name: Posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Posts" ALTER COLUMN id SET DEFAULT nextval('public."Posts_id_seq"'::regclass);


--
-- TOC entry 3172 (class 2604 OID 91140)
-- Name: Tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags" ALTER COLUMN id SET DEFAULT nextval('public."Tags_id_seq"'::regclass);


--
-- TOC entry 3320 (class 0 OID 91088)
-- Dependencies: 210
-- Data for Name: Posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Posts" (id, title, url, author, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3322 (class 0 OID 91137)
-- Dependencies: 212
-- Data for Name: Tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tags" (id, tag, post_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3331 (class 0 OID 0)
-- Dependencies: 209
-- Name: Posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Posts_id_seq"', 532, true);


--
-- TOC entry 3332 (class 0 OID 0)
-- Dependencies: 211
-- Name: Tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tags_id_seq"', 259, true);


--
-- TOC entry 3176 (class 2606 OID 91097)
-- Name: Posts Posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Posts"
    ADD CONSTRAINT "Posts_pkey" PRIMARY KEY (id);


--
-- TOC entry 3178 (class 2606 OID 91144)
-- Name: Tags Tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags"
    ADD CONSTRAINT "Tags_pkey" PRIMARY KEY (id);


--
-- TOC entry 3179 (class 2606 OID 91145)
-- Name: Tags Tags_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags"
    ADD CONSTRAINT "Tags_post_id_fkey" FOREIGN KEY (post_id) REFERENCES public."Posts"(id);


-- Completed on 2022-11-18 15:40:09

--
-- PostgreSQL database dump complete
--

