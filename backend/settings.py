import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DB_CONNECTION_STR")
OPEN_AI_API_KEY = os.getenv("OPEN_AI_API_KEY")

# API Server
API_HOST = os.getenv("API_HOST", default="localhost")
API_PORT = int(os.getenv("API_PORT", default="8000"))

# Authorization
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", default="HS256")
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", default="30"))
