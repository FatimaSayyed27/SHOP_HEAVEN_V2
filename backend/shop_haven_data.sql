--
-- PostgreSQL database dump
--

\restrict 3RavefVewi6bYLAV0TqfCDOIoBWMjEqMFgBGY7TYh1PMaPfl5Cscu15ASvY1RRQ

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	group
3	auth	permission
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	store	brand
8	store	category
9	store	product
10	store	cart
11	store	cartitem
12	store	order
13	store	orderitem
14	store	userprofile
15	store	wishlist
16	store	wishlistitem
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	3	add_permission
6	Can change permission	3	change_permission
7	Can delete permission	3	delete_permission
8	Can view permission	3	view_permission
9	Can add group	2	add_group
10	Can change group	2	change_group
11	Can delete group	2	delete_group
12	Can view group	2	view_group
13	Can add user	4	add_user
14	Can change user	4	change_user
15	Can delete user	4	delete_user
16	Can view user	4	view_user
17	Can add content type	5	add_contenttype
18	Can change content type	5	change_contenttype
19	Can delete content type	5	delete_contenttype
20	Can view content type	5	view_contenttype
21	Can add session	6	add_session
22	Can change session	6	change_session
23	Can delete session	6	delete_session
24	Can view session	6	view_session
25	Can add brand	7	add_brand
26	Can change brand	7	change_brand
27	Can delete brand	7	delete_brand
28	Can view brand	7	view_brand
29	Can add category	8	add_category
30	Can change category	8	change_category
31	Can delete category	8	delete_category
32	Can view category	8	view_category
33	Can add product	9	add_product
34	Can change product	9	change_product
35	Can delete product	9	delete_product
36	Can view product	9	view_product
37	Can add cart item	11	add_cartitem
38	Can change cart item	11	change_cartitem
39	Can delete cart item	11	delete_cartitem
40	Can view cart item	11	view_cartitem
41	Can add wishlist item	16	add_wishlistitem
42	Can change wishlist item	16	change_wishlistitem
43	Can delete wishlist item	16	delete_wishlistitem
44	Can view wishlist item	16	view_wishlistitem
45	Can add order item	13	add_orderitem
46	Can change order item	13	change_orderitem
47	Can delete order item	13	delete_orderitem
48	Can view order item	13	view_orderitem
49	Can add order	12	add_order
50	Can change order	12	change_order
51	Can delete order	12	delete_order
52	Can view order	12	view_order
53	Can add user profile	14	add_userprofile
54	Can change user profile	14	change_userprofile
55	Can delete user profile	14	delete_userprofile
56	Can view user profile	14	view_userprofile
57	Can add wishlist	15	add_wishlist
58	Can change wishlist	15	change_wishlist
59	Can delete wishlist	15	delete_wishlist
60	Can view wishlist	15	view_wishlist
61	Can add cart	10	add_cart
62	Can change cart	10	change_cart
63	Can delete cart	10	delete_cart
64	Can view cart	10	view_cart
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
2	pbkdf2_sha256$1500000$QJ8PRKP95yVXiaSN1foJcx$OlSOjLPbBzT0Ro/HfYHa4ErDZI2zHhWiSgiE/VQKN6c=	\N	f	fatima123			fatima123@gmail.com	f	t	2026-08-17 12:11:14.483489+05:30
3	pbkdf2_sha256$1200000$5HpebnbIDAXHZjSUnrxDA8$x2/GksxLdETzsp/HoqGf8gjUjAq1f9Ux3DV5oc/tDiU=	\N	f	Hadi			hadi06@gmail.com	f	t	2026-08-17 20:36:37.672241+05:30
1	pbkdf2_sha256$1200000$YjeJQ2GUSbdVsa2yY6Cuye$L2cwHfJGcy1Sliy+e2XOtNDbOvtJKBCIkIBiKgtPxik=	2026-08-17 11:58:32.543159+05:30	t	fatima			fatsayyed27@email.com	t	t	2026-08-17 11:58:04.322479+05:30
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2026-08-17 19:22:10.283012+05:30	1	Bottege Veneta	1	[{"added": {}}]	7	1
2	2026-08-17 19:22:19.738777+05:30	2	Gucci	1	[{"added": {}}]	7	1
3	2026-08-17 19:22:31.123972+05:30	3	Valentino	1	[{"added": {}}]	7	1
4	2026-08-17 19:22:42.842272+05:30	4	Louis Vuitton	1	[{"added": {}}]	7	1
5	2026-08-17 19:22:47.705081+05:30	5	Dior	1	[{"added": {}}]	7	1
6	2026-08-17 19:22:56.266504+05:30	6	Celine	1	[{"added": {}}]	7	1
7	2026-08-17 19:23:07.120649+05:30	7	Calvin Klein	1	[{"added": {}}]	7	1
8	2026-08-17 19:23:27.388424+05:30	1	Bags	1	[{"added": {}}]	8	1
9	2026-08-17 19:23:32.698471+05:30	2	Shoes	1	[{"added": {}}]	8	1
10	2026-08-17 19:23:39.945193+05:30	3	Perfumes	1	[{"added": {}}]	8	1
11	2026-08-17 19:23:48.755399+05:30	4	Clothing	1	[{"added": {}}]	8	1
12	2026-08-17 19:23:58.929874+05:30	5	Accessories	1	[{"added": {}}]	8	1
13	2026-08-17 19:24:04.941752+05:30	6	Watches	1	[{"added": {}}]	8	1
14	2026-08-17 19:26:22.605119+05:30	1	Gucci Ophidia Bag	1	[{"added": {}}]	9	1
15	2026-08-17 19:30:31.196154+05:30	1	Gucci Ophidia Bag	2	[{"changed": {"fields": ["Stock", "Is featured"]}}]	9	1
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2026-08-17 11:50:14.98961+05:30
2	auth	0001_initial	2026-08-17 11:50:15.102502+05:30
3	admin	0001_initial	2026-08-17 11:50:15.130197+05:30
4	admin	0002_logentry_remove_auto_add	2026-08-17 11:50:15.138709+05:30
5	admin	0003_logentry_add_action_flag_choices	2026-08-17 11:50:15.144716+05:30
6	contenttypes	0002_remove_content_type_name	2026-08-17 11:50:15.160731+05:30
7	auth	0002_alter_permission_name_max_length	2026-08-17 11:50:15.169733+05:30
8	auth	0003_alter_user_email_max_length	2026-08-17 11:50:15.178737+05:30
9	auth	0004_alter_user_username_opts	2026-08-17 11:50:15.187793+05:30
10	auth	0005_alter_user_last_login_null	2026-08-17 11:50:15.193794+05:30
11	auth	0006_require_contenttypes_0002	2026-08-17 11:50:15.194795+05:30
12	auth	0007_alter_validators_add_error_messages	2026-08-17 11:50:15.202799+05:30
13	auth	0008_alter_user_username_max_length	2026-08-17 11:50:15.212091+05:30
14	auth	0009_alter_user_last_name_max_length	2026-08-17 11:50:15.22209+05:30
15	auth	0010_alter_group_name_max_length	2026-08-17 11:50:15.227096+05:30
16	auth	0011_update_proxy_permissions	2026-08-17 11:50:15.234101+05:30
17	auth	0012_alter_user_first_name_max_length	2026-08-17 11:50:15.241624+05:30
18	sessions	0001_initial	2026-08-17 11:50:15.256151+05:30
19	store	0001_initial	2026-08-17 11:56:47.720895+05:30
20	store	0002_cart_cartitem_order_orderitem_userprofile_wishlist_and_more	2026-08-17 12:00:59.112235+05:30
21	store	0003_brand_ambassador_image_brand_hero_image_and_more	2026-08-20 22:59:37.426+05:30
22	store	0004_brand_ambassador_description_brand_ambassador_name	2026-08-21 11:24:50.67247+05:30
23	store	0005_brand_ambassador_image_1_brand_ambassador_image_2_and_more	2026-08-21 11:39:13.487671+05:30
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
tm229t8stp6w6yfysfdovhbcjg2asawe	.eJxVjDsOwjAQBe_iGlnrz25iSnrOYK3XDg4gR8qnQtwdIqWA9s3Me6nI21rjtpQ5jlmdlVGn3y2xPErbQb5zu01aprbOY9K7og-66OuUy_NyuH8HlZf6rUtnkYAY3dCz42x7GcQJMnEKwmisIZ-o9x04CMkCIQXwgB1KQOPV-wPVRTan:1wvqpk:RZ4WG5r1LRi2IBmIPWQvDZlAADc8BnTXGjBULjC50QQ	2026-08-31 11:58:32.545157+05:30
\.


