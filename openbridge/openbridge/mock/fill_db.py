import psycopg2
import pandas as pd
import requests
# Database connection parameters
DB_NAME = "sem2023_lukask"
DB_USER = "lukask"
DB_PASSWORD = ""
DB_HOST = "baza.fmf.uni-lj.si"
DB_PORT = "5432"

# Establishing the connection
try:
    connection = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    print("Connection established successfully!")
    data = pd.read_csv('./mock_data/recent-data.csv')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users_customuser")

    # Fetching all rows from the result set
    rows = cursor.fetchall()
    user_ids = [row[0] for row in rows]

    cursor.execute("SELECT * FROM openbridge_apiservice WHERE owner_id = 1")
    rows = cursor.fetchall()
    api_service_ids = [row[0] for row in rows]

    print("User ids:", user_ids)
    print("API service ids:", api_service_ids)

    for index, row in data.iterrows():
        # random user and api_service
        user_id = 2
        api_service_id = api_service_ids[index % len(api_service_ids)]
        cursor.execute(
            "INSERT INTO openbridge_apirequest (created_at, details, api_service_id, user_id, ip, path, user_agent, method) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (psycopg2.TimestampFromTicks(row['created_at']), 'Mockaroo!', api_service_id, user_id, row['ip'], row['path'], row['user_agent'], 'GET')
        )
        if index % 50 == 0:
            connection.commit()
            print("Data inserted successfully!", index + 1, "rows inserted.")

    # Do whatever you need with the connection here

except psycopg2.Error as e:
    print("Error connecting to the database:", e)
finally:
    # Close the connection
    if connection:
        connection.close()
