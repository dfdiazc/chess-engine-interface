FROM ubuntu:latest

ARG YOUR_ENV

ENV YOUR_ENV=${YOUR_ENV} \
    PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    # Poetry's configuration:
    POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_CREATE=false \
    POETRY_CACHE_DIR='/var/cache/pypoetry' \
    POETRY_HOME='/usr/local' \
    POETRY_VERSION=1.7.1 \
    # Make sure to update it!
    PATH="${PATH}:/usr/local/bin"

# System deps:
RUN apt-get update && apt-get install -y curl python3 python3-pip python3-venv

# Install Poetry:
RUN curl -sSL https://install.python-poetry.org > get-poetry.py \
    && python3 get-poetry.py --version $POETRY_VERSION \
    && rm get-poetry.py

# Copy only requirements to cache them in docker layer
WORKDIR /code
COPY poetry.lock pyproject.toml /code/

# Project initialization:
RUN if [ "$YOUR_ENV" = "production" ]; then \
        poetry install --no-interaction --no-ansi --no-dev; \
    else \
        poetry install --no-interaction --no-ansi; \
    fi

# Creating folders, and files for a project:
COPY . /code

# Run Django development server
CMD ["poetry", "run", "python3", "manage.py", "runserver", "0.0.0.0:8000"]