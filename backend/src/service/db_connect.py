import psycopg2

class Database:
    def __init__(self, connection_params):
        self.connection_params = connection_params
        self.connection = None
        self.cursor = None

    def connect(self):
        self.connection = psycopg2.connect(**self.connection_params)
        self.cursor = self.connection.cursor()

    def close(self):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()

    def execute_query(self, query, params=None):
        if not self.connection:
            self.connect()
        try:
            self.cursor.execute(query, params)
            # result = self.cursor.fetchall()
            self.connection.commit()
            # return result
        except Exception as e:
            self.connection.rollback()
            raise e
        
    def getLocation(self):
        query = "SELECT * FROM location;"
        data = self.execute_query(query)
        return data
    
    def insertPostToTable(self,taken_at, user_id, username, full_name, caption, created_at, location_name):
        query = """
            INSERT INTO raw_data (taken_at, user_id, username, full_name, caption, created_at, location_name)
            VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        params = (taken_at, user_id, username, full_name, caption, created_at, location_name)
        self.execute_query(query, params)
