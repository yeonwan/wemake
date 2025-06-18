import { createBrowserClient, createServerClient, parseCookieHeader, serializeCookieHeader } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import type { Database as SupabaseDatabase } from "database.types";
import type { MergeDeep, SetNonNullable, SetFieldType } from "type-fest";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export type Database = MergeDeep<
  SupabaseDatabase, {
    public: {
      Views: {
        community_post_list_view: {
          Row: SetFieldType<
            SetNonNullable<
              SupabaseDatabase["public"]["Views"]["community_post_list_view"]["Row"]
            >, "author_avatar", string | null>
        },
        community_post_detail: {
          Row: SetFieldType<
            SetNonNullable<
              SupabaseDatabase["public"]["Views"]["community_post_detail"]["Row"]
            >, "author_avatar", string | null>
        },
        gpt_ideas_view: {
          Row: SetFieldType<
            SetNonNullable<
              SupabaseDatabase["public"]["Views"]["gpt_ideas_view"]["Row"]
            >, "likes", number>
        }
      };
    };
  }
>;

export const browserClient = createBrowserClient<Database>(supabaseUrl!, supabaseKey!);

export const makeSSRClient = (request: Request) => {
  const headers = new Headers();
  const serverSideClient = createServerClient<Database>(supabaseUrl!, supabaseKey!,
    {
      cookies: {
        getAll() {
          const cookieHeader = request.headers.get("Cookie") ?? "";
          const cookies = parseCookieHeader(cookieHeader);
          // Filter out cookies with undefined values and ensure value is a string
          return cookies
            .filter((cookie): cookie is { name: string; value: string } =>
              cookie.value !== undefined
            );
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            headers.append('Set-Cookie', serializeCookieHeader(name, value, options))
          )
        },
      },
    });
  return {client: serverSideClient, headers};
};

