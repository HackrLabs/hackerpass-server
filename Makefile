.PHONY: run test

run:
	DEBUG=* ./node_modules/.bin/nodemon -w src -x "tsc && node dist/index.js"

test:
	npm test
