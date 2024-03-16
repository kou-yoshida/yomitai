# コンテナ準備系

up:
	docker-compose up -d

down:
	docker-compose down

ps:
	docker-compose ps


# ログ出力
log:
	docker-compose logs

# コンテナ入る系
pg_restore:
	docker-compose exec pg_resotre sh


# pg_resotreのshファイルを実行
restore:
	docker-compose exec pg_resotre && sh ./db/restore.sh
