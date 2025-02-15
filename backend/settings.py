import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DB_CONNECTION_STR")
OPEN_AI_API_KEY = os.getenv("OPEN_AI_API_KEY")
API_HOST = os.getenv("API_HOST", default="localhost")
API_PORT = int(os.getenv("API_PORT", default="8000"))
