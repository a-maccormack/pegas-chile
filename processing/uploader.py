import json
from supabase import create_client, Client

with open("creds.json") as file:
    data = json.load(file)
    url: str = data["SUPABASE_URL"]
    key: str = data["SUPABASE_PUBLIC_KEY"]


supabase: Client = create_client(url, key)
response = supabase.table("countries").select("*").execute()
