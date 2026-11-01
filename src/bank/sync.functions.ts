import { createServerFn } from "@tanstack/react-start";

const ROW = "shared";

async function sqlClient() {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  await sql`
    create table if not exists vesta_wallet (
      id text primary key,
      payload text not null,
      updated_at bigint not null
    )
  `;
  return sql;
}

export const loadWallet = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await sqlClient();
  const rows = await sql<{ payload: string; updated_at: number }>`
    select payload, updated_at from vesta_wallet where id = ${ROW}
  `;
  const row = rows[0];
  if (!row) return null;
  try {
    return { payload: JSON.parse(row.payload) as unknown, updatedAt: Number(row.updated_at) };
  } catch {
    return null;
  }
});

export const saveWallet = createServerFn({ method: "POST" })
  .validator((data: unknown) => data)
  .handler(async ({ data }) => {
    const sql = await sqlClient();
    const now = Date.now();
    const payload = JSON.stringify(data);
    await sql`
      insert into vesta_wallet (id, payload, updated_at)
      values (${ROW}, ${payload}, ${now})
      on conflict (id) do update
      set payload = excluded.payload, updated_at = excluded.updated_at
    `;
    return { updatedAt: now };
  });
