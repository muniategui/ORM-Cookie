import gzip
import zipfile
from contextlib import contextmanager

from os.path import abspath, dirname, join, splitext

PROJECT_DIR = abspath(dirname(__file__))

ALEXA_FILE_PATH = join(PROJECT_DIR, './assets/alexa/top-1m.csv.zip')
CLEANER_PLUGIN_PATH = join(PROJECT_DIR, 'assets/plugin/cache_killer/cache_killer_1_0_14_6.crx')


MYSQL_HOST = '127.0.0.1'
MYSQL_DB = 'ORM'
MYSQL_USER = 'root'
MYSQL_PASSWORD = 'pinacolada'


def load_csv(filename, column):
    @contextmanager
    def open_zip(filename, *args):
        with zipfile.ZipFile(filename) as zf:
            name = zf.namelist()[0]
            uncompressed = zf.open(name)
            try:
                yield uncompressed
            finally:
                uncompressed.close()

    def domain(line):
        # if csv split by comma
        if ',' in line:
            #  domains don't contain commas, so it should be save
            return line.split(',')[column]

        # To allow users passing a file with a domain per line
        return line

    ext = splitext(filename)[1]
    opener = {
        '.gz': gzip.open,
        '.zip': open_zip,
    }.get(ext, open)
    with opener(filename, 'rb') as f:
        # read whole and decode in one pass (not line by line) for speed reasons (15x)
        # the top-1m is 20MB, should be handled good enough.
        # the memory efficient option is [line.decode() for line in f]
        lines = [line for line in f.read().decode('utf8').split('\n')]
        # domains don't contain commas, so it should be safe
        sites = [domain(line) for line in lines if line]
        return sites[column - 1:]


def load_list(path):
    with open(path, 'r') as f:
        return f.readlines()
