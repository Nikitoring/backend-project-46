install: install-deps

install-deps:
	npm ci

run:
	node bin/gendiff.js

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .