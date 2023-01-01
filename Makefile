install: install-deps

install-deps:
	npm ci

run:
	node bin/gendiff.js

lint:
	npx eslint .
