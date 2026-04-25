/* global supabase */
(function () {
  if (!window.SUPABASE_CONFIG) {
    console.error("Missing SUPABASE_CONFIG. Load js/supabase-config.js before supabase-client.js");
    return;
  }

  const { url, anonKey } = window.SUPABASE_CONFIG;
  if (!url || !anonKey) {
    console.error("SUPABASE_CONFIG requires both url and anonKey");
    return;
  }

  window.supabaseClient = supabase.createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  window.authApi = {
    async signIn(email, password) {
      return window.supabaseClient.auth.signInWithPassword({ email, password });
    },
    async signOut() {
      return window.supabaseClient.auth.signOut();
    },
    async getSession() {
      return window.supabaseClient.auth.getSession();
    },
    async getProfile() {
      const sessionResult = await window.supabaseClient.auth.getSession();
      const userId = sessionResult?.data?.session?.user?.id;
      if (!userId) return { data: null, error: null };
      return window.supabaseClient
        .from("profiles")
        .select("id, full_name, role")
        .eq("id", userId)
        .single();
    },
  };
})();
