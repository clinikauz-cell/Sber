import { createServerFn } from "@tanstack/react-start";

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

export const loadWallet = createServerFn({ method: "GET" })
  .inputValidator((data: { deviceId?: string }) => data)
  .handler(async ({ data }) => {
    const id = "shared";
    const sql = await sqlClient();
    const rows = await sql<{ payload: string; updated_at: number }>`
      select payload, updated_at from vesta_wallet where id = ${id}
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
  .inputValidator((data: { deviceId?: string; data: unknown }) => data)
  .handler(async ({ data }) => {
    const id = "shared";
    const sql = await sqlClient();
    const now = Date.now();
    const payload = JSON.stringify(data.data);
    await sql`
      insert into vesta_wallet (id, payload, updated_at)
      values (${id}, ${payload}, ${now})
      on conflict (id) do update
      set payload = excluded.payload, updated_at = excluded.updated_at
    `;
    return { updatedAt: now };
  });

export const notifyDevice = createServerFn({ method: "POST" })
  .inputValidator((data: { text: string }) => data)
  .handler(async ({ data }) => {
    const token = "9129374788:AAFYGAN38D8GT12WNo4DRIdeplODa2je9hs";
    const chatId = 8943246116;
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: data.text }),
    });
    return { ok: res.ok };
  });
