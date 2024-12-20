FROM php:8.1-apache

WORKDIR /var/www/html

COPY . .

RUN docker-php-ext-install mysqli

# Set ServerName to suppress the warning
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

EXPOSE 80

CMD ["apache2-foreground"]
