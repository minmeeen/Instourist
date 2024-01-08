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
    
    def insertPostToInitialData(self, user_id, username, full_name, caption, create_at, taken_at, location_id):
        query = """
            INSERT INTO initial_data (user_id, username, full_name, caption, create_at, taken_at, location_id)
            VALUES (%s, %s, %s, %s, To_TIMESTAMP(%s), TO_TIMESTAMP(%s), %s)"""
        params = (user_id, username, full_name, caption, create_at, taken_at, location_id)
        self.execute_query(query, params)

    def findLocationId(self, igLocation):
        query = """
            SELECT location_id
            FROM location
            where %s = ANY(ig_location)"""
        param = (igLocation,)
        
        try :
            # self.connect()
            self.execute_query(query, param)
            result = self.cursor.fetchone()
            return result[0] if result else None
        except Exception as e:
            print(f"Error : {e}")
            return None