--
-- Data for Name: store_brand; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.store_brand (id, name, slug, logo, description, ambassador_image, hero_image, ambassador_description, ambassador_name, ambassador_image_1, ambassador_image_2, ambassador_image_3, ambassador_image_4) FROM stdin;
3	Valentino	valentino	brands/valentino-logo_svgstack_com_92311787227607.png	Valentino is a renowned Italian luxury fashion house celebrated for its elegant designs, romantic aesthetic, and exceptional craftsmanship. The brand blends timeless sophistication with modern creativity.			SUGA brings his distinctive style, artistic personality, and refined presence to Valentino, complementing the brand’s sophisticated and contemporary identity.	Min Yoongi	brands/ambassadors/suga1.jpg	brands/ambassadors/suga2.jpg	brands/ambassadors/suga3.jpg	brands/ambassadors/suga4.jpg
10	Tiffany & Co.	tiffany-and-co	brands/pngwing.com.png	Tiffany & Co. is an iconic American luxury jewelry house known for its timeless designs, exceptional craftsmanship, and signature elegance. The brand represents sophistication, creativity, and enduring luxury.			Jimin brings his refined style, elegance, and artistic charm to Tiffany & Co., reflecting the Maison’s modern and sophisticated spirit.	PARK JIMIN	brands/ambassadors/jimin7.jpg	brands/ambassadors/jimin4_R1cEZop.jpg	brands/ambassadors/jimin6.jpg	brands/ambassadors/jimin5.jpg
4	Louis Vuitton	louis-vuitton	brands/louis-vuitton-logo_svgstack_com_91981787227581.png	Louis Vuitton is a renowned French luxury Maison known for its iconic designs, exceptional craftsmanship, and timeless elegance. The brand blends heritage with modern creativity across fashion, leather goods, accessories, and more.			J-Hope brings his unique style, creativity, and charismatic energy to Louis Vuitton, reflecting the Maison’s bold and contemporary spirit.	Jung Ho-seok	brands/ambassadors/jp4.jpg	brands/ambassadors/jp5.jpg	brands/ambassadors/jp6.jpg	brands/ambassadors/jp7.jpg
9	FRED	fred	brands/Fred_Logo.png	FRED is a prestigious French jewelry house known for its bold designs, vibrant creativity, and exceptional craftsmanship. The brand combines modern elegance with a distinctive and sophisticated aesthetic.			Jin brings his refined style, confidence, and charismatic presence to FRED, complementing the brand’s modern and elegant identity.	Kim Seokjin	brands/ambassadors/jin6.jpg	brands/ambassadors/jin5.jpg	brands/ambassadors/jin8.jpg	brands/ambassadors/jin7.jpg
8	Cartier	cartier	brands/Cartier_Logo.png	Cartier is a prestigious French luxury Maison renowned for its exquisite jewelry, iconic watches, and timeless elegance. The brand combines exceptional craftsmanship with sophisticated design, making it a symbol of luxury and refinement.			J-Hope brings his distinctive style, creativity, and charismatic presence to Cartier, reflecting the Maison’s spirit of elegance and contemporary sophistication.	Jung Hokgseok	brands/ambassadors/jp2.jpg	brands/ambassadors/jp3.jpg	brands/ambassadors/jp8.jpg	brands/ambassadors/jp9.jpg
5	Dior	dior	brands/christian-dior-logo_svgstack_com_91741787226967.png	Dior is a world-renowned luxury Maison, celebrated for its timeless elegance, iconic designs, and exceptional craftsmanship.	brands/ambassadors/jimin.webp	brands/hero/christian-dior-logo_svgstack_com_91741787226967.png	Park Jimin, BTS member and Dior Global Ambassador, represents the Maison’s modern elegance with his distinctive style, artistic expression, and charismatic presence. His partnership with Dior reflects a shared passion for creativity, sophistication, and timeless luxury.	PARK JIMIN	brands/ambassadors/jimin3_4PRRndl.jpg	brands/ambassadors/jimin3_RTkBehb.jpg	brands/ambassadors/jimin2_i7o7JZt.jpg	brands/ambassadors/jimin4_AkhYMNj.jpg
1	Bottege Veneta	bottege-veneta	brands/Bottega_Veneta2.webp	Bottega Veneta is an Italian luxury fashion house known for its sophisticated designs, exceptional craftsmanship, and iconic leather goods. The brand is celebrated for its signature Intrecciato weaving, modern aesthetic, and understated approach to luxury.			Kim Namjoon (RM), leader of BTS, brings a refined and contemporary presence to Bottega Veneta. Known for his distinctive style and artistic personality, he reflects the brand’s modern, sophisticated approach to luxury.	Kim Namjoon	brands/ambassadors/rm1.jpg	brands/ambassadors/rm3.jpg	brands/ambassadors/rm4.jpg	brands/ambassadors/rm2.jpg
7	Calvin Klein	calvin-klein	brands/Calvin_Klein_company-Logo.wine.png	Calvin Klein is an iconic American fashion brand known for its minimalist aesthetic, modern designs, and timeless style. The brand is celebrated for its clothing, denim, underwear, and distinctive contemporary identity.			Jung Kook brings a youthful, confident, and contemporary energy to Calvin Klein, reflecting the brand’s bold and effortlessly modern style.	Jeon Jungkook	brands/ambassadors/jk1.jpg	brands/ambassadors/jk4.jpg	brands/ambassadors/jk3.jpg	brands/ambassadors/jk2.jpg
6	Celine	celine	brands/chanel-logo_svgstack_com_91731787226946.png	Celine is a renowned French luxury fashion house known for its sophisticated designs, minimalist aesthetic, and timeless elegance. The brand blends modern creativity with refined craftsmanship.			V brings his distinctive style, charisma, and artistic personality to Celine, perfectly complementing the brand’s modern and sophisticated identity.	Kim Taehyung	brands/ambassadors/v3.jpg	brands/ambassadors/v4.jpg	brands/ambassadors/v1.jpg	brands/ambassadors/v5.jpg
2	Gucci	gucci	brands/gucci-logo_svgstack_com_91861787227049.png	Gucci is an iconic Italian luxury fashion house known for its bold designs, rich heritage, and distinctive blend of classic and contemporary style. The brand represents creativity, craftsmanship, and modern luxury.			Jin brings his elegant style, confidence, and charismatic presence to Gucci, reflecting the brand’s sophisticated yet contemporary spirit.	kim Seokjin	brands/ambassadors/jin1.jpg	brands/ambassadors/jin2.jpg	brands/ambassadors/jin3.jpg	brands/ambassadors/jin4.jpg
\.


