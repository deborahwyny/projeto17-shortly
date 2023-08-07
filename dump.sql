--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)

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
-- Name: url; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.url (
    id integer NOT NULL,
    url text NOT NULL,
    user_id integer,
    shorturl text NOT NULL,
    visitcount integer
);


--
-- Name: url_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.url_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: url_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.url_id_seq OWNED BY public.url.id;


--
-- Name: user_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_tokens (
    id integer NOT NULL,
    user_id integer,
    token text NOT NULL
);


--
-- Name: user_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_tokens_id_seq OWNED BY public.user_tokens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "confirmPassword" text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: url id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url ALTER COLUMN id SET DEFAULT nextval('public.url_id_seq'::regclass);


--
-- Name: user_tokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_tokens ALTER COLUMN id SET DEFAULT nextval('public.user_tokens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: url; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.url VALUES (1, 'https://...', NULL, '-hU2Df3QumS8OTUvyRrL_', NULL);
INSERT INTO public.url VALUES (2, 'https://...', NULL, '7Zpf1MsnYQVvi48NWuyGO', NULL);
INSERT INTO public.url VALUES (3, 'https://...', NULL, 'Qw_vA0K5jSXcFmIwoprDV', NULL);
INSERT INTO public.url VALUES (4, 'https://...', NULL, 'mSsNAqgiy0YlGCFs4AxRf', NULL);
INSERT INTO public.url VALUES (5, 'https://...', NULL, 'uNfG_OVzd1t-KMJODsftf', NULL);
INSERT INTO public.url VALUES (6, 'https://...', NULL, 'tqBM0y0afe-HlNlHnVa26', NULL);
INSERT INTO public.url VALUES (7, 'https://...', NULL, 'fEM6ipfJ7pQh5n6KDwLHg', NULL);
INSERT INTO public.url VALUES (8, 'https://...', NULL, 'IaTAwQpZuOOS1rxvVHeLl', NULL);
INSERT INTO public.url VALUES (9, 'https://...', NULL, 'g5qkeLK796EMsf-0jOMM4', NULL);
INSERT INTO public.url VALUES (10, 'https://...', NULL, '7DU1qp_cHTiAKWbyFt9UR', NULL);
INSERT INTO public.url VALUES (12, 'https://eeeee', 3, 'PlQ-WJMXCH0NW-BvT-3GP', NULL);
INSERT INTO public.url VALUES (15, 'https://aaaaaaaaaaaaaaaaaaaaaaaaa', 4, 'AXx5CJTyp4v6B2mMSCkAt', 0);
INSERT INTO public.url VALUES (16, 'https://aaaaaaaaaaaaaaaaaaaaaaaaa', 4, 'Li6SbOsXW2jGDQfuJYzyM', 4);
INSERT INTO public.url VALUES (14, 'https://aaaaaaaaaaaaaaaaaaaaaaaaa', 4, 'y-54pFZ-icMnob3Q9KmVk', 5);


--
-- Data for Name: user_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_tokens VALUES (1, 3, '6f33ce13-bec7-4dfd-9b63-163549dae1d6');
INSERT INTO public.user_tokens VALUES (2, 3, 'e67737de-afb4-4617-9583-477c32d7c617');
INSERT INTO public.user_tokens VALUES (3, 4, 'dc471df8-5e78-4405-93eb-cefe5cad717c');
INSERT INTO public.user_tokens VALUES (4, 5, '7cc3400a-b18c-45c3-9f72-56788f2b59a1');
INSERT INTO public.user_tokens VALUES (5, 6, '7fca064b-a4b7-4fe8-a6f6-994799442124');
INSERT INTO public.user_tokens VALUES (6, 7, 'f76a9783-d476-47de-bc18-65e6fa932fde');
INSERT INTO public.user_tokens VALUES (7, 8, '543a74f7-e480-4b88-86a4-73e0a3e4dec6');
INSERT INTO public.user_tokens VALUES (8, 9, 'b761fe30-8580-4441-a673-7170149152b6');
INSERT INTO public.user_tokens VALUES (9, 10, 'f8c790dd-1ce2-4391-a3e3-f76cf8ba3e09');
INSERT INTO public.user_tokens VALUES (10, 11, '3212d80c-31fd-4838-b913-3684e98eb988');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', 'driven', 'driven');
INSERT INTO public.users VALUES (2, 'João', 'joao@drivena.com.br', 'driven', 'driven');
INSERT INTO public.users VALUES (3, 'debs', 'debs@debs.com.br', 'driven', 'driven');
INSERT INTO public.users VALUES (4, 'regis', 'regis@debs.com.br', 'driven', 'driven');
INSERT INTO public.users VALUES (5, 'aaaaa', 'aaaa@debs.com.br', 'driven', 'driven');
INSERT INTO public.users VALUES (6, 'aaaaa', 'bbb@debs.com.br', 'driven', 'driven');
INSERT INTO public.users VALUES (7, 'aaaaa', 'cccc@debs.com.br', 'driven', 'driven');
INSERT INTO public.users VALUES (8, 'aaaaa', 'asas@debs.com.br', 'driven', 'driven');
INSERT INTO public.users VALUES (9, 'aaaaa', 'wqerfe@debs.com.br', 'driven', 'driven');
INSERT INTO public.users VALUES (10, 'aaaaa', 'eeeee@debs.com.br', 'driven', 'driven');
INSERT INTO public.users VALUES (11, 'aaaaa', 'yyyyy@debs.com.br', 'driven', 'driven');


--
-- Name: url_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.url_id_seq', 16, true);


--
-- Name: user_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_tokens_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: url url_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_pkey PRIMARY KEY (id);


--
-- Name: user_tokens user_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_tokens
    ADD CONSTRAINT user_tokens_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: url url_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.url
    ADD CONSTRAINT url_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_tokens user_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_tokens
    ADD CONSTRAINT user_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

