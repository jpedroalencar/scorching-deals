import os, random, datetime, psycopg2
from dotenv import load_dotenv

load_dotenv()

def seed_db():
    pg_user=os.getenv("POSTGRES_USER")
    pg_password=os.getenv("POSTGRES_PASSWORD")
    pg_db=os.getenv("POSTGRES_DB")
    pg_port=os.getenv("POSTGRES_PORT")
    pg_host=os.getenv("POSTGRES_HOST")

    try:
        conn = psycopg2.connect(
            dbname=pg_db,
            user=pg_user,
            password=pg_password,
            host=pg_host,
            port=pg_port
        )
        cur=conn.cursor()
        print("DB connected")
        cur.execute("TRUNCATE TABLE products CASCADE;")
        products_data = [
            {"title": "Sony WH-1000XM5", "query": "Sony WH-1000XM5 headphones", "category": "Electronics"},
            {"title": "Apple AirPods Pro 2", "query": "Apple AirPods Pro 2", "category": "Electronics"},
            {"title": "Logitech MX Master 3S", "query": "Logitech MX Master 3S mouse", "category": "Accessories"},
            {"title": "Keychron Q1 Pro", "query": "Keychron Q1 Pro keyboard", "category": "Accessories"},
            {"title": "LG C3 OLED 55\"", "query": "LG C3 OLED 55 inch TV", "category": "Electronics"},
            {"title": "Herman Miller Aeron", "query": "Herman Miller Aeron chair", "category": "Furniture"},
            {"title": "Nespresso VertuoPlus", "query": "Nespresso VertuoPlus coffee maker", "category": "Kitchen"},
            {"title": "Dyson V15 Detect", "query": "Dyson V15 Detect vacuum", "category": "Home"}
        ]
        for x in products_data:
            cur.execute(
                "INSERT INTO products (title, search_query, category) VALUES (%s, %s, %s) RETURNING id;",
                (x["title"],x["query"], x["category"])
            )
            product_id = cur.fetchone()[0]
            for i in range(30):
                snapshot_date = datetime.date.today() - datetime.timedelta(days=i)
                dummy_price=round(random.uniform(40.0, 500.0),2)
                cur.execute(
                    "INSERT INTO price_snapshots(product_id, price, merchant, snapshot_date, source) VALUES (%s, %s, 'Amazon', %s, 'SEEDED');", (product_id, dummy_price, snapshot_date)
                )
        conn.commit()
        cur.close()
        conn.close()
    except Exception as exc:
        print(f"DB connection error: {exc}")

if __name__ == "__main__":
    seed_db()

