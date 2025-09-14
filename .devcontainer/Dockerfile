FROM node:24.4.1-bookworm-slim


# If the steps of a `Dockerfile` use files that are different from the `context` file, COPY the
# file of each step separately; and RUN the file immediately after COPY
WORKDIR /app
COPY package.json package-lock.json tsconfig.json /app/

# Environment
SHELL [ "/bin/bash", "-c" ]


# Setting-up
RUN apt update && apt -q -y upgrade && apt -y install sudo && \
    sudo apt -y install wget && sudo apt -y install curl && sudo apt -y install unzip && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "/tmp/awscliv2.zip" && \
    unzip /tmp/awscliv2.zip -d /tmp/ && cd /tmp && sudo ./aws/install && cd /app && \
    echo "$PWD" && echo "$LS" && npm ic && npm cache clean --force


# Port
EXPOSE 5000 5173 4173


# ENTRYPOINT
ENTRYPOINT ["bash"]