--
-- Data for Name: store_cart; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.store_cart (id, created_at, user_id) FROM stdin;
1	2026-08-17 20:36:47.961118+05:30	3
2	2026-08-19 16:38:48.930888+05:30	1
\.


--
-- Data for Name: store_category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.store_category (id, name, slug) FROM stdin;
1	Bags	bags
2	Shoes	shoes
3	Perfumes	perfumes
4	Clothing	clothing
5	Accessories	accessories
6	Watches	watches
7	Wallets	wallets
8	Jewelry	jewelry
\.


--
-- Data for Name: store_product; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.store_product (id, name, description, price, image, stock, is_featured, created_at, brand_id, category_id) FROM stdin;
23	Cartier Love Bracelet	An iconic luxury bracelet inspired by Cartier's signature Love design, featuring a refined metallic finish and timeless contemporary elegance.	680000.00	products/Cartier_Love_Bracelet.jpg	4	t	2026-08-20 19:54:01.660728+05:30	8	8
24	Cartier Trinity Ring	A sophisticated ring inspired by Cartier's classic Trinity aesthetic, combining elegant curves with a refined luxury finish.	320000.00	products/Cartier_Trinity_Ring.webp	6	t	2026-08-20 19:55:24.141829+05:30	8	8
25	Cartier Santos Watch	A sophisticated luxury timepiece inspired by the iconic Santos design, combining a refined case with a timeless and distinctive silhouette.	850000.00	products/Cartier_Santos_Watch.webp	3	t	2026-08-20 19:56:58.411138+05:30	8	6
26	FRED Force 10 Bracelet	A distinctive luxury bracelet inspired by FRED's iconic Force 10 collection, combining elegant jewelry design with a bold contemporary character.	420000.00	products/FRED_Force_10_Bracelet.webp	5	t	2026-08-20 19:58:15.894289+05:30	9	8
1	Gucci Ophidia Bag		2550.00	products/Gucci_Ophidia_Bag.avif	8	t	2026-08-17 19:26:22.59312+05:30	2	1
2	Coat	Product:Clothing\r\nDesigner:Celine\r\nGender:Women\r\nColour:Beige\r\nMaterial:Cotton, Wool\r\nAge:Contemporary\r\nIncludes:No Additionals\r\nUK Clothing Size:Womens 10\r\nClothing:Coats\r\nCoat:Trench\r\nLook:Everyday\r\nSleeve Length:Long Sleeved\r\nSeasonal:Timeless	50000.00	products/Celine_Belted_Trench_Coat.webp	20	t	2026-08-19 22:30:17.310776+05:30	6	4
3	Intrecciato Leather Bag	Elegant woven leather bag featuring a sophisticated design, spacious interior and premium finishing. Perfect for everyday luxury styling.	185000.00	products/Intrecciato_Leather_Bag.webp	2	t	2026-08-20 12:17:58.816606+05:30	1	1
4	Leather Ankle Boots	Premium leather ankle boots with a sleek silhouette and comfortable construction, designed for a refined modern look.	125000.00	products/Leather_Ankle_Boots.webp	8	f	2026-08-20 12:27:03.669064+05:30	1	2
5	CK Monogram Hoodie	Comfortable cotton-blend hoodie featuring a clean monogram design, ribbed cuffs and a relaxed fit for everyday wear.	12999.00	products/CK_Monogram_Hoodie.webp	25	t	2026-08-20 12:27:59.240145+05:30	7	4
8	Celine Signature Sneakers	Contemporary sneakers combining a clean silhouette with premium materials and comfortable everyday wear.	95000.00	products/Celine_Signature_Sneakers.webp	10	f	2026-08-20 12:30:52.317987+05:30	6	2
9	Sauvage Eau de Parfum	Sophisticated fragrance with a fresh and elegant character, presented in a premium bottle suitable for special occasions.	14500.00	products/Sauvage_Eau_de_Parfum.webp	30	t	2026-08-20 12:31:54.400563+05:30	5	3
10	Dior Leather Wallet	Premium leather wallet with a refined design, multiple card slots and practical compartments for everyday essentials.	72000.00	products/Dior_Leather_Wallet.webp	14	f	2026-08-20 12:32:48.446363+05:30	5	5
11	GG Supreme Handbag	Elegant designer-inspired handbag with a structured silhouette, spacious interior and premium finishing.	175000.00	products/GG_Supreme_Handbag.webp	11	t	2026-08-20 12:33:44.859656+05:30	2	1
12	Gucci Ace Sneakers	Classic low-top sneakers with a refined design, comfortable sole and versatile styling for casual outfits.	85000.00	products/Gucci_Ace_Sneakers.webp	18	f	2026-08-20 12:34:40.51242+05:30	2	2
13	LV Monogram Belt	Premium leather belt featuring a sophisticated monogram-inspired design and polished buckle for a timeless appearance.	68000.00	products/LV_Monogram_Belt.jpg	20	t	2026-08-20 12:35:35.03343+05:30	4	5
14	LV Classic Leather Sneakers	Premium casual sneakers with a clean silhouette, comfortable sole and elegant detailing.	110000.00	products/LV_Classic_Leather_Sneakers.jpeg	9	f	2026-08-20 12:38:09.581329+05:30	4	2
15	Valentino VLogo Bag	Sophisticated handbag with a structured shape, elegant logo detailing and spacious interior for daily essentials.	195000.00	products/Valentino_VLogo_Bag.avif	6	t	2026-08-20 12:39:13.475898+05:30	3	1
16	Valentino Silk Shirt	Luxurious silk shirt with a smooth finish and elegant silhouette, ideal for creating a sophisticated outfit.	98000.00	products/Valentino_Silk_Shirt.webp	8	f	2026-08-20 12:40:08.807518+05:30	3	4
28	Tiffany HardWear Bracelet	A bold luxury bracelet inspired by Tiffany HardWear, featuring a distinctive sculptural design and sophisticated contemporary character.	390000.00	products/Tiffany_HardWear_Bracelet.jpeg	7	t	2026-08-20 20:02:17.207781+05:30	10	8
7	Triomphe Canvas Shoulder Bag	Stylish shoulder bag featuring a signature-inspired canvas pattern, structured design and a spacious interior.	210000.00	products/Triomphe_Canvas_Shoulder_Bag.webp	7	t	2026-08-20 12:29:50.819664+05:30	6	1
17	Bottega Veneta Cassette Bag	A sophisticated quilted leather bag with a contemporary silhouette and signature luxury appeal. Designed with a spacious interior and refined detailing for effortless everyday elegance.	225000.00	products/Bottega_Veneta_Cassette_Bag.webp	0	t	2026-08-20 19:22:46.937804+05:30	1	1
18	Bottega Veneta Leather Loafers	Premium leather loafers featuring a sleek silhouette and refined craftsmanship. A versatile luxury footwear choice suitable for both formal and smart-casual styling.	98000.00	products/Bottega_Veneta_Leather_Loafers.webp	10	f	2026-08-20 19:26:10.518565+05:30	1	2
20	Celine Ava Triomphe Bag	An elegant curved shoulder bag inspired by Celine's refined aesthetic. Featuring signature detailing and a compact yet practical interior for everyday essentials.	210000.00	products/Celine_Ava_Triomphe_Bag.jpg	5	t	2026-08-20 19:29:28.94982+05:30	6	1
21	Celine Leather Loafers	Refined leather loafers combining timeless craftsmanship with a modern silhouette. Designed to complement sophisticated formal and casual wardrobes.	115000.00	products/Celine_Leather_Loafers.webp	7	f	2026-08-20 19:30:46.789305+05:30	6	2
22	Valentino Rockstud Sandals	Elegant sandals featuring Valentino-inspired stud detailing and a refined silhouette. Designed to add a distinctive luxury touch to sophisticated outfits.	108000.00	products/Valentino_Rockstud_Sandals.avif	9	t	2026-08-20 19:32:38.161528+05:30	3	2
29	Tiffany Atlas Watch	A refined luxury timepiece inspired by Tiffany's classic Atlas aesthetic, combining a sophisticated dial with an elegant contemporary profile.	310000.00	products/Tiffany_Atlas_Watch.webp	5	f	2026-08-20 20:03:36.021182+05:30	10	6
6	Calvin Klein Classic Watch	Minimalist classic watch with a clean dial and sophisticated finish. Designed for versatile everyday styling.	18500.00	products/Calvin_Klein_Classic_Watch.webp	13	f	2026-08-20 12:28:54.483797+05:30	7	6
27	FRED Chance Infinie Necklace	An elegant necklace inspired by FRED's contemporary jewelry aesthetic, featuring a refined silhouette designed for sophisticated everyday styling.	350000.00	products/FRED_Chance_Infinie_Necklace.webp	4	f	2026-08-20 19:59:56.925097+05:30	9	8
19	Calvin Klein Leather Card Holder	A compact leather card holder with a minimalist design and subtle Calvin Klein branding. Perfect for carrying essential cards while maintaining a polished look.	9500.00	products/alvin_Klein_Leather_Card_Holder.avif	17	f	2026-08-20 19:28:07.718769+05:30	7	5
\.


