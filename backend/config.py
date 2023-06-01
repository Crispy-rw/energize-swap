"""
    Flask configurations and other configurations
"""
import os
from dotenv import load_dotenv
# Load Configs from .env
load_dotenv()


class Config():
    # App Directory
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    JSON_SORT_KEYS = False
    # Configs loaded from env
    PRIVATE_KEY = os.getenv('PRIVATE_KEY')


class ProductionConfig(Config):
    DEVELOPMENT = False
    DEBUG = False
    TESTING = False
    # SQLAlchemy Config
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI')
    # SQLALCHEMY_DATABASE_URI = "mysql://root:root@batteryswap-db:3308/energize_swap_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_POOL_TIMEOUT = 10
    SEND_FILE_MAX_AGE_DEFAULT = 0
    SQLALCHEMY_ENGINE_OPTIONS = {
        "max_overflow": 120,
        "pool_pre_ping": True,
        "pool_recycle": 60 * 60,
        "pool_size": 90,
    }

api_config = {
    'production': ProductionConfig,
}

