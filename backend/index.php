<?php

$port = getenv('PORT') ? getenv('PORT') : 10000; // Default to 8080 for local

// Assuming you're using PHP's built-in server for development:
if (php_sapi_name() == 'cli-server') {
    // Use the dynamically assigned port
    $host = '0.0.0.0';
    $port = getenv('PORT') ?: 10000;
    echo "Running server on http://$host:$port\n";
    // For Heroku, make sure your app listens on the assigned port.
}
