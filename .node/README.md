<br>

### Remote Development

The remote development environment requires

* [Dockerfile](../.node/Dockerfile)

Build an image via:

```shell
docker build . --file .node/Dockerfile -t initial
```

<br>

Subsequently, launch an instance of the image `initial` via:

<br>

```shell
docker run --rm -i -t -p 5000:5000 -p 5173:5173 -p 4173:4173 
    -w /app --mount type=bind,src="$(pwd)",target=/app 
        -v ~/.aws:/root/.aws initial
```

<br>
<br>

### Notes

The Dockerfile is for an initial image instance for running a set of directives.  The directives install programs, update programs, create package.json, etc.  Type

```shell
npm init
```

this prompts the questions

> ```yaml
> package name: (app)
> version: (1.0.0)
> description: 
> entry point: (index.js)
> test command: 
> git repository: (https://github.com/dialecticals/experiment.git)
> keywords: 
> author: 
> license: (ISC)
> type: (commonjs)
> ```


Subsequently, `package.json` is created.


Updating `npm`

```shell
npm install npm@...
```

<br>
<br>

<br>
<br>

<br>
<br>

<br>
<br>
