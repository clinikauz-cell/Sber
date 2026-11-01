create table if not exists vesta_wallet (
  id text primary key,
  payload text not null,
  updated_at bigint not null
);
