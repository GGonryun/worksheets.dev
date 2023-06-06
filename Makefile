check:
	npx nx format:check && npx nx affected -t lint --parallel=3 && npx nx affected -t test --parallel=3 --configuration=ci && npx nx affected -t build --parallel=3
build:
	nx build ide
relog:
	firebase logout && firebase login && nx serve firebase