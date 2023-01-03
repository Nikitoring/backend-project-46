install: install-deps

install-deps:
	npm ci

run:
	node bin/gendiff.js

test:
	npm test

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .