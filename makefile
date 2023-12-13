rm-admin-panel:
	folder="app/admin-panel"; \
	if [ -d "$$folder" ]; then \
			rm -r "$$folder"; \
	fi
release:
	make rm-admin-panel && cd frontend && npm install && npm run build && mv ./build ../app/admin-panel
local:
	docker compose -f docker-compose.dev.yml up
down:
	docker compose -f docker-compose.dev.yml down
sh:
	docker-compose -f docker-compose.dev.yml exec cms-demo sh
dev:
	cd app && npm install && npm run dev
staging:
	cd app && npm install && npm run staging