--
-- Data for Name: store_cartitem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.store_cartitem (id, quantity, cart_id, product_id) FROM stdin;
79	2	2	27
\.


--
-- Data for Name: store_order; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.store_order (id, total_price, status, payment_method, shipping_address, created_at, user_id) FROM stdin;
1	2550.00	CANCELLED	COD	123 Main Street, Lucknow, Uttar Pradesh	2026-08-18 14:32:39.615296+05:30	3
3	7650.00	CANCELLED	COD	RBL	2026-08-19 16:19:57.633973+05:30	3
2	5100.00	CONFIRMED	COD	RBL	2026-08-18 14:39:22.670631+05:30	3
4	210000.00	CANCELLED	COD	RBL	2026-08-20 16:59:12.696667+05:30	1
5	37000.00	CONFIRMED	COD	Indira Nagar, Lucknow	2026-08-21 15:43:07.83613+05:30	1
6	9500.00	SHIPPED	COD	Lucknow\n	2026-08-21 22:32:08.492231+05:30	1
7	350000.00	PENDING	COD	Mumbai\n	2026-08-21 22:51:11.508529+05:30	1
40	350000.00	PENDING	COD	Seoul	2026-08-22 06:28:39.127488+05:30	1
\.


--
-- Data for Name: store_orderitem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.store_orderitem (id, quantity, price, order_id, product_id) FROM stdin;
1	1	2550.00	1	1
2	2	2550.00	2	1
3	3	2550.00	3	1
4	1	210000.00	4	7
5	2	18500.00	5	6
6	1	9500.00	6	19
7	1	350000.00	7	27
40	1	350000.00	40	27
\.


