DROP DATABASE IF EXISTS futelite;
CREATE DATABASE futelite CHARACTER SET utf8mb4;
USE futelite;

CREATE TABLE produtos (
  id INT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  categoria VARCHAR(20) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  tag VARCHAR(40)
);

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(80) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  vip TINYINT(1) DEFAULT 0
);

CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  total DECIMAL(10,2) NOT NULL,
  data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE itens_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  produto_id INT NOT NULL,
  quantidade INT NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE perguntas_quiz (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pergunta VARCHAR(200) NOT NULL,
  opcao1 VARCHAR(100) NOT NULL,
  opcao2 VARCHAR(100) NOT NULL,
  opcao3 VARCHAR(100) NOT NULL,
  opcao4 VARCHAR(100) NOT NULL,
  correta TINYINT NOT NULL
);

INSERT INTO produtos (id, nome, categoria, preco, tag) VALUES
  (1, 'Chuteira Puma Future Z 1.3 Instinct Neymar JR', 'chuteira', 499.90, 'Edicao Limitada'),
  (2, 'Camisa FC Barcelona Home 24/25 Autentica', 'camisa', 359.90, 'Lancamento'),
  (3, 'Camisa Sao Paulo FC Home I 2026 Pro', 'camisa', 349.90, 'Mais Vendido'),
  (4, 'Camisa Real Madrid Home 24/25 Autentica', 'camisa', 359.90, 'Mais Vendido'),
  (5, 'Bola Adidas Copa do Mundo 2026 Trionda', 'bola', 473.90, 'Oficial FIFA'),
  (6, 'Camisa Selecao Franca I 2026', 'camisa', 349.90, 'Lancamento'),
  (7, 'Chuteira Nike Air Zoom Mercurial Vapor 16 Elite', 'chuteira', 899.90, 'Profissional'),
  (8, 'Conjunto de Treino PSG (Jaqueta + Calca)', 'treino', 375.90, 'Colecao Treino'),
  (9, 'Bola Oficial UEFA Champions League', 'bola', 899.90, 'Champions League'),
  (10, 'Kit Treino Selecao Brasileira Pro', 'treino', 449.90, 'CBF Oficial'),
  (11, 'Camisa Arsenal Home 24/25', 'camisa', 349.90, 'Lancamento'),
  (12, 'Chuteira Adidas Predator Elite FG', 'chuteira', 999.90, 'Profissional'),
  (13, 'Bola Nike Premier League Flight 2021', 'bola', 599.90, 'Oficial FIFA'),
  (14, 'Jaqueta Corta-Vento FC Barcelona', 'treino', 419.90, 'Colecao Treino'),
  (15, 'Camisa Manchester City Home 24/25', 'camisa', 359.90, 'Mais Vendido'),
  (16, 'Chuteira Nike Phantom GX II Elite', 'chuteira', 849.90, 'Destaque'),
  (17, 'Bola Puma La Liga Orbita Pro', 'bola', 429.90, 'Oficial'),
  (18, 'Calca de Treino Jogger Nike Pro', 'treino', 279.90, 'Oferta VIP'),
  (19, 'Camisa Bayern de Munique I 24/25', 'camisa', 339.90, 'Original'),
  (20, 'Chuteira Mizuno Morelia Neo IV Japan', 'chuteira', 1199.90, 'Edicao Limitada'),
  (21, 'Bola Molten Europa League Match', 'bola', 389.90, 'Oficial'),
  (22, 'Camisa Mexico Third (3) 2026 Adidas Torcedor Masculina', 'treino', 159.90, 'Promocao'),
  (23, 'Camisa Juventus Home 24/25', 'camisa', 349.90, 'Lancamento'),
  (24, 'Chuteira Puma King Ultimate FG', 'chuteira', 749.90, 'Profissional'),
  (25, 'Bola Penalty S11 Pro Campo', 'bola', 299.90, 'Nacional'),
  (26, 'Agasalho Completo Real Madrid Travel', 'treino', 599.90, 'Exclusivo'),
  (27, 'Camisa Milan Home 24/25', 'camisa', 339.90, 'Mais Vendido'),
  (28, 'Chuteira Nike Tiempo Legend 10 Elite', 'chuteira', 829.90, 'Destaque'),
  (29, 'Bola Umbro Neo Swerve Pro', 'bola', 249.90, 'Oferta VIP'),
  (30, 'Shorts Nike Dri-FIT Fast Masculino Preto', 'treino', 129.90, 'Basico'),
  (31, 'Camisa Liverpool Home 24/25', 'camisa', 359.90, 'Lancamento'),
  (32, 'Chuteira Under Armour Magnetico Pro', 'chuteira', 699.90, 'Importada'),
  (33, 'Bola Select Super FIFA Quality', 'bola', 319.90, 'Oficial FIFA'),
  (34, 'Blusao de Frio Nike Club Fleece', 'treino', 329.90, 'Colecao Inverno'),
  (35, 'Camisa Borussia Dortmund Home 24/25', 'camisa', 329.90, 'Original'),
  (36, 'Chuteira Skechers Razor FG', 'chuteira', 649.90, 'Novo'),
  (37, 'Bola Mikasa FT-5 Futevolei / Campo', 'bola', 289.90, 'Mais Vendido'),
  (38, 'Colete de Treino Dupla Face Kit 5un', 'treino', 189.90, 'Equipamento'),
  (39, 'Camisa Inter de Milao Home 24/25', 'camisa', 349.90, 'Destaque'),
  (40, 'Chuteira Adidas Copa Pure II Elite', 'chuteira', 899.90, 'Profissional'),
  (41, 'Bola Topper Slate Pro Campo', 'bola', 219.90, 'Nacional'),
  (42, 'Corta-Vento Puma Football Vent', 'treino', 379.90, 'Exclusivo'),
  (43, 'Camisa Selecao Argentina I 2026', 'camisa', 369.90, 'Campea do Mundo'),
  (44, 'Chuteira Mizuno Alpha Japan Branco EU 40', 'chuteira', 1099.90, 'Edicao Limitada'),
  (45, 'Bola Kappa Campo Match', 'bola', 199.90, 'Oferta VIP'),
  (46, 'Kit 2 Meioes Trussox Futebol Jogador Profissional', 'treino', 89.90, 'Essencial'),
  (47, 'Camisa Portugal II 2026 Puma Torcedor Masculina Verde Agua', 'camisa', 349.90, 'Lancamento'),
  (48, 'Chuteira Society Adulto Umbro Adamant Master Class Pro Bump Kintsugi', 'chuteira', 549.90, 'Classica'),
  (49, 'Camisa Ajax Home 24/25', 'camisa', 329.90, 'Original'),
  (50, 'Chuteira Penalty Brasil 70 Futsal Pro', 'chuteira', 299.90, 'Futsal'),
  (51, 'Chuteira Futsal Umbro Pro Challenge Dragon Year Unissex', 'chuteira', 679.89, 'Classica');

INSERT INTO perguntas_quiz (pergunta, opcao1, opcao2, opcao3, opcao4, correta) VALUES
  ('Quantos jogadores cada equipe coloca em campo (com o goleiro)?', '9', '10', '11', '12', 2),
  ('Qual pais conquistou a Copa do Mundo de 2022?', 'Franca', 'Argentina', 'Brasil', 'Croacia', 1),
  ('Quanto dura uma partida, sem prorrogacao?', '80 minutos', '90 minutos', '100 minutos', '120 minutos', 1),
  ('Qual pais possui mais titulos da Copa do Mundo masculina?', 'Alemanha', 'Italia', 'Brasil', 'Argentina', 2),
  ('O que acontece quando um jogador recebe cartao vermelho?', 'E'' expulso e o time joga com um a menos', 'Cobra um penalti', 'E'' so'' advertido', 'Troca de posicao', 0);