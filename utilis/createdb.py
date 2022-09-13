import psycopg2


#10.0.0.44
conn = psycopg2.connect(
   database="masters", user='Jacek', password='password', host='localhost', port= '5432'
)

def create_db():
   cursor = conn.cursor()
   cursor.execute('''CREATE TABLE bricks
                  (brick_id int PRIMARY KEY,
                  brick_type int);''')
   conn.commit()
   conn.close()