--
-- Data for Name: store_userprofile; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.store_userprofile (id, phone, address, user_id) FROM stdin;
1	9876543210	Lucknow, Uttar Pradesh	3
2			1
\.


--
-- Data for Name: store_wishlist; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.store_wishlist (id, created_at, user_id) FROM stdin;
1	2026-08-18 14:53:46.718936+05:30	3
2	2026-08-19 16:36:30.785332+05:30	1
\.


--
-- Data for Name: store_wishlistitem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.store_wishlistitem (id, product_id, wishlist_id) FROM stdin;
9	6	2
10	5	2
12	27	2
13	26	2
20	28	2
21	20	2
22	21	2
23	25	2
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 64, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 3, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 15, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 16, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 23, true);


--
-- Name: store_brand_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.store_brand_id_seq', 10, true);


--
-- Name: store_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.store_cart_id_seq', 2, true);


--
-- Name: store_cartitem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.store_cartitem_id_seq', 79, true);


--
-- Name: store_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.store_category_id_seq', 8, true);


--
-- Name: store_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.store_order_id_seq', 72, true);


--
-- Name: store_orderitem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.store_orderitem_id_seq', 72, true);


--
-- Name: store_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.store_product_id_seq', 29, true);


--
-- Name: store_userprofile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.store_userprofile_id_seq', 2, true);


--
-- Name: store_wishlist_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.store_wishlist_id_seq', 2, true);


--
-- Name: store_wishlistitem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.store_wishlistitem_id_seq', 23, true);


--
-- PostgreSQL database dump complete
--

\unrestrict 3RavefVewi6bYLAV0TqfCDOIoBWMjEqMFgBGY7TYh1PMaPfl5Cscu15ASvY1RRQ

