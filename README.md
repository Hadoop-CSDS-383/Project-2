# Project 2 (multi layered)


## Installation.
- There are two dependencies to run this project:
    - `docker`
    - `docker-compose` (A plugin for docker)

### Installation on Windows
- Follow this tutorial to install docker:
    - https://docs.docker.com/desktop/install/windows-install/

### Installation on MacOS
- Follow this tutorial to install docker:
    - https://docs.docker.com/desktop/install/mac-install/
- Or, if you are comfortable with `brew`
```bash
brew install docker docker-compose
```

### Installation on Linux
- Follow this tutorial to install docker:
    - https://docs.docker.com/desktop/install/linux-install/
- Or however you install packages on your distro:
    - For example, on Arch Linux: `sudo pacman -S docker docker-compose`

## Running the project.
1. While in the `Project-2` directory (where the `docker-compose.yml` file is), run the command `docker-compose build` to build the docker images required (database, backend, and frontend)
2. After the docker images are built, run the command `docker-compose up` to start the containers.
3. After the containers are running, you can access the frontend at [localhost:3000](localhost:3000) and the backend at [localhost:8000](localhost:8000)
    - **The frontend is the intended 
