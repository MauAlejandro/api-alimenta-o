create table alimentos (
  id serial primary key, 
  nome text unique not null,
  porcao text,
	calorias numeric not null,
  proteinas numeric not null,
  carboidratos numeric not null,
  gorduras numeric not null,
  gorduras_saturadas numeric
);


insert into alimentos 
(nome, calorias, proteinas, carboidratos, gorduras, gorduras_saturadas)
values 
('manga', 0.63, 0.004, 0.167, 0, 0);

insert into alimentos 
(nome, calorias, proteinas, carboidratos, gorduras, gorduras_saturadas)
values 
('whey growth', 4.08, 0.765, 0.13, 0.08, 0);

insert into alimentos 
(nome, porcao, calorias, proteinas, carboidratos, gorduras)
values 
('ovo', '1 ovo de 55g', 80, 7, 0, 1.5);

insert into alimentos 
(nome, calorias, proteinas, carboidratos, gorduras, gorduras_saturadas)
values 
('banana', 0.98, 0.013, 0.26, 0, 0);

create table usuarios (
	id serial primary key,
  nome text not null,
  email text unique not null,
  senha text not null
);

create table refeicoes (
  id serial primary key not null,
  nome_refeicao text not null,
	calorias numeric not null,
  proteinas numeric not null,
  carboidratos numeric not null,
  gorduras numeric not null,
  gorduras_saturadas numeric,
  usuario_id integer references usuarios(id) not null
);

create table ingredientes (
  id serial primary key,
	refeicao_id integer references refeicoes(id) not null,
  nome_alimento text references alimentos(nome) not null,
  quantidade integer not null
);

create table refeicoes_do_dia(
	id serial primary key,
  usuario_id integer references usuarios(id) not null,
  refeicao_id integer references refeicoes(id) not null,
  dia_da_refeicao text not null
);
