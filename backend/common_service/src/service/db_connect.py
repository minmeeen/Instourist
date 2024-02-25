import psycopg2
from src.middleware.logger import logger

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
    
    def insertPostToInitialData(self, user_id, username, full_name, caption, post_created_at, post_taken_at, location_id, created_at, created_by):
        query = """
            INSERT INTO initial_data (user_id, username, full_name, caption, post_created_at, post_taken_at, location_id, created_at, created_by)
            VALUES (%s, %s, %s, %s, To_TIMESTAMP(%s), TO_TIMESTAMP(%s), %s, %s, %s)"""
        params = (user_id, username, full_name, caption, post_created_at, post_taken_at, location_id, created_at, created_by)
        
        try :
            self.execute_query(query, params)
        except Exception as e :
            logger.error(f'Error : {e}')

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
            logger.error(f'Error : {e}')
            return None
        
    def getIGLocation(self):
        query = """
                SELECT ig_location
                FROM location"""
        
        try : 
            self.execute_query(query)
            result = self.cursor.fetchall()
            return result if result else None
        except Exception as e :
            logger.error(f'Error : {e}')
    
    def findLanguageId(self, igLocation):
        query = """
            SELECT language_id
            FROM language
            where %s = ANY(ig_location)"""
        param = (igLocation,)
        
        try :
            # self.connect()
            self.execute_query(query, param)
            result = self.cursor.fetchone()
            return result[0] if result else None
        except Exception as e:
            logger.error(f'Error : {e}')
            return None

    def findExistPost(self, user_id, taken_at):
        query = """
            SELECT username
            FROM initial_data
            WHERE %s = user_id AND TO_TIMESTAMP(%s) = post_taken_at"""
        param = (user_id, taken_at)

        try :
            self.execute_query(query, param)
            result = self.cursor.fetchone()
            return result if result else None
        except Exception as e :
            logger.error(f'Error : {e}')
            return None
        
    def findPostDetectedByDate(self, locationId, newTime, currentTime):
        query = """
            SELECT language
            FROM post_language_detected
            WHERE location_id = %s AND post_created_at BETWEEN %s AND %s"""
        param = (locationId, newTime, currentTime)

        try :
            self.execute_query(query, param)
            result = self.cursor.fetchall()
            return result if result else None
        except Exception as e :
            logger.error(f'Error : {e}')
            return None
        
