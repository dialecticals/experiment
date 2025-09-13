<br>

### Remote Development

The remote development environment requires

* [Dockerfile](../.devcontainer/Dockerfile)

Build an image via:

```shell
docker build . --file .devcontainer/Dockerfile -t entre
```

<br>

Subsequently, launch an instance of the image `entre` via:

<br>

```shell
docker run --rm -i -t -p 5000:5000 -p 5173:5173 -p 4173:4173 
    -w /app --mount type=bind,src="$(pwd)",target=/app 
        -v ~/.aws:/root/.aws entre
```

<br>
<br>

<br>
<br>

<br>
<br>

<br>
<br>
