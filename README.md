# BileMoApi

How to install the project with your own local environment (like Wampserver for to have database)

Symfony 5.2
PHP 7.4.9
MySQL 5.7.31
Follow each following steps :

First clone this repository from your terminal in your preferred project directory:
git clone https://github.com/Jpetitgas/BileMoApi.git

You need to edit the ".env" file:

Setup Doctrine for DB connection.
DATABASE_URL
API_URL

From your terminal, go to the project directory and tape those command line :

composer install

php bin/console lexik:jwt:generate-keypair

php bin/console doctrine:database:create

php bin/console make:migration

php bin/console doctrine:migrations:migrate

php bin/console doctrine:fixtures:load

npm install --force

npm run dev-server

symfony server:start -d

iden : client0@bilemo.com  password: password